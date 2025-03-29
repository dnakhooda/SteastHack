"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Nav from "@/componenets/Nav";

export default function EventPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const eventTitle = params.eventTitle;
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
            };
          })
        );

        setEventData((prev) => ({
          ...prev,
          attendees: updatedEvent.attendees,
          participants: attendeesWithDetails,
        }));
      }

      alert("Successfully joined the event!");
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join event: " + error.message);
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
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(eventData.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Time:</span> {eventData.time}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span>{" "}
                  {eventData.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Created by:</span>{" "}
                  {eventData.creator}
                </p>
              </div>

              <button
                onClick={handleSignUp}
                disabled={isSignedUp}
                className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition ${
                  isSignedUp
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#D41B2C] hover:bg-[#B31824]"
                }`}
              >
                {isSignedUp ? "Already Signed Up" : "Sign Up for Event"}
              </button>
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
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                  >
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
            <p>&copy; 2024 Stetson Social. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
