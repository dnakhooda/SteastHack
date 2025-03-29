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
