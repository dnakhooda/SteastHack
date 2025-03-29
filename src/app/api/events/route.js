import { NextResponse } from "next/server";
import { createEvent, getAllEvents } from "@/lib/events";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to create an event" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, date, time, description, location, imageUrl } = body;

    if (!title || !date || !time || !description || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for duplicate event titles
    const existingEvents = getAllEvents();
    const isDuplicate = existingEvents.some(
      (event) => event.title.toLowerCase() === title.toLowerCase()
    );

    if (isDuplicate) {
      return NextResponse.json(
        { error: "An event with this title already exists" },
        { status: 400 }
      );
    }

    console.log("Session ID:", session.user.id);

    const event = createEvent({
      title,
      date,
      time,
      description,
      location,
      imageUrl,
      creatorId: session.user.id,
      creatorName: session.user.name,
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
