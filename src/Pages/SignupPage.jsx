import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../Hooks/useAuth';
export function SignupPage() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { signup } = useAuth();
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.name,formData.email,formData.password)
    console.log('Signup Data:', formData);
   
  };

  return (
    <div className="flex items-center justify-center px-4">
         <ToastContainer />
      <div className="w-full max-w-md bg-white justify-center my-20 rounded-lg border border-gray-200 p-6">
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <PenTool className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <p className="text-sm text-gray-500">
              Join our community of writers and readers
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none text-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-2 rounded-md mt-5"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?
            <button
              onClick={() => navigate('/login')}
              className="ml-1 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
