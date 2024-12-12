// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario del localStorage

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    localStorage.removeItem('user'); // Eliminar la información del usuario
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const games = [
    { name: 'Roulette', path: '/games' },
    { name: 'Blackjack', path: '/games' },
    { name: 'Poker', path: '/games' },
    { name: 'Horse Racing', path: '/games' },
    { name: 'Slots', path: '/games' },
  ];

  const socialLinks = [
    { name: 'X', icon: '/img/x.svg', url: 'https://x.com/AllIn_0fficial' },
    { name: 'Instagram', icon: '/img/instagram.svg', url: 'https://www.instagram.com/all_in.0fficial/' },
    { name: 'Email', icon: '/img/email.svg', url: 'mailto:casino.allin.official@gmail.com' },
    { name: 'TikTok', icon: '/img/tik-tok.svg', url: 'https://www.tiktok.com/@all_in.official' }
  ];

  return (
    <aside className="fixed left-0 top-28 w-52 h-[calc(100vh-7rem)] bg-gray-800 p-5 flex flex-col">
      {/* Games List */}
      <div className="mb-7">
        <h3 className="text-2xl text-yellow-400 mb-5 font-extrabold tracking-wide"> 
          Games
        </h3>
        <nav className="space-y-4 pl-4">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.path}
              className="block text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
            >
              {game.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1"></div>

      <div className="flex justify-center mb-5 border-t border-gray-700 pt-5">
        <button className="text-lg text-gray-300 hover:text-yellow-400 mx-3 transition-all duration-300 transform hover:scale-110">EN</button>
        <span className="text-lg text-gray-300">/</span>
        <button className="text-lg text-gray-300 hover:text-yellow-400 mx-3 transition-all duration-300 transform hover:scale-110">ES</button>
      </div>

      {/* Botones de Login/Logout */}
      <div className="border-t border-gray-700 pt-5 flex justify-center">
        {user ? (
          <button 
            onClick={handleLogout} 
            className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login" className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 mr-4"> {/* Añadido margen derecho */}
              Log In
            </Link>
            <Link to="/register" className="text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <div className="border-t border-gray-700 pt-5">
        <div className="flex justify-center space-x-5">
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
                className="w-8 h-8"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;