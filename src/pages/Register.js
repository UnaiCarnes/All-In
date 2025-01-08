import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import axios from '../utils/axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    birth_date: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Sign Up
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="name"
              className="form-input w-full text-black"
              placeholder="Choose a username"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input w-full text-black"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-input w-full text-black"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="form-input w-full text-black"
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Birth date
            </label>
            <input
              type="date"
              name="birth_date"
              className="form-input w-full text-black"
              min="1900-01-01"
              max="2024-12-31"
              value={formData.birth_date}
              onChange={handleChange}
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