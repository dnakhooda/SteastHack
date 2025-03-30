import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getEventById, deleteEvent } from "@/lib/events";

export async function DELETE(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to delete events" },
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

    const event = await getEventById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Allow both event creator and admin to delete the event
    if (event.creatorId !== session.user.id && session.user.admin !== "true") {
      return NextResponse.json(
        { error: "Only the event creator or admin can delete the event" },
        { status: 403 }
      );
    }

    const success = await deleteEvent(eventId);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete event" },
      { status: 500 }
    );
  }
}
