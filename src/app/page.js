"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Nav from "@/componenets/Nav";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("featured");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    imageUrl: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

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
      const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      // If API fails, try to get events from localStorage
      if (typeof window !== "undefined") {
        try {
          const storedEvents = localStorage.getItem("events");
          if (storedEvents) {
            const parsedEvents = JSON.parse(storedEvents);
            const sortedEvents = parsedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            setEvents(sortedEvents);
          }
        } catch (localError) {
          console.error("Error loading events from localStorage:", localError);
        }
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      if (!data.success || !data.url) {
        throw new Error("Invalid response from server");
      }

      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image: " + error.message);
      setImagePreview(null);
      setFormData((prev) => ({ ...prev, imageUrl: null }));
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const eventData = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        location: formData.location,
        imageUrl: formData.imageUrl,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }

      const createdEvent = await response.json();

      setFormData({
        title: "",
        date: "",
        time: "",
        description: "",
        location: "",
        imageUrl: null,
      });
      setImagePreview(null);
      fetchEvents();
      setActiveTab("featured");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinEvent = (eventTitle) => {
    router.push(`/events/${eventTitle}`);
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden flex flex-col">
      <style jsx>{`
        @font-face {
          font-family: "Big Shoulders Inline";
          src: url("/fonts/BigShouldersInline-VariableFont_opsz,wght.ttf")
            format("truetype-variations");
          font-weight: 100 900;
        }

        .text-shadow-white {
          text-shadow: 
            -1px -1px 0 #fff,
            1px -1px 0 #fff,
            -1px 1px 0 #fff,
            1px 1px 0 #fff;
        }

        .hero-text {
          font-family: "Big Shoulders Inline", sans-serif;
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
          background-image: url("/krentzman-quad.png");
          background-size: cover;
          background-position: center;
          opacity: 0.7;
          filter: brightness(1.2) saturate(1.1);
          pointer-events: none;
          z-index: 0;
        }
        @keyframes swirl {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-swirl {
          background-size: 200% 200%;
          animation: swirl 15s ease infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .northeastern-red {
          color: #d41b2c;
        }
        .northeastern-red-bg {
          background-color: #000000;
        }
        .northeastern-red-border {
          border-color: #d41b2c;
        }
      `}</style>

      <div className="background-image" />

      {/* Header */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-6 text-black animate-bounce font-['Lexend']">
              <span className="text-shadow-white">Discover</span>{" "}
              <span className="text-shadow-white">Events</span>{" "}
              <span className="text-shadow-white">in</span>{" "}
              <span className="text-shadow-white">Stetson</span>{" "}
              <span className="text-shadow-white">East/West!</span>
            </h2>
            <button
              onClick={() => router.push("/learnmore")}
              className="bg-[#D41B2C] text-white font-bold py-3 px-8 rounded-full transition hover:bg-[#B31824] mt-8"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="container mx-auto px-6 py-8 relative z-20">
          <div className="bg-white rounded-lg p-6 shadow-lg relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-black via-black to-[#D41B2C] p-[2px]">
              <div className="bg-white rounded-lg h-full w-full"></div>
            </div>
            <div className="relative bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-black">
                  {activeTab === "featured" ? "Featured Events" : 
                   activeTab === "past" ? "Past Events" : 
                   "Event Creator"}
                </h2>
                <div className="space-x-4">
                  <button
                    onClick={() => setActiveTab("featured")}
                    className={`px-6 py-2 rounded-lg transition border-2 ${
                      activeTab === "featured"
                        ? "bg-[#D41B2C] text-white"
                        : "text-black hover:bg-[#D41B2C] hover:text-white"
                    } border-[#D41B2C] font-['Lexend']`}
                  >
                    Events
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`px-6 py-2 rounded-lg transition border-2 ${
                      activeTab === "past"
                        ? "bg-[#D41B2C] text-white"
                        : "text-black hover:bg-[#D41B2C] hover:text-white"
                    } border-[#D41B2C] font-['Lexend']`}
                  >
                    Past Events
                  </button>
                  <button
                    onClick={() => setActiveTab("create")}
                    className={`px-6 py-2 rounded-lg transition border-2 ${
                      activeTab === "create"
                        ? "bg-[#D41B2C] text-white"
                        : "text-black hover:bg-[#D41B2C] hover:text-white"
                    } border-[#D41B2C] font-['Lexend']`}
                  >
                    Create Event
                  </button>
                </div>
              </div>

              {/* Featured Events Grid */}
              {activeTab === "featured" && (
                <div>
                  {events.filter(event => !isPastEvent(event.date, event.time)).length === 0 ? (
                    <div className="text-center text-black">
                      <p className="text-lg font-semibold font-['Lexend']">No upcoming events to display</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.filter(event => !isPastEvent(event.date, event.time)).slice(0, 3).map((event) => (
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
                              <button
                                onClick={() => handleJoinEvent(event.title)}
                                className="w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-semibold py-2 px-4 rounded-lg transition"
                              >
                                Join Event
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {events.filter(event => !isPastEvent(event.date, event.time)).length > 3 && (
                        <div className="text-center mt-8">
                          <button
                            onClick={() => router.push('/upcomingevents')}
                            className="bg-[#D41B2C] hover:bg-[#B31824] text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
                          >
                            See More Events
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Past Events Section */}
              {activeTab === "past" && (
                <div>
                  {events.filter(event => isPastEvent(event.date, event.time)).length === 0 ? (
                    <div className="text-center text-black">
                      <p className="text-lg font-semibold font-['Lexend']">No past events to display</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.filter(event => isPastEvent(event.date, event.time)).slice(0, 3).map((event) => (
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
                      {events.filter(event => isPastEvent(event.date, event.time)).length > 3 && (
                        <div className="text-center mt-8">
                          <button
                            onClick={() => router.push('/pastevents')}
                            className="bg-[#D41B2C] hover:bg-[#B31824] text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
                          >
                            See All Past Events
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Create Event Form */}
              {activeTab === "create" && (
                <div className="max-w-md mx-auto">
                  <form className="space-y-4" onSubmit={handleCreateEvent}>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Event Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: e.target.value,
                          })
                        }
                        placeholder="e.g., Stetson East Lounge"
                        className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:border-[#D41B2C] text-black"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Event Image
                      </label>
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
                                setFormData((prev) => ({
                                  ...prev,
                                  imageUrl: null,
                                }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
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
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? "Creating Event..." : "Create Event"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black mt-auto relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white">
            <p>&copy; 2025 Stetson Social. All rights not reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
