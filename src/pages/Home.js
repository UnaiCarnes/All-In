import React from 'react';
import GameCard from '../components/ui/GameCard';

const Home = () => {
  const games = Array(6).fill({
    title: 'Casino Game',
    image: '/img/header3.png'
  });

  const renderGameSection = (title, games) => (
    <section className="mb-8 last:mb-0 bg-gray-800 bg-opacity-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {games.map((game, index) => (
          <GameCard 
            key={index}
            title={game.title}
            image={game.image}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-8">
      {renderGameSection('Your Favorite Games', games)}
      {renderGameSection('Most Played', games)}
      {renderGameSection('Highest Reward', games)}
    </div>
  );
};

export default Home;