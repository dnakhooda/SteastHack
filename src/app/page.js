"use client";

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    imageUrl: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      
      if (!data.success || !data.url) {
        throw new Error('Invalid response from server');
      }

      // Store the complete data URL
      setFormData(prev => ({ ...prev, imageUrl: data.url }));
      
      // Log for debugging
      console.log('Image uploaded successfully:', {
        imageUrl: data.url.substring(0, 50) + '...',
        formData: { ...formData, imageUrl: data.url }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
      // Clear the preview and form data on error
      setImagePreview(null);
      setFormData(prev => ({ ...prev, imageUrl: null }));
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      // Log the form data before sending
      console.log('Creating event with data:', {
        ...formData,
        imageUrl: formData.imageUrl ? formData.imageUrl.substring(0, 50) + '...' : null
      });

      // Ensure we're sending the complete form data
      const eventData = {
        title: formData.title,
        date: formData.date,
        description: formData.description,
        imageUrl: formData.imageUrl, // Make sure we're sending the imageUrl
      };

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      const createdEvent = await response.json();
      console.log('Event created successfully:', {
        id: createdEvent.id,
        title: createdEvent.title,
        imageUrl: createdEvent.imageUrl ? createdEvent.imageUrl.substring(0, 50) + '...' : null
      });

      // Clear form and refresh events
      setFormData({ title: '', date: '', description: '', imageUrl: null });
      setImagePreview(null);
      fetchEvents();
      setActiveTab('upcoming');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-white text-black relative overflow-hidden flex flex-col">
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
          opacity: 0.70;
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
          background-color: #000000;
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
            <button className="flex items-center space-x-6" onClick={() => router.push('/')}>
              <div className="w-12 h-12 bg-[#D41B2C] flex items-center justify-center">
                <span className="text-white text-4xl font-serif font-light tracking-tighter leading-none" style={{ fontFamily: 'Times New Roman' }}>N</span>
              </div>
              <h1 className="text-3xl font-bold text-white">SteastHub</h1>
            </button>
            <nav className="space-x-8">
              <a href="/" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">Home</a>
              <a href="/about" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">About</a>
              <a href="/contact" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide px-4 py-2 rounded-lg hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">Contact</a>
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

      {/* Main Content */}
      <main className="flex-grow">
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
                  className={`px-6 py-2 rounded-lg transition border-2 ${
                    activeTab === 'upcoming'
                      ? 'bg-[#D41B2C] text-white border-[#D41B2C]'
                      : 'text-black hover:bg-[#D41B2C] hover:text-white border-[#D41B2C]'
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
                    {events.map((event) => (
                      <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-[#D41B2C]">
                        <div className={`h-48 ${event.imageUrl ? '' : 'bg-[#D41B2C]'}`}>
                          {event.imageUrl && (
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error('Image failed to load:', event.imageUrl);
                                e.target.src = ''; // Clear the source on error
                              }}
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2 text-black">{event.title}</h3>
                          <p className="text-black mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                          <p className="text-black mb-4">Created by: {event.creatorName}</p>
                          <button
                            onClick={() => handleJoinEvent(event.id)}
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
                    <form className="space-y-4" onSubmit={handleCreateEvent}>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Event Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Date</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                          rows="4"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Event Image</label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                          />
                          {imagePreview && (
                            <div className="relative">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreview(null);
                                  setFormData(prev => ({ ...prev, imageUrl: null }));
                                }}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-[#D41B2C] text-white font-bold py-2 px-4 rounded-lg transition hover:bg-[#B31824] ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Creating Event...' : 'Create Event'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black mt-auto relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white">
            <p>&copy; 2025 SteastHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
