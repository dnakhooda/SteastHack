"use client";

import { useRouter } from 'next/router'
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-black text-black">
      
      {/* Header */}
      <header className="h-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-500 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">EventHub</h1>
            <nav className="space-x-6">
              <a href="#" className="text-white hover:text-emerald-100 transition">Home</a>
              <a href="#" className="text-white hover:text-emerald-100 transition">About</a>
              <a href="#" className="text-white hover:text-emerald-100 transition">Contact</a>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">Login</h2>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-black"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'upcoming'
                  ? 'bg-green-500 text-white'
                  : 'text-black hover:bg-green-100'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'past'
                  ? 'bg-green-500 text-white'
                  : 'text-black hover:bg-green-100'
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'create'
                  ? 'bg-green-500 text-white'
                  : 'text-black hover:bg-green-100'
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
                  <div key={event} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                    <div className="h-48 bg-green-100"></div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-black">Event Title {event}</h3>
                      <p className="text-gray-700 mb-4">Date: {new Date().toLocaleDateString()}</p>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="text-center text-gray-700">
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Description</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 text-black"
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
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
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-700">
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
