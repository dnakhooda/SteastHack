"use client";

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Home() {
  let router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseClick = (e) => {
    e.preventDefault();
    if (!router) {
      return;
    }
    router.push('/');
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result.error) {
        setErrors({
          submit: 'Invalid email or password'
        });
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrors({
        submit: 'An error occurred during login'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#D41B2C] flex items-center justify-center">
              <span className="text-white text-4xl font-serif font-light tracking-tighter leading-none" style={{ fontFamily: 'Times New Roman' }}>N</span>
            </div>
            <h2 className="text-2xl font-bold text-black">Login</h2>
          </div>
          <button
            className="text-[#D41B2C] hover:text-[#B31824]"
            onClick={handleCloseClick}
          >
            ✕
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-[#D41B2C] text-black`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-[#D41B2C] text-black`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#D41B2C] hover:bg-[#B31824] text-white font-bold py-2 px-4 rounded-lg transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-[#D41B2C] hover:text-[#B31824] font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
