// In-memory storage for events
let events = [];

// Helper function to save events to localStorage
function saveEvents() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem("events", JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events to localStorage:", error);
  }
}

// Helper function to load events from localStorage
function loadEvents() {
  if (typeof window === 'undefined') return;
  try {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      events = JSON.parse(storedEvents);
    }
  } catch (error) {
    console.error("Error loading events from localStorage:", error);
  }
}

// Helper function to save events to localStorage (client-side only)
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

// Initialize events
loadEvents();

// Helper function to get all events
export function getAllEvents() {
  // Ensure events are sorted by date
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Helper function to add a new event
export function addEvent(event) {
  events.push(event);
  saveEvents();
  return event;
}

// Helper function to update an event
export function updateEvent(eventId, updatedEvent) {
  const index = events.findIndex(event => event.id === eventId);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
    saveEvents();
    return events[index];
  }
  return null;
}

// Helper function to delete an event
export function deleteEvent(eventId) {
  const index = events.findIndex(event => event.id === eventId);
  if (index !== -1) {
    events.splice(index, 1);
    saveEvents();
    return true;
  }
  return false;
}

// Helper function to get event by ID
export function getEventById(eventId) {
  return events.find(event => event.id === eventId);
}

// Helper function to add attendee to event
export function addAttendee(eventId, userId) {
  const event = getEventById(eventId);
  if (event && !event.attendees.includes(userId)) {
    event.attendees.push(userId);
    saveEvents();
    return true;
  }
  return false;
}

// Helper function to delete an event
export async function deleteEvent(eventId) {
  console.log("Attempting to delete event:", eventId);
  console.log("Current events:", events);

  // First check if the event exists
  const event = getEventById(eventId);
  if (!event) {
    console.error("Event not found:", eventId);
    throw new Error("Event not found");
  }

  // Find the event index in the in-memory array
  const eventIndex = events.findIndex((e) => e.id === eventId);
  if (eventIndex === -1) {
    console.error("Event not found in array:", eventId);
    throw new Error("Event not found");
  }

  // Remove the event from the in-memory array
  events.splice(eventIndex, 1);
  console.log("Event deleted successfully. Remaining events:", events);

  // Save to localStorage if available
  saveEvents();

  return true;
}

// Initialize events from localStorage if available
export function initializeEvents() {
  if (typeof window !== "undefined") {
    try {
      const storedEvents = localStorage.getItem("events");
      if (storedEvents) {
        events = JSON.parse(storedEvents);
        console.log("Initialized events from localStorage:", events);
      }
    } catch (error) {
      console.error("Error initializing events:", error);
    }
  }
}

// Helper function to update an event
export async function updateEvent(eventId, updateData) {
  console.log("Attempting to update event:", { eventId, updateData });
  console.log("Current events:", events);

  const event = getEventById(eventId);
  if (!event) {
    console.error("Event not found:", eventId);
    throw new Error("Event not found");
  }

  // Update the event with new data
  Object.assign(event, updateData);
  console.log("Updated event:", event);

  // Save to localStorage if available
  saveEvents();

  return true;
}

// Helper function to remove attendee from event
export function removeAttendee(eventId, userId) {
  const event = getEventById(eventId);
  if (event) {
    const index = event.attendees.indexOf(userId);
    if (index !== -1) {
      event.attendees.splice(index, 1);
      saveEvents();
      return true;
    }
  }
  return false;
}
