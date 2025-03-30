import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getEventById, updateEvent } from "@/lib/events";

export async function PUT(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to update events" },
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

    // Allow both event creator and admin to update the event
    if (event.creatorId !== session.user.id && session.user.admin !== "true") {
      return NextResponse.json(
        { error: "Only the event creator or admin can update the event" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, date, time, location } = body;

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const success = await updateEvent(eventId, {
      title,
      description,
      date,
      time,
      location,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update event" },
      { status: 500 }
    );
  }
}
