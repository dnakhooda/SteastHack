import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { joinEvent } from "@/lib/events";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to join events" },
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

    console.log("Debug - Joining event:", {
      eventId,
      userId: session.user.id,
    });

    const success = await joinEvent(eventId, session.user.id);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to join event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error joining event:", error);
    return NextResponse.json(
      { error: error.message || "Failed to join event" },
      { status: 500 }
    );
  }
}
