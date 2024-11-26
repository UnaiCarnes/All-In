import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header 
      className="fixed top-0 w-full h-24 z-50 flex justify-between items-center p-4"
      style={{
        backgroundImage: "url('/img/header1.2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Profile Box */}
      <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
        <Link to="/profile" className="flex items-center space-x-2 text-white hover:text-yellow-400">
          <span>Profile</span>
        </Link>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center">
        <Link to="/" className="transform hover:scale-105 transition-transform">
          <img src="/img/logo.png" alt="Casino Logo" className="w-20 h-20" />
        </Link>
      </div>

      {/* Balance Box */}
      <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
        <Link to="/balance" className="flex items-center space-x-2 text-white hover:text-yellow-400">
          <span>Balance</span>
          <img src="/img/moneda.png" alt="Coin" className="w-5 h-5" />
          <span className="text-yellow-400">1000</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;