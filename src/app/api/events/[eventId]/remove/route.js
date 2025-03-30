import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getEventById, removeAttendee } from "@/lib/events";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to remove participants" },
        { status: 401 }
      );
    }

    const params = await context.params;
    const eventId = params.eventId;

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const event = await getEventById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Allow both event creator and admin to remove participants
    if (event.creatorId !== session.user.id && session.user.admin !== "true") {
      return NextResponse.json(
        { error: "Only the event creator or admin can remove participants" },
        { status: 403 }
      );
    }

    // Prevent removing the event creator
    if (userId === event.creatorId) {
      return NextResponse.json(
        { error: "Cannot remove the event creator" },
        { status: 400 }
      );
    }

    const success = await removeAttendee(eventId, userId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to remove participant" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing participant:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remove participant" },
      { status: 500 }
    );
  }
}
