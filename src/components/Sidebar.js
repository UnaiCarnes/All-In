import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="fixed left-0 top-24 bottom-0 w-48 bg-[#1a1b26] text-white flex flex-col">
    <div className="p-4 flex flex-col h-full">
      {/* Sección superior */}
      <div>
        <h2 className="text-yellow-400 font-semibold text-lg mb-4">Games</h2>
        
        <nav className="flex flex-col space-y-3">
          <Link to="/roulette" className="text-gray-300 hover:text-white">
            Roulette
          </Link>
          <Link to="/blackjack" className="text-gray-300 hover:text-white">
            Blackjack
          </Link>
          <Link to="/poker" className="text-gray-300 hover:text-white">
            Poker
          </Link>
          <Link to="/horse-racing" className="text-gray-300 hover:text-white">
            Horse Racing
          </Link>
        </nav>
      </div>

      {/* Espaciador que empuja el contenido inferior */}
      <div className="flex-grow"></div>

      {/* Sección inferior */}
      <div className="pb-4">
        <div className="flex justify-center gap-2 mb-3">
          <span className="text-gray-300">EN</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-300">ES</span>
        </div>
        
        <div className="flex flex-row gap-4 justify-center">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Log In
          </Link>
          <Link to="/register" className="text-gray-300 hover:text-white">
            Register
          </Link>
        </div>
      </div>
    </div>
  </aside>
);

export default Sidebar;