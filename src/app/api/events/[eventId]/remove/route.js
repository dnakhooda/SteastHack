import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { removeAttendee, getEventById } from "@/lib/events";
import { authOptions } from "../../../auth/[...nextauth]/route";

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

    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Allow removal if user is event creator or removing themselves
    const event = await getEventById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Allow removal if user is event creator or removing themselves
    if (event.creatorId !== session.user.id && session.user.id !== userId) {
      return NextResponse.json(
        {
          error:
            "You can only remove yourself or be the event creator to remove others",
        },
        { status: 403 }
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
    console.error("Error in remove participant:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remove participant" },
      { status: 500 }
    );
  }
}
