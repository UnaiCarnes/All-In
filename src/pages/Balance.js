import React from 'react';

const Balance = () => {
  const bankOptions = [
    { id: 1, bank: 'Banco 1', amount: 500 },
    { id: 2, bank: 'Banco 2', amount: 1000 },
  ];

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: "url('/img/fondo5.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Opciones para Agregar Saldo
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Selecciona una opción de préstamo bancario para agregar saldo a tu cuenta:
        </p>
        <div className="space-y-4">
          {bankOptions.map((option) => (
            <div
              key={option.id}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              <h3 className="text-lg font-bold text-yellow-400">{option.bank}</h3>
              <p className="text-sm">
                Préstamo de{' '}
                <img
                  src="/img/moneda.png"
                  alt="Coin"
                  className="inline-block w-4 h-4 ml-1"
                />{' '}
                <span className="text-yellow-400">{option.amount}</span>
              </p>
              <button className="w-full mt-2 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold">
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Imagen fija en la esquina inferior derecha */}
      <img
        src="/img/mistaWhite.png"
        alt="Imagen"
        className="fixed bottom-5 right-5 w-12 h-12 z-20"
      />
    </div>
  );
};

export default Balance;
