import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button'; // Importamos el botón

const BankOption = ({ bank, amount, interest, bets }) => {
  const [showDetails, setShowDetails] = useState(false);

  const interestRate = parseFloat(interest) / 100;
  const totalAmountToPay = amount * (1 + interestRate); // Monto total a devolver
  const costPerBet = totalAmountToPay / bets; // Costo por tirada

  return (
    <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-200">
      <h3 className="text-lg font-bold text-yellow-400">{bank}</h3>
      <p className="text-sm">
<<<<<<< HEAD
        Préstamo de{' '}
=======
        Loan of{' '}
>>>>>>> 05db4ebda824695f086429a8ab794a1d4877e903
        <img
          src="/img/moneda.png"
          alt="Coin"
          className="inline-block w-4 h-4 ml-1"
        />{' '}
        <span className="text-yellow-400">{amount} </span>
        <span
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-yellow-400 cursor-pointer hover:underline float-end"
        >
<<<<<<< HEAD
          {showDetails ? 'Ocultar' : 'Más Información'}
=======
          {showDetails ? 'Hide' : 'More information'}
>>>>>>> 05db4ebda824695f086429a8ab794a1d4877e903
        </span>
      </p>

      {showDetails && (
        <div
          className="mt-2 text-sm text-gray-300 max-h-40 overflow-y-auto"
        >
          <p>
<<<<<<< HEAD
            <strong>A devolución del:</strong>{' '}
            <span className="text-yellow-400">{interest}%</span>
          </p>
          <p>
            <strong>Tiradas:</strong> <span className="text-yellow-400">{bets}</span>
          </p>
          <p>
            <strong>Total a devolver:</strong>{' '}
            <span className="text-yellow-400">{totalAmountToPay.toFixed(2)}</span>
          </p>
          <p>
            <strong>Costo por tirada(Acumulable):</strong>{' '}
=======
            <strong>Upon return of:</strong>{' '}
            <span className="text-yellow-400">{interest}%</span>
          </p>
          <p>
            <strong>Bets:</strong> <span className="text-yellow-400">{bets}</span>
          </p>
          <p>
            <strong>Total to be return:</strong>{' '}
            <span className="text-yellow-400">{totalAmountToPay.toFixed(2)}</span>
          </p>
          <p>
            <strong>Cost per bet(Comulative):</strong>{' '}
>>>>>>> 05db4ebda824695f086429a8ab794a1d4877e903
            <span className="text-yellow-400">{costPerBet.toFixed(2)}</span>
          </p>
        </div>
      )}
<<<<<<< HEAD
      <Button className="mt-4">Seleccionar Préstamo</Button>
=======
      <Button className="mt-4">Select loan</Button>
>>>>>>> 05db4ebda824695f086429a8ab794a1d4877e903
    </div>
  );
};

const Balance = () => {
  const bankOptions = [
    { id: 1, bank: 'Cucha', amount: 500, interest: '17', bets: 10 },
    { id: 2, bank: 'Caja Urbana', amount: 1000, interest: '15', bets: 12 },
    { id: 3, bank: 'VVBA', amount: 1250, interest: '19', bets: 15 },
    { id: 4, bank: 'Pecander', amount: 1750, interest: '18', bets: 20 },
  ];

  return (
    <div className="balance-page">
      <Card className="max-w-lg w-full">
        <h2 className="text-2xl font-bold text-yellow-500 text-center mb-6">
          Options for adding banlance
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Select a loan option for adding balance to your account:
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
        className="fixed bottom-5 right-5 w-12 h-12 z-20 object-cover"
      />
    </div>
  );
};

export default Balance;
