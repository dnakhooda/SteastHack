"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from 'next-auth/react';

export default function EventPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const eventTitle = params.eventTitle;
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Mock data - replace with actual data from your database
  const eventData = {
    title: decodeURIComponent(eventTitle),
    image: "/krentzman-quad.png", // Replace with actual event image
    description: "Join us for an exciting event at Stetson East! This is a sample description that would be provided by the event creator. It can include details about the event, what to bring, and any other important information.",
    creator: "JohnDoe",
    date: "2024-03-20",
    time: "7:00 PM",
    location: "Stetson East Lounge",
    participants: [
      { name: "Alice Smith", username: "@alice" },
      { name: "Bob Johnson", username: "@bob" },
      { name: "Carol White", username: "@carol" },
      { name: "David Brown", username: "@david" },
      { name: "Eve Wilson", username: "@eve" },
      { name: "Frank Miller", username: "@frank" },
      { name: "Grace Lee", username: "@grace" },
      { name: "Henry Davis", username: "@henry" }
    ]
  };

  const handleSignUp = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    setIsSignedUp(true);
    // Add logic to update the participants list in your database
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(`/`);
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <style jsx>{`
        .background-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/krentzman-quad.png');
          background-size: cover;
          background-position: center;
          opacity: 0.50;
          filter: brightness(1.2) saturate(1.1);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div className="background-image" />
      
      {/* Header */}
      <header className="h-20 bg-gradient-to-r from-black via-black to-[#D41B2C] shadow-lg relative z-10">
        <div className="container mx-auto px-0 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-[#D41B2C] flex items-center justify-center">
                <span className="text-white text-4xl font-serif font-light tracking-tighter leading-none" style={{ fontFamily: 'Times New Roman' }}>N</span>
              </div>
              <h1 className="text-3xl font-bold text-white">SteastHub</h1>
            </div>
            <nav className="space-x-8">
              <a href="/" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">Home</a>
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">About</a>
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">Contact</a>
              {session ? (
                <>
                  <span className="text-white text-lg font-medium">
                    Welcome, {session.user.name}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => router.push('/login')}
                  className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

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
              />
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h1 className="text-3xl font-bold mb-4">{eventData.title}</h1>
              <p className="text-gray-600 mb-6">{eventData.description}</p>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> {new Date(eventData.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Time:</span> {eventData.time}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span> {eventData.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Created by:</span> {eventData.creator}
                </p>
              </div>

              <button
                onClick={handleSignUp}
                disabled={isSignedUp}
                className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition ${
                  isSignedUp 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#D41B2C] hover:bg-[#B31824]'
                }`}
              >
                {isSignedUp ? 'Already Signed Up' : 'Sign Up for Event'}
              </button>
            </div>
          </div>

          {/* Participants Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold mb-4">Participants</h2>
              <div className="max-h-[600px] overflow-y-auto">
                {eventData.participants.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#D41B2C] rounded-full flex items-center justify-center text-white font-semibold">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-600">{participant.username}</p>
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
            <p>&copy; 2024 SteastHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}