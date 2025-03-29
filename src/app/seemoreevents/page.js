"use client";

import { useState } from "react";
import Image from "next/image";

// Mock event data - replace with real data later
const events = [
  {
    id: 1,
    title: "Movie Night",
    date: "2024-04-15",
    time: "7:00 PM",
    location: "Blackman Auditorium",
    description: "Join us for a fun movie night! We'll be watching a popular film and providing snacks.",
    image: "/movienight.jpg"
  },
  {
    id: 2,
    title: "Game Tournament",
    date: "2024-04-20",
    time: "2:00 PM",
    location: "Stetson East Lounge",
    description: "Compete in our exciting game tournament featuring various board games and video games.",
    image: "/gametournament.jpg"
  },
  {
    id: 3,
    title: "Study Group",
    date: "2024-04-25",
    time: "3:00 PM",
    location: "Stetson East Study Room",
    description: "Form study groups and prepare for upcoming exams together.",
    image: "/studygroup.jpg"
  },
  {
    id: 4,
    title: "Pizza Party",
    date: "2024-05-01",
    time: "6:00 PM",
    location: "Stetson East Kitchen",
    description: "Enjoy free pizza and socialize with other residents!",
    image: "/pizzaparty.jpg"
  },
  {
    id: 5,
    title: "Fitness Class",
    date: "2024-05-05",
    time: "4:00 PM",
    location: "Marino Recreational Center",
    description: "Join our resident fitness instructor for a fun workout session.",
    image: "/fitnessclass.jpg"
  },
  {
    id: 6,
    title: "Art Workshop",
    date: "2024-05-10",
    time: "2:00 PM",
    location: "Shillman Hall",
    description: "Express your creativity in our guided art workshop.",
    image: "/artworkshop.jpg"
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="h-20 bg-gradient-to-r from-black via-black to-[#D41B2C] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">EventHub</h1>
            <nav className="space-x-8">
              <a href="/" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">Home</a>
              <a href="/contact" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">Contact</a>
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Events</h1>
          <p className="text-lg text-gray-600">
            Discover and join exciting events happening in Stetson East
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <p className="text-[#D41B2C]">{event.date} at {event.time}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Join Event
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Date & Time</h3>
                  <p className="text-gray-600">{selectedEvent.date} at {selectedEvent.time}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Location</h3>
                  <p className="text-gray-600">{selectedEvent.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Description</h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>
                <button
                  className="w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Confirm Join
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
