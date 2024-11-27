import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const games = [
    { name: 'Roulette', path: '/games' },
    { name: 'Blackjack', path: '/games' },
    { name: 'Poker', path: '/games' },
    { name: 'Horse Racing', path: '/games' },
  ];

  const socialLinks = [
    { name: 'X', icon: '/img/x.png', url: 'https://twitter.com' },
    { name: 'Instagram', icon: '/img/instagram.png', url: 'https://instagram.com' },
    { name: 'Email', icon: '/img/email.png', url: 'mailto:contact@example.com' },
    { name: 'TikTok', icon: '/img/tik-tok.png', url: 'https://tiktok.com' }
  ];

  return (
    <aside className="fixed left-0 top-24 w-48 h-[calc(100vh-6rem)] bg-gray-800 p-4 flex flex-col">
      {/* Games List */}
      <div className="mb-6">
        <h3 className="text-xl text-yellow-400 mb-4">Games</h3>
        <nav className="space-y-3">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              className="block text-gray-300 hover:text-yellow-400 transition-colors"
            >
              {game.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Language Selector */}
      <div className="flex justify-center mb-4 border-t border-gray-700 pt-4">
        <button className="text-gray-300 hover:text-yellow-400 mx-2">EN</button>
        <span className="text-gray-300">/</span>
        <button className="text-gray-300 hover:text-yellow-400 mx-2">ES</button>
      </div>

      {/* Auth Links */}
      <div className="border-t border-gray-700 pt-4 mb-6 flex justify-between">
        <Link to="/login" className="text-gray-300 hover:text-yellow-400">
          Log In
        </Link>
        <Link to="/register" className="text-gray-300 hover:text-yellow-400">
          Sign Up
        </Link>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <img 
                src={social.icon} 
                alt={social.name}
                className="w-6 h-6"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;