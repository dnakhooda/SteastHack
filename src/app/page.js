"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      {/* Header */}
      <header className="bg-slate-900 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-cyan-400">EventHub</h1>
            <nav className="space-x-6">
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition">Home</a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition">About</a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition">Contact</a>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-semibold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full mx-4 border border-cyan-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400">Login</h2>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-cyan-800 focus:outline-none focus:border-cyan-500 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-cyan-800 focus:outline-none focus:border-cyan-500 text-gray-100"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6 text-cyan-400">Discover Amazing Events</h2>
          <p className="text-xl text-gray-300 mb-8">Find and join the most exciting events in your area</p>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-cyan-800">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'upcoming'
                  ? 'bg-cyan-600 text-white'
                  : 'text-cyan-400 hover:bg-cyan-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'past'
                  ? 'bg-cyan-600 text-white'
                  : 'text-cyan-400 hover:bg-cyan-900'
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'create'
                  ? 'bg-cyan-600 text-white'
                  : 'text-cyan-400 hover:bg-cyan-900'
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
                  <div key={event} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-cyan-800">
                    <div className="h-48 bg-cyan-900"></div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-cyan-400">Event Title {event}</h3>
                      <p className="text-gray-300 mb-4">Date: {new Date().toLocaleDateString()}</p>
                      <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="text-center text-gray-300">
                <p>No past events to display</p>
              </div>
            )}

            {activeTab === 'create' && (
              <div className="max-w-md mx-auto">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-cyan-800 focus:outline-none focus:border-cyan-500 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-cyan-800 focus:outline-none focus:border-cyan-500 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-cyan-800 focus:outline-none focus:border-cyan-500 text-gray-100"
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Create Event
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 mt-16 border-t border-cyan-800">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-cyan-400">
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
