import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { joinEvent } from "@/lib/events";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to join an event" },
        { status: 401 }
      );
    }

    const { eventId } = await context.params;
    const userId = session.user.id;

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const success = joinEvent(eventId, userId);

    if (!success) {
      return NextResponse.json(
        {
          error:
            "Failed to join event. Event may not exist or you may already be joined.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error joining event:", error);
    return NextResponse.json(
      { error: "Failed to join event" },
      { status: 500 }
    );
  }
}
