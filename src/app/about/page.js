"use client";

import { useRouter } from 'next/navigation';
import Nav from '@/componenets/Nav';
    
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

            <Nav />

            {/* Main Content */}
            <main className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center text-black animate-float">About Our Team</h1>

                    <div className="space-y-12">
                        {/* Mission Statement */}
                        <section className="bg-white rounded-lg p-8 shadow-lg border-2 border-[#D41B2C]">
                            <h2 className="text-2xl font-bold mb-4 text-[#D41B2C]">Our Mission</h2>
                            <p className="text-lg text-gray-700 mb-8">
                                At Stetson Social, we&apos;re dedicated to fostering a vibrant community within Stetson East. Our mission is to create a seamless platform that connects Northeastern students, enabling them to discover, create, and participate in exciting events right in their residence hall.
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
                                    <p className="text-sm text-gray-500 mt-2">Computer Science &apos;28</p>
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
                                    <p className="text-sm text-gray-500 mt-2">Computer Science &apos;28</p>
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
                                    <p className="text-sm text-gray-500 mt-2">Computer Science & Computer Engineering &apos;28</p>
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
                                    <p className="text-sm text-gray-500 mt-2">Computer Science &apos;28</p>
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
                        <p>&copy; 2025 Stetson Social. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 