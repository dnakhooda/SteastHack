// In-memory storage for events
export const events = [];

// Helper function to create a new event
export function createEvent(eventData) {
  const newEvent = {
    id: Date.now().toString(), // Simple unique ID
    ...eventData,
    createdAt: new Date().toISOString(),
    attendees: [], // Array to store user IDs who join the event
    imageUrl: eventData.imageUrl || null, // Store the complete data URL
  };
  events.push(newEvent);
  return newEvent;
}

// Helper function to get all events
export function getAllEvents() {
  return events;
}

// Helper function to get event by ID
export function getEventById(id) {
  return events.find(event => event.id === id);
}

// Helper function to join an event
export function joinEvent(eventId, userId) {
  const event = getEventById(eventId);
  if (event && !event.attendees.includes(userId)) {
    event.attendees.push(userId);
    return true;
  }
  return false;
} 