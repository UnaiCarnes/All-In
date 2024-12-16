import React, { useState, useEffect } from 'react';
import GameCard from '../components/ui/GameCard';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [randomizedGames, setRandomizedGames] = useState([]);

  // Definir los juegos dentro del renderizado
  const games = [
    { id: 1, title: t("MAIN.Ruleta"), image: '/img/juego1.png' },
    { id: 2, title: t("MAIN.Tragaperras"), image: '/img/juego2.png' },
    { id: 3, title: t("MAIN.Ruleta"), image: '/img/juego3.png' },
    { id: 4, title: t("MAIN.Blackjack"), image: '/img/juego4.png' },
    { id: 5, title: t("MAIN.Carrera de caballos"), image: '/img/juego5.png' },
    { id: 6, title: t("MAIN.Tragaperras"), image: '/img/juego6.png' },
    { id: 7, title: t("MAIN.Poker"), image: '/img/juego7.png' },
    { id: 8, title: t("MAIN.Poker"), image: '/img/juego8.png' },
    { id: 9, title: t("MAIN.Tragaperras"), image: '/img/juego9.png' },
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
            title={game.title} // Aquí se usa el título traducido
            image={game.image}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-8 px-12 py-8 max-w-[1920px] mx-auto">
      {renderGameSection(t("MAIN.Tus juegos favoritos"))}
      {renderGameSection(t("MAIN.Mas jugados"))}
      {renderGameSection(t("MAIN.Mayores recompensas"))}
    </div>
  );
};

export default Home;