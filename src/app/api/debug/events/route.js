import { NextResponse } from 'next/server';
import events from '@/lib/events';

export async function GET(request) {
  try {
    // Return events with image information
    const safeEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      description: event.description,
      creatorName: event.creatorName,
      createdAt: event.createdAt,
      attendees: event.attendees,
      hasImage: !!event.imageUrl,
      imageUrl: event.imageUrl ? event.imageUrl.substring(0, 50) + '...' : null, // Truncate the base64 string for readability
    }));

    return NextResponse.json({
      success: true,
      totalEvents: events.length,
      events: safeEvents
    });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 