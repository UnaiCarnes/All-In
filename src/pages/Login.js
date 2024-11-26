import React from 'react';

const Login = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl text-yellow-500 text-center mb-6">Log In</h2>
      <form>
        <input type="text" placeholder="Username" className="block w-full p-2 mb-4" />
        <input type="password" placeholder="Password" className="block w-full p-2 mb-4" />
        <button className="w-full bg-yellow-500 py-2 rounded">Log In</button>
      </form>
    </div>
  </div>
);

export default Login;
