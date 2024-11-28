import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de login
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{
        backgroundImage: "url('/img/fondo6.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}> 
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Log In
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="form-input w-full text-black"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          <Button type="submit">
            Enter
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Sign Up
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

export default Login;