import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header 
      className="fixed top-0 left-0 w-full h-28 z-50 flex justify-between items-center px-24 overflow-hidden"
      style={{
        backgroundImage: "url('/img/header1.2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'translateZ(0)', // Fuerza el hardware acceleration
        willChange: 'transform' // Optimiza las transformaciones
      }}
    >
      {/* Overlay oscuro */}
      <div 
        className="absolute inset-0 bg-black opacity-30"
        style={{ pointerEvents: 'none' }}
      />

      {/* Profile Box */}
      <div className="rounded-lg transition-colors z-10 pl-4">
        <Link to="/profile" className="flex items-center space-x-4 text-yellow-400 hover:text-yellow-300 transform transition-all duration-300 hover:scale-110">
          <span className="text-2xl font-bold">Profile</span>
        </Link>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center z-10" style={{ marginLeft: '14rem' }}>
        <Link to="/" className="transform hover:scale-105 transition-transform">
          <img src="/img/logo.png" alt="Casino Logo" className="w-[5.5rem] h-[5.5rem]" />
        </Link>
      </div>

      {/* Balance Box */}
      <div className="rounded-lg transition-colors z-10 pr-4">
        <Link to="/balance" className="flex items-center space-x-4 text-yellow-400 hover:text-yellow-300 transform transition-all duration-300 hover:scale-110">
          <span className="text-2xl font-bold">Balance</span>
          <img src="/img/moneda.png" alt="Coin" className="w-8 h-8" />
          <span className="text-yellow-400 text-2xl font-bold">1000</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;