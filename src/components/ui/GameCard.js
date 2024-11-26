import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ title, image = '/img/header3.png' }) => {
  return (
    <Link to="/games" className="game-box">
      <div className="relative group">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2
          transform transition-transform group-hover:translate-y-0">
          <p className="text-white text-center">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;