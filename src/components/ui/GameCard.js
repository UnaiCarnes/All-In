import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ title, image }) => {
  return (
    <Link to="/games" className="game-box">
      <div className="relative group overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-center text-lg font-bold">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

GameCard.defaultProps = {
  image: '/img/header3.png'
};

export default GameCard;