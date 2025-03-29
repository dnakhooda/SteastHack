"use client";

import { useRouter } from 'next/navigation'

export default function Home() {
  let router = useRouter();

  const handleCloseClick= (e) => {
    e.preventDefault();
    if (!router) {
      return;
    }
    router.push('/');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Login</h2>
          <button
            className="text-[#D41B2C] hover:text-[#B31824]"
            onClick={handleCloseClick}
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D41B2C] text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D41B2C] text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
