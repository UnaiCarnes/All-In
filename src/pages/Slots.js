import React, { useState, useEffect, useContext } from 'react';
import GameCard from '../components/ui/GameCard';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';
import Slot from '../pages/Slot/Slot'

const Slots = () => {
  const { t } = useTranslation();
  const { user, loading } = useContext(UserContext); // Obtenemos usuario y estado de carga
  console.log("User Context Data:", { user, loading });

  const [slotOrder, setSlotOrder] = useState([]);

  const games = [
    { id: 2, title: t("MAIN.Tragaperras"), image: '/img/juego2.png',type:"slot", route:"/slot" },
    { id: 6, title: t("MAIN.Tragaperras"), image: '/img/juego6.png',type:"slot", route:"/slot" },
    { id: 9, title: t("MAIN.Tragaperras"), image: '/img/juego9.png',type:"slot", route:"/slot" },
  ];

  useEffect(() => {
    const savedOrder = localStorage.getItem('slotOrder');
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
  
      // 🔥 Asegurar que cada juego tiene una ruta
      const restoredOrder = parsedOrder.map((game) => ({
        ...game,
        route: game.route || "/slot", // Si `route` está vacío, asignamos "/slot"
      }));
  
      setSlotOrder(restoredOrder);
    } else {
      setSlotOrder(games); // Orden predeterminado
    }
  }, [t]);

  // Función para cambiar el orden de las imágenes
  const handleReorderSlots = () => {
    const newOrder = [
      slotOrder[2], // El tercero pasa a ser el primero
      slotOrder[0], // El primero pasa a ser el segundo
      slotOrder[1], // El segundo pasa a ser el tercero
    ];
    setSlotOrder(newOrder);
    localStorage.setItem('slotOrder', JSON.stringify(newOrder)); // Guardar el nuevo orden en localStorage
  };

  const renderGameSection = () => (
    <section className="mb-12 last:mb-0">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        {t("MAIN.Tragaperras")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {slotOrder.map((game, index) => (
          <GameCard
            key={`slot-${index}`}
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

export default Slots;