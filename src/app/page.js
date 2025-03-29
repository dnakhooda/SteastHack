"use client";

import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const router = useRouter();
  const { data: session } = useSession();

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
        @keyframes swirl {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-swirl {
          background-size: 200% 200%;
          animation: swirl 15s ease infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .northeastern-red {
          color: #D41B2C;
        }
        .northeastern-red-bg {
          background-color: #D41B2C;
        }
        .northeastern-red-border {
          border-color: #D41B2C;
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
              <h1 className="text-3xl font-bold text-white">EventHub</h1>
            </div>
            <nav className="space-x-8">
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">Home</a>
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-6 text-black animate-bounce font-['Lexend']">Discover Events in Stetson East!</h2>
          <button 
            onClick={() => router.push('/learnmore')}
            className="bg-[#D41B2C] text-white font-bold py-3 px-8 rounded-full transition hover:bg-[#B31824]"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-6 py-8 relative z-10">
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
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-2 rounded-lg transition border-2 ${
                  activeTab === 'create'
                    ? 'bg-[#D41B2C] text-white border-[#D41B2C]'
                    : 'text-black hover:bg-[#D41B2C] hover:text-white border-[#D41B2C]'
                }`}
              >
                Create Event
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'upcoming' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Event Cards */}
                  {["Event1", "Event2", "Event3", "Event4"].map((event) => (
                    <div key={event} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#D41B2C]">
                      <div className={`h-48 bg-[#D41B2C]`}></div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 text-black">Event Title {event}</h3>
                        <p className="text-black mb-4">Date: {new Date().toLocaleDateString()}</p>
                        <button
                        onClick={() => handleJoinEvent(event)}
                        className="w-full bg-[#D41B2C] text-white font-bold py-2 px-4 rounded transition hover:bg-[#B31824]">
                          Join Event
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'past' && (
                <div className="text-center text-black">
                  <p>No past events to display</p>
                </div>
              )}

              {activeTab === 'create' && (
                <div className="max-w-md mx-auto">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Event Title</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Description</label>
                      <textarea
                        className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                        rows="4"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#D41B2C] text-white font-bold py-2 px-4 rounded-lg transition hover:bg-[#B31824]"
                    >
                      Create Event
                    </button>
                  </form>
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
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
