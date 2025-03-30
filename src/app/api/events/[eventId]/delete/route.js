import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { deleteEvent, getEventById, getAllEvents } from "@/lib/events";

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

    console.log("Delete request debug:", {
      eventId,
      sessionUserId: session.user.id,
      params,
      currentEvents: getAllEvents(),
    });

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
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
