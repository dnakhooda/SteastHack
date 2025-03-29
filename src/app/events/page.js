"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useSession, signOut } from 'next-auth/react';

export default function EventsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleClick = (e) => {
    e.preventDefault();
    if (!router) {
      return;
    }
    router.push('/login');
  }

  const handleJoinEvent = (eventTitle) => {
    router.push(`/events/${eventTitle}`);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(`/`);
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <style jsx>{`
        @font-face {
          font-family: 'Big Shoulders Inline';
          src: url('/fonts/BigShouldersInline-VariableFont_opsz,wght.ttf') format('truetype-variations');
          font-weight: 100 900;
        }
        
        .hero-text {
          font-family: 'Big Shoulders Inline', sans-serif;
          color: #000000;
          font-weight: 700;
          letter-spacing: 0.01em;
          line-height: 1.2;
        }
        
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
              <h1 className="text-3xl font-bold text-white">Stetson Social</h1>
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
                <>
                  <button 
                    onClick={handleClick}
                    className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => router.push('/signup')}
                    className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Events Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">All Events</h1>
          <p className="text-gray-600">Discover and join exciting events at Stetson East</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg relative">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black via-black to-[#D41B2C] p-[2px]">
            <div className="bg-white rounded-lg h-full w-full"></div>
          </div>
          <div className="relative bg-white rounded-lg p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-lg transition ${
                  activeTab === 'upcoming'
                    ? 'bg-[#D41B2C] text-white'
                    : 'text-black hover:bg-[#D41B2C] hover:text-white'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 rounded-lg transition border-2 ${
                  activeTab === 'past'
                    ? 'bg-[#D41B2C] text-white border-[#D41B2C]'
                    : 'text-black hover:bg-[#D41B2C] hover:text-white border-[#D41B2C]'
                }`}
              >
                Past Events
              </button>
            </div>

            {/* Events Grid */}
            <div className="mt-8">
              {activeTab === 'upcoming' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Movie Night", date: "2024-03-20", location: "Stetson East Lounge" },
                    { title: "Game Tournament", date: "2024-03-22", location: "Stetson East Game Room" },
                    { title: "Study Group", date: "2024-03-25", location: "Stetson East Study Room" },
                    { title: "Pizza Party", date: "2024-03-28", location: "Stetson East Common Room" },
                    { title: "Karaoke Night", date: "2024-03-30", location: "Stetson East Lounge" },
                    { title: "Board Game Night", date: "2024-04-01", location: "Stetson East Game Room" }
                  ].map((event) => (
                    <div key={event.title} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#D41B2C] hover:shadow-xl transition-shadow duration-300">
                      <div className="h-48 bg-[#D41B2C]"></div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 text-black">{event.title}</h3>
                        <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-4">Location: {event.location}</p>
                        <button
                          onClick={() => handleJoinEvent(event.title)}
                          className="w-full bg-[#D41B2C] text-white font-bold py-2 px-4 rounded transition hover:bg-[#B31824]"
                        >
                          Join Event
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'past' && (
                <div className="text-center text-gray-600">
                  <p>No past events to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
