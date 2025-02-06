import React, { useState, useEffect, useContext } from 'react';
import GameCard from '../components/ui/GameCard';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

const Races = () => {
  const { t } = useTranslation();
  const { user, loading } = useContext(UserContext); // Obtenemos usuario y estado de carga
  console.log("User Context Data:", { user, loading });

  const [slotOrder, setSlotOrder] = useState([]);

  const games = [
    { id: 5, title: t("MAIN.Carrera de caballos"), image: '/img/juego5.png', type:"horse", route:"/organs" },
  ];

  // Cargar el orden inicial desde localStorage o usar el predeterminado
  useEffect(() => {
    const savedOrder = localStorage.getItem('racesSlotOrder');
    if (savedOrder) {
      setSlotOrder(JSON.parse(savedOrder));
    } else {
      setSlotOrder(games); // Orden predeterminado
    }
  }, [t]); // Dependemos de `t` para asegurar que las traducciones estén listas

  // Función para cambiar el orden de los slots
  const handleReorderSlots = () => {
    if (slotOrder.length > 1) {
      const newOrder = [
        slotOrder[slotOrder.length - 1], // Último pasa a ser el primero
        ...slotOrder.slice(0, slotOrder.length - 1), // Resto se desplaza
      ];
      setSlotOrder(newOrder);
      localStorage.setItem('racesSlotOrder', JSON.stringify(newOrder)); // Guardar el nuevo orden en localStorage
    }
  };

  const renderGameSection = () => (
    <section className="mb-12 last:mb-0">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        {t("MAIN.Carrera de caballos")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {slotOrder.map((game, index) => (
          <GameCard
            key={`race-${index}`}
            title={game.title}
            image={game.image}
            route={game.route}
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
          onClick={handleReorderSlots}
        >
          {t("MAIN.Modificar Orden")}
        </button>
      </div>
    </section>
  );

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
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
      {user?.role === 'admin' && renderAdminTools()} {/* Solo visible para admins */}
      {renderGameSection()}
    </div>
  );
};

export default Races;
