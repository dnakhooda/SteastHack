"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Nav from "@/componenets/Nav";
import { initializeEvents } from "@/lib/events";

export default function EventPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const eventTitle = params.eventTitle;
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  // Initialize events when the component mounts
  useEffect(() => {
    initializeEvents();
  }, []);

  // Update edit form when event data changes
  useEffect(() => {
    if (eventData) {
      setEditForm({
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
      });
    }
  }, [eventData]);

  const isEventOwner = session?.user?.id === eventData?.creatorId;
  console.log("Creator ID:", eventData?.creatorId);
  console.log("Session ID:", session?.user?.id);

  // Check if event is in the past
  const isPastEvent = (date, time) => {
    const now = new Date();
    const eventDateTime = new Date(`${date}T${time}`);
    return eventDateTime < now;
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/users?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const events = await response.json();

        // Find the event that matches the title
        const event = events.find(
          (e) => e.title === decodeURIComponent(params.eventTitle)
        );

        if (!event) {
          throw new Error("Event not found");
        }

        // Fetch user details for all attendees
        const attendeesWithDetails = await Promise.all(
          event.attendees.map(async (userId) => {
            const userDetails = await fetchUserDetails(userId);
            return {
              name: userDetails?.name || "Unknown User",
              username: userDetails?.email || "@unknown",
              id: userDetails?.id || "-1",
            };
          })
        );

        // Transform the event data to match our UI structure
        const transformedEvent = {
          id: event.id,
          title: event.title,
          image: event.imageUrl || "/krentzman-quad.png",
          description: event.description,
          creator: event.creatorName,
          creatorId: event.creatorId,
          date: event.date,
          time: event.time,
          location: event.location,
          attendees: event.attendees,
          participants: attendeesWithDetails,
        };

        setEventData(transformedEvent);

        // Check if the current user is already signed up
        if (session?.user?.id) {
          setIsSignedUp(event.attendees.includes(session.user.id));
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [params.eventTitle, session?.user?.id]);

  const handleSignUp = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!eventData?.id) {
      alert("Error: Event ID not found");
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventData.id}/join`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join event");
      }

      setIsSignedUp(true);

      // Fetch updated event data
      const updatedResponse = await fetch("/api/events");
      const events = await updatedResponse.json();
      const updatedEvent = events.find((e) => e.id === eventData.id);

      if (updatedEvent) {
        // Fetch user details for all attendees, including the new user
        const attendeesWithDetails = await Promise.all(
          updatedEvent.attendees.map(async (userId) => {
            const userDetails = await fetchUserDetails(userId);
            return {
              name: userDetails?.name || "Unknown User",
              username: userDetails?.email || "@unknown",
              id: userDetails?.id || "-1",
            };
          })
        );

        // Update both attendees and participants lists
        setEventData((prev) => ({
          ...prev,
          attendees: updatedEvent.attendees,
          participants: attendeesWithDetails,
        }));

        // Log the updated data for debugging
        console.log("Updated event data:", {
          attendees: updatedEvent.attendees,
          participants: attendeesWithDetails,
          currentUser: session.user.id,
        });
      }
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join event: " + error.message);
    }
  };

  const handleRemoveParticipant = async (userId) => {
    try {
      const response = await fetch(`/api/events/${eventData.id}/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove participant");
      }

      // Refresh event data
      const updatedResponse = await fetch("/api/events");
      const events = await updatedResponse.json();
      const updatedEvent = events.find((e) => e.id === eventData.id);

      if (updatedEvent) {
        // Fetch user details for all attendees
        const attendeesWithDetails = await Promise.all(
          updatedEvent.attendees.map(async (userId) => {
            const userDetails = await fetchUserDetails(userId);
            return {
              name: userDetails?.name || "Unknown User",
              username: userDetails?.email || "@unknown",
              id: userDetails?.id || "-1",
            };
          })
        );

        setEventData((prev) => ({
          ...prev,
          attendees: updatedEvent.attendees,
          participants: attendeesWithDetails,
        }));

        if (userId === session?.user?.id) {
          setIsSignedUp(false);
        }
      }
    } catch (error) {
      console.error("Error removing participant:", error);
      alert("Failed to remove participant: " + error.message);
    }
  };

  const handleDeleteEvent = async () => {
    if (!isEventOwner) return;

    if (
      !confirm(
        "Are you sure you want to delete this event? This action cannot be undone."
      )
    ) {
      return;
    }

    console.log("Delete event debug:", {
      eventId: eventData.id,
      eventTitle: eventData.title,
      isEventOwner,
    });

    try {
      const response = await fetch(`/api/events/${eventData.id}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete event");
      }

      // Redirect to home page after successful deletion
      router.push("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event: " + error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!isEventOwner) return;

    try {
      const response = await fetch(`/api/events/${eventData.id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update event");
      }

      // Refresh event data
      const updatedResponse = await fetch("/api/events");
      const events = await updatedResponse.json();
      const updatedEvent = events.find((e) => e.id === eventData.id);

      if (updatedEvent) {
        setEventData((prev) => ({
          ...prev,
          ...updatedEvent,
          participants: prev.participants, // Keep existing participants
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D41B2C] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-600">
            The event you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <style jsx>{`
        .background-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("/krentzman-quad.png");
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: brightness(1.2) saturate(1.1);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div className="background-image" />

      <Nav />

      {/* Event Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="w-full h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={eventData.image}
                alt={eventData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", eventData.image);
                  e.target.src = "/krentzman-quad.png"; // Fallback image
                }}
              />
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h1 className="text-3xl font-bold mb-4">{eventData.title}</h1>
              <p className="text-gray-600 mb-6">{eventData.description}</p>

              <div className="space-y-4 mb-6">
                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D41B2C] focus:ring-[#D41B2C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D41B2C] focus:ring-[#D41B2C]"
                        rows="3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm({ ...editForm, date: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D41B2C] focus:ring-[#D41B2C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        value={editForm.time}
                        onChange={(e) =>
                          setEditForm({ ...editForm, time: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D41B2C] focus:ring-[#D41B2C]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) =>
                          setEditForm({ ...editForm, location: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D41B2C] focus:ring-[#D41B2C]"
                        required
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="flex-1 py-2 px-4 rounded-lg text-white font-medium text-sm transition bg-[#D41B2C] hover:bg-[#B31824]"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-2 px-4 rounded-lg text-gray-700 font-medium text-sm transition bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-gray-600">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(eventData.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Time:</span>{" "}
                      {new Date(
                        `2000-01-01T${eventData.time}`
                      ).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Location:</span>{" "}
                      {eventData.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Created by:</span>{" "}
                      {eventData.creator}
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={handleSignUp}
                disabled={
                  isSignedUp || isPastEvent(eventData.date, eventData.time)
                }
                className={`w-full py-2 px-4 rounded-lg text-white font-medium text-sm transition bg-green-600 hover:bg-green-700 mb-4 ${
                  isSignedUp || isPastEvent(eventData.date, eventData.time)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#D41B2C] hover:bg-[#B31824]"
                }`}
              >
                {isSignedUp
                  ? "Already Signed Up"
                  : isPastEvent(eventData.date, eventData.time)
                  ? "Event Has Passed"
                  : "Sign Up for Event"}
              </button>

              {isEventOwner && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2 px-4 rounded-lg text-white font-medium text-sm transition bg-blue-600 hover:bg-blue-700 mb-4"
                >
                  Edit Event
                </button>
              )}

              {isEventOwner && !isEditing && (
                <button
                  onClick={handleDeleteEvent}
                  className="w-full py-2 px-4 rounded-lg text-white font-medium text-sm transition bg-red-600 hover:bg-red-700"
                >
                  Delete Event
                </button>
              )}
            </div>
          </div>

          {/* Participants Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold mb-4">Participants</h2>
              <div className="max-h-[600px] overflow-y-auto">
                {eventData.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#D41B2C] rounded-full flex items-center justify-center text-white font-semibold">
                        {participant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-600">
                          {participant.username}
                        </p>
                      </div>
                    </div>
                    {(isEventOwner || session?.user?.id === participant.id) && (
                      <button
                        onClick={() =>
                          handleRemoveParticipant(eventData.attendees[index])
                        }
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                        title="Remove participant"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black mt-16 relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white">
            <p>&copy; 2025 Stetson Social. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
