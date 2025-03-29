"use client";

import { useRouter } from 'next/navigation';

export default function LearnMore() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black">
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="h-20 bg-gradient-to-r from-black via-black to-[#D41B2C] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">EventHub</h1>
            <nav className="space-x-8">
              <button 
                onClick={() => router.push('/')}
                className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide"
              >
                Home
              </button>
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">About</a>
              <a href="#" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">Contact</a>
              <button 
                onClick={() => router.push('/login')}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-2 px-4 rounded-lg transition"
              >
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-black animate-float">Welcome to EventHub</h1>
          
          <div className="space-y-12">
            {/* About Section */}
            <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#D41B2C]">
              <h2 className="text-2xl font-bold mb-4 text-[#D41B2C]">About EventHub</h2>
              <p className="text-lg text-gray-700 mb-4">
                EventHub is your one-stop platform for discovering and creating events in Stetson East. We connect Northeastern students with exciting opportunities to engage with their community.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're looking to join existing events or create your own, EventHub makes it easy to stay connected with your fellow students.
              </p>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#D41B2C]">
                <h3 className="text-xl font-bold mb-4 text-[#D41B2C]">Discover Events</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Browse upcoming events</li>
                  <li>• View event details</li>
                  <li>• Join events easily</li>
                  <li>• Track your participation</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#D41B2C]">
                <h3 className="text-xl font-bold mb-4 text-[#D41B2C]">Create Events</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Set up new events</li>
                  <li>• Manage attendees</li>
                  <li>• Share event details</li>
                  <li>• Track event success</li>
                </ul>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#D41B2C]">
              <h2 className="text-2xl font-bold mb-6 text-[#D41B2C]">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D41B2C] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-bold mb-2">Browse Events</h3>
                  <p className="text-gray-700">Explore upcoming events in Stetson East</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D41B2C] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-bold mb-2">Join Events</h3>
                  <p className="text-gray-700">Sign up for events you're interested in</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D41B2C] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-bold mb-2">Create Events</h3>
                  <p className="text-gray-700">Organize and manage your own events</p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div className="text-center">
              <button 
                onClick={() => router.push('/')}
                className="bg-[#D41B2C] text-white font-bold py-4 px-8 rounded-full transition hover:bg-[#B31824] text-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>

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