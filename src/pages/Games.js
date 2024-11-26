import React from 'react';
import Card from '../components/ui/Card';

const Games = () => {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: "url('/img/fondo1.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Card className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-500 mb-4">
          Available Games
        </h1>
        <p className="text-gray-300">
          Select a game from the sidebar to start playing!
        </p>
      </Card>

      {/* Aquí puedes agregar más contenido específico de juegos */}
    </div>
  );
};

export default Games;