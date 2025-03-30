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

 // Helper function to join an event
export function joinEvent(eventId, userId) {
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
