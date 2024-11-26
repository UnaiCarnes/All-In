import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const BankOption = ({ bank, amount }) => (
  <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-200">
    <h3 className="text-lg font-bold text-yellow-400">{bank}</h3>
    <p className="text-sm">
      Préstamo de{' '}
      <img
        src="/img/moneda.png"
        alt="Coin"
        className="inline-block w-4 h-4 ml-1"
      />{' '}
      <span className="text-yellow-400">{amount}</span>
    </p>
    <Button className="mt-2">Seleccionar</Button>
  </div>
);

const Balance = () => {
  const bankOptions = [
    { id: 1, bank: 'Banco 1', amount: 500 },
    { id: 2, bank: 'Banco 2', amount: 1000 },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/img/fondo5.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Card className="max-w-lg w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Opciones para Agregar Saldo
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Selecciona una opción de préstamo bancario para agregar saldo a tu cuenta:
        </p>
        <div className="space-y-4">
          {bankOptions.map((option) => (
            <BankOption key={option.id} {...option} />
          ))}
        </div>
      </Card>
      
      <img
        src="/img/mistaWhite.png"
        alt="Mista White"
        className="fixed bottom-5 right-5 w-12 h-12 z-20"
      />
    </div>
  );
};

export default Balance;