"use client";

import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  let router = useRouter();

  const handleClick= (e) => {
    e.preventDefault();
    if (!router) {
      return;
    }
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <style jsx>{`
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

      {/* Header */}
      <header className="h-20 bg-gradient-to-r from-black via-black to-[#D41B2C] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">EventHub</h1>
            <nav className="space-x-8">
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">Home</a>
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">About</a>
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">Contact</a>
              <button 
                onClick={handleClick}
                className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6 text-black animate-bounce">Discover Events in Stetson East!</h2>
          <button className="bg-[#D41B2C] text-white font-bold py-3 px-8 rounded-full transition hover:bg-[#B31824]">
            Learn More
          </button>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg p-6 shadow-lg relative">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black via-black to-[#D41B2C] p-[6px]">
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
                  {[1, 2, 3].map((event) => (
                    <div key={event} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#D41B2C]">
                      <div className={`h-48 bg-[#D41B2C]`}></div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 text-black">Event Title {event}</h3>
                        <p className="text-black mb-4">Date: {new Date().toLocaleDateString()}</p>
                        <button className="w-full bg-[#D41B2C] text-white font-bold py-2 px-4 rounded transition hover:bg-[#B31824]">
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
      <footer className="bg-black mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white">
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
