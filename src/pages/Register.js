import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Sign Up
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="form-input w-full text-black"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="form-input w-full text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="form-input w-full text-black"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Birth date
            </label>
            <input
              type="date"
              className="form-input w-full text-black"
              min="1900-01-01"
              max="2024-12-31"
              required
            />
          </div>

          <Button type="submit">
            Create Account
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Log In
            </Link>
          </p>
          <p className="text-center text-sm text-gray-400 mt-4">
            <Link to="/" className="text-yellow-500 hover:underline">
              Enter as a guest
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;