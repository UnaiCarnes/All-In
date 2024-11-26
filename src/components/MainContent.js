import React from 'react';

const MainContent = () => {
  const games = Array(6).fill({
    image: '/img/header3.png',
    title: 'Casino Game'
  });

  const renderGames = (games) => {
    return games.map((game, index) => (
      <a key={index} href="/games" className="game-box relative overflow-hidden rounded-lg transition-transform hover:scale-105 z-0">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
          <p className="text-white text-center">{game.title}</p>
        </div>
      </a>
    ));
  };

  return (
    <div 
      className="fixed inset-0 left-48 z-0" // Añadido left-48 para respetar el sidebar
      style={{
        backgroundImage: "url('/img/header4.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <main className="p-6 space-y-8 mt-24 relative z-0 overflow-auto h-full">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Your Favorite Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {renderGames(games)}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Most Played</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {renderGames(games)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainContent;