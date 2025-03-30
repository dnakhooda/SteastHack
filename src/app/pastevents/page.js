"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Nav from "@/componenets/Nav";

export default function PastEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if event is in the past
  const isPastEvent = (date, time) => {
    const now = new Date();
    const eventDateTime = new Date(`${date}T${time}`);
    return eventDateTime < now;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      // Sort events by date
      const sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      // If API fails, try to get events from localStorage
      if (typeof window !== "undefined") {
        try {
          const storedEvents = localStorage.getItem("events");
          if (storedEvents) {
            const parsedEvents = JSON.parse(storedEvents);
            const sortedEvents = parsedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            setEvents(sortedEvents);
          }
        } catch (localError) {
          console.error("Error loading events from localStorage:", localError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Past Events</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-lg transition border-2 text-black hover:bg-[#D41B2C] hover:text-white border-[#D41B2C] font-['Lexend']"
          >
            Back to Home
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D41B2C] mx-auto"></div>
          </div>
        ) : events.filter(event => isPastEvent(event.date, event.time)).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl font-semibold font-['Lexend']">No past events to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.filter(event => isPastEvent(event.date, event.time)).map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-[#D41B2C]">
                <div className="relative h-48">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-[#D41B2C]"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    <p className="text-white">{new Date(event.date).toLocaleDateString()} at {new Date(`2000-01-01T${event.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-2">Location: {event.location}</p>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  <p className="text-gray-600 mb-4">Created by: {event.creatorName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 