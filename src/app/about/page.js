"use client";

import { useRouter } from 'next/navigation';

export default function About() {
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
            <button className="flex items-center space-x-6" onClick={() => router.push('/')}>
              <div className="w-12 h-12 bg-[#D41B2C] flex items-center justify-center">
                <span className="text-white text-4xl font-serif font-light tracking-tighter leading-none" style={{ fontFamily: 'Times New Roman' }}>N</span>
              </div>
              <h1 className="text-3xl font-bold text-white">EventHub</h1>
            </button>
            <nav className="space-x-8">
              <button 
                onClick={() => router.push('/')}
                className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide"
              >
                Home
              </button>
              <a href="/about" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">About</a>
              <a href="/contact" className="text-white hover:text-white transition-all duration-300 text-lg font-medium tracking-wide">Contact</a>
              <button 
                onClick={() => router.push('/login')}
                className="bg-white hover:bg-[#D41B2C] text-[#D41B2C] font-semibold py-2 px-4 rounded-lg transition"
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
          <h1 className="text-4xl font-bold mb-8 text-center text-black animate-float">About Our Team</h1>
          
          <div className="space-y-12">
            {/* Mission Statement */}
            <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#D41B2C]">
              <h2 className="text-2xl font-bold mb-4 text-[#D41B2C]">Our Mission</h2>
              <p className="text-lg text-gray-700">
                At EventHub, we're dedicated to fostering a vibrant community within Stetson East. Our mission is to create a seamless platform that connects Northeastern students, enabling them to discover, create, and participate in meaningful events that enrich their campus experience.
              </p>
            </section>

            {/* Team Section */}
            <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#D41B2C]">
              <h2 className="text-2xl font-bold mb-6 text-[#D41B2C]">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src="/dan.jpeg" 
                      alt="Dan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Dan Nakhooda</h3>
                  <p className="text-gray-700">Developer</p>
                  <p className="text-sm text-gray-500 mt-2">Computer Science '28</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src="/edgar.jpeg" 
                      alt="Edgar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Edgar Castaneda</h3>
                  <p className="text-gray-700">Developer</p>
                  <p className="text-sm text-gray-500 mt-2">Computer Science '28</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src="/gio.jpeg" 
                      alt="Gio" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Giovanni Limena</h3>
                  <p className="text-gray-700">Developer</p>
                  <p className="text-sm text-gray-500 mt-2">Computer Science & Computer Engineering '28</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src="/jeangio.jpeg" 
                      alt="JeanGio" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Giovanni Jean</h3>
                  <p className="text-gray-700">Developer</p>
                  <p className="text-sm text-gray-500 mt-2">Computer Science '28</p>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#D41B2C]">
              <h2 className="text-2xl font-bold mb-6 text-[#D41B2C]">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D41B2C] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">🤝</div>
                  <h3 className="font-bold mb-2">Community</h3>
                  <p className="text-gray-700">Building connections within Stetson East</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D41B2C] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">💡</div>
                  <h3 className="font-bold mb-2">Innovation</h3>
                  <p className="text-gray-700">Creating seamless event experiences</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D41B2C] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">🎯</div>
                  <h3 className="font-bold mb-2">Excellence</h3>
                  <p className="text-gray-700">Delivering the best platform for students</p>
                </div>
              </div>
            </section>
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