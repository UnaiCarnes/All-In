import React, { useState, useEffect, useContext } from 'react';
import GameCard from '../components/ui/GameCard';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { t } = useTranslation();
  const { user, loading } = useContext(UserContext);

  const [randomizedGames, setRandomizedGames] = useState([]);
  const [sectionsOrder, setSectionsOrder] = useState([]);

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

  // Claves de las secciones para traducción
  const sectionKeys = [
    "MAIN.Tus juegos favoritos",
    "MAIN.Mas jugados",
    "MAIN.Mayores recompensas",
  ];

  // Inicialización del orden de las secciones
  useEffect(() => {
    const savedOrder = localStorage.getItem('sectionsOrder');
    if (savedOrder) {
      setSectionsOrder(JSON.parse(savedOrder));
    } else {
      setSectionsOrder(sectionKeys); // Usar claves de traducción
    }
  }, []);

  // Inicialización de juegos aleatorios
  useEffect(() => {
    const shuffleGames = () => {
      const shuffled = [...games].sort(() => Math.random() - 0.5).slice(0, 6);
      setRandomizedGames(shuffled);
    };

    shuffleGames();
  }, [t]);

  

  // Modificar el orden de las secciones
  const handleReorderSections = () => {
    if (sectionsOrder.length > 1) {
      const newOrder = [
        sectionsOrder[1],
        sectionsOrder[2],
        sectionsOrder[0],
      ];
      setSectionsOrder(newOrder);
      localStorage.setItem('sectionsOrder', JSON.stringify(newOrder));
    }
  };

  // Renderizar una sección con traducción dinámica
  const renderGameSection = (key) => (
    <section className="mb-12 last:mb-0">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">{t(key)}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {randomizedGames.map((game, index) => (
          <GameCard
            key={`${key}-${index}`}
            title={game.title}
            image={game.image}
          />
        ))}
      </div>
    </section>
  );

  const renderAdminTools = () => (
    <section className="mb-12 last:mb-0">
      <div className="flex space-x-4">
        <button
          className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-md"
          onClick={handleReorderSections}
        >
          {t("MAIN.Modificar Secciones")}
        </button>
      </div>
    </section>
  );

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (user?.role === 'guest') {
    return (
      <div className="space-y-8 px-12 py-8 max-w-[1920px] mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Bienvenido, Invitado
        </h1>
        {sectionsOrder.map((sectionKeys) => renderGameSection(sectionKeys))}
      </div>
    );
  }

  return (
    <div className="space-y-8 px-12 py-8 max-w-[1920px] mx-auto">
      {user?.role === 'admin' && renderAdminTools()}
      {sectionsOrder.map((sectionKeys) => renderGameSection(sectionKeys))}
    </div>
  );
};

export default Home;
