"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';

// Mock ambassador data - replace with real data later
const ambassadors = [
  {
    id: 1,
    name: "Ben Jeter",
    role: "Residence Director",
    image: "/ben.jpeg",
    email: "b.jeter@northeastern.edu"
  },
  {
    id: 2,
    name: "Nicky Mosharaf",
    role: "Residence Assistant",
    image: "/nicky.jpeg",
    email: "mosharaf.n@northeastern.edu"
  },
  {
    id: 3,
    name: "Johan Almanzar",
    role: "Residence Assistant",
    image: "/johan.jpeg",
    email: "almanzar.j@northeastern.edu"
  },
  {
    id: 4,
    name: "Krish Bansal",
    role: "Residence Assistant",
    image: "/krish.jpeg",
    email: "bansal.krish@northeastern.edu"
  },
  {
    id: 5,
    name: "Olivier John Ndjike Nzia",
    role: "Residence Assistant",
    image: "/olivier.jpg",
    email: "ndjikenzia.o@northeastern.edu"
  },
  {
    id: 6,
    name: "Sophia Nguyen",
    role: "Residence Assistant",
    image: "/sophia.jpg",
    email: "nguyen.sop@northeastern.edu"
  },
  {
    id: 7,
    name: "Pablo Cardona Barber",
    role: "Residence Assistant",
    image: "/pablo.jpg",
    email: "cardonabarber.p@northeastern.edu"
  }
];

export default function ContactPage() {
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleClick = () => {
    router.push('/signin');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
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
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Our Ambassadors</h1>
            <p className="text-lg text-gray-600 mb-8">
              Get in touch with our dedicated ambassadors who are here to help you with any questions or concerns.
            </p>
          </div>

          {/* Ambassador Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {ambassadors.map((ambassador) => (
              <div
                key={ambassador.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 flex justify-center items-center bg-gray-100">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#D41B2C]">
                    <Image
                      src={ambassador.image}
                      alt={ambassador.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{ambassador.name}</h3>
                  <p className="text-[#D41B2C] mb-4">{ambassador.role}</p>
                  <p className="text-gray-600 mb-4">{ambassador.email}</p>
                  <button
                    onClick={() => setSelectedAmbassador(ambassador)}
                    className="w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Contact {ambassador.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Modal */}
          {selectedAmbassador && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Contact {selectedAmbassador.name}
                  </h2>
                  <button
                    onClick={() => setSelectedAmbassador(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D41B2C] focus:border-transparent"
                      rows="4"
                      placeholder="Write your message here..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Send Message
                  </button>
                </form>
                {showSuccess && (
                  <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    Message sent successfully!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
