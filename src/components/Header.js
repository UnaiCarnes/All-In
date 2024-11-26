import React from 'react';

const Header = () => (
  <header 
    className="p-4 flex justify-between items-center w-full fixed top-0 left-0 right-0 h-24 z-50"
    style={{
      backgroundImage: "url('/img/header1.2.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backgroundBlendMode: 'overlay'
    }}
  >
    <div className="box">
      <a href="/profile" className="text-white hover:text-yellow-400">Profile</a>
    </div>
    <div className="box2">
      <a href="/">
        <img src="/img/logo.png" alt="Logo" className="w-20 h-20" />
      </a>
    </div>
    <div className="box">
      <a href="/balance" className="flex items-center gap-2 text-yellow-400">
        <p>Balance</p>
        <img src="/img/moneda.png" alt="Coin" className="w-6 h-6" />
        <span>1000</span>
      </a>
    </div>
  </header>
);

export default Header;