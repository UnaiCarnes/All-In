// src/pages/Roulettes.js
import React, { useState, useEffect, useContext } from 'react';
import GameCard from '../components/ui/GameCard';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Ruletas = () => {
  const { t } = useTranslation();
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate(); // Inicializar useNavigate
  console.log("User Context Data:", { user, loading });

  const [rouletteOrder, setRouletteOrder] = useState([]);

  const games = [
    { id: 1, title: t("MAIN.Ruleta"), image: '/img/juego1.png', type: "roulette", route: "/roulette" },
    { id: 3, title: t("MAIN.Ruleta"), image: '/img/juego3.png', type: "roulette", route: "/roulette" },
  ];

  useEffect(() => {
    const savedOrder = localStorage.getItem('rouletteOrder');
    if (savedOrder) {
      setRouletteOrder(JSON.parse(savedOrder));
    } else {
      setRouletteOrder(games);
    }
  }, [t]);

  const handleReorderRoulettes = () => {
    const newOrder = [
      rouletteOrder[1],
      rouletteOrder[0],
    ];
    setRouletteOrder(newOrder);
    localStorage.setItem('rouletteOrder', JSON.stringify(newOrder));
  };

  const handleGameClick = (route) => {
    navigate(route); // Redirigir a la ruta de la ruleta
  };

  const renderGameSection = () => (
    <section className="mb-12 last:mb-0">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        {t("MAIN.Ruleta")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {rouletteOrder.map((game, index) => (
          <div key={`roulette-${index}`} onClick={() => handleGameClick(game.route)}> {/* Añadir el manejador de clic */}
            <GameCard
              title={game.title}
              image={game.image}
              route={game.route}
            />
          </div>
        ))}
      </div>
    </section>
  );

  const renderAdminTools = () => (
    <section className="mb-12 last:mb-0">
      <div className="flex space-x-4">
        <button
          className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-md"
          onClick={handleReorderRoulettes}
        >
          {t("MAIN.Modificar Orden")}
        </button>
      </div>
    </section>
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className="h-[calc(100vh-6rem)] overflow-hidden pl-12 pt-8"
      style={{
        backgroundImage: "url('/img/fondo1.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {user?.role === 'admin' && renderAdminTools()}
      {renderGameSection()}
    </div>
  );
};

export default Ruletas;