import React from 'react';
import GameCard from '../components/ui/GameCard';

const Home = () => {
  const games = Array(6).fill({
    title: 'Casino Game',
    image: '/img/header3.png'
  });

  const renderGameSection = (title, games) => (
    <section className="mb-12 last:mb-0">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
    <div className="space-y-8 px-12 py-8 max-w-[1920px] mx-auto">
      {renderGameSection('Your Favorite Games', games)}
      {renderGameSection('Most Played', games)}
      {renderGameSection('Highest Reward', games)}
    </div>
  );
};

export default Home;