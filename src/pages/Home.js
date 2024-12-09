import React, { useState, useEffect } from 'react';
import GameCard from '../components/ui/GameCard';

const Home = () => {
  const [randomizedGames, setRandomizedGames] = useState([]);

  const games = [
    { id: 1, title: 'Roulette', image: '/img/juego1.png' },
    { id: 2, title: 'Slots', image: '/img/juego2.png' },
    { id: 3, title: 'Roulette', image: '/img/juego3.png' },
    { id: 4, title: 'Blackjack', image: '/img/juego4.png' },
    { id: 5, title: 'Horse Race', image: '/img/juego5.png' },
    { id: 6, title: 'Slots', image: '/img/juego6.png' },
    { id: 7, title: 'Poker', image: '/img/juego7.png' },
    { id: 8, title: 'Poker', image: '/img/juego8.png' },
    { id: 9, title: 'Slots', image: '/img/juego9.png' },
  ];

  useEffect(() => {
    const shuffleGames = () => {
      const shuffled = [...games]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6); // Tomamos solo 6 juegos para cada sección
      setRandomizedGames(shuffled);
    };

    shuffleGames();
  }, []);

  const renderGameSection = (title) => (
    <section className="mb-12 last:mb-0">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {randomizedGames.map((game, index) => (
          <GameCard 
            key={`${title}-${index}`}
            title={game.title}
            image={game.image}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-8 px-12 py-8 max-w-[1920px] mx-auto">
      {renderGameSection('Your Favorite Games')}
      {renderGameSection('Most Played')}
      {renderGameSection('Highest Reward')}
    </div>
  );
};

export default Home;