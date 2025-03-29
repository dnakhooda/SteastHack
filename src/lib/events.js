// In-memory storage for events
let events = [];

// Load events from localStorage on initialization
if (typeof window !== "undefined") {
  try {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      events = JSON.parse(storedEvents);
      console.log("Loaded events from localStorage:", events);
    }
  } catch (error) {
    console.error("Error loading events from localStorage:", error);
  }
}

// Helper function to save events to localStorage
function saveEvents() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("events", JSON.stringify(events));
      console.log("Saved events to localStorage:", events);
    } catch (error) {
      console.error("Error saving events to localStorage:", error);
    }
  }
}

// Helper function to create a new event
export function createEvent(eventData) {
  const newEvent = {
    id: Date.now().toString(), // Simple unique ID
    ...eventData,
    createdAt: new Date().toISOString(),
    attendees: [], // Array to store user IDs who join the event
    imageUrl: eventData.imageUrl || null, // Store the complete data URL
    location: eventData.location || "Stetson East Lounge", // Default location if not provided
    time: eventData.time || "12:00 PM", // Default time if not provided
  };
  events.push(newEvent);
  saveEvents();
  console.log("Created new event:", newEvent);
  return newEvent;
}

// Helper function to get all events
export function getAllEvents() {
  console.log("Getting all events:", events);
  return events;
}

// Helper function to get event by ID
export function getEventById(id) {
  const event = events.find((event) => event.id === id);
  console.log("Getting event by ID:", { id, found: !!event });
  return event;
}

// Helper function to join an event
export function joinEvent(eventId, userId) {
  console.log("Attempting to join event:", {
    eventId,
    userId,
    currentEvents: events,
  });

  const event = getEventById(eventId);

  if (!event) {
    console.error("Event not found:", eventId);
    return false;
  }

  if (event.attendees.includes(userId)) {
    console.log("User already joined this event:", { eventId, userId });
    return false;
  }

  event.attendees.push(userId);
  saveEvents();
  console.log("Successfully joined event:", {
    eventId,
    userId,
    attendees: event.attendees,
  });
  return true;
}

// Helper function to remove an attendee from an event
export async function removeAttendee(eventId, userId) {
  console.log("Attempting to remove attendee:", { eventId, userId });
  const event = await getEventById(eventId);
  if (!event) {
    console.error("Event not found:", eventId);
    throw new Error("Event not found");
  }

  // Check if user is in the attendees list
  if (!event.attendees.includes(userId)) {
    console.error("User is not in attendees list:", { eventId, userId });
    throw new Error("User is not in attendees list");
  }

  // Remove the user from attendees
  event.attendees = event.attendees.filter((id) => id !== userId);
  console.log("Updated attendees:", event.attendees);

  // Save the updated events list to localStorage if available
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const events = JSON.parse(localStorage.getItem("events") || "[]");
      const updatedEvents = events.map((e) => (e.id === eventId ? event : e));
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  return true;
}
