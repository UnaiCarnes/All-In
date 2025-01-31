import React, { useState, useEffect } from 'react';
import styles from './styles/SlotMachine.module.css';
import Reel from './Spinner';
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios';

const SlotMachine = () => {
  const [grid, setGrid] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0); // Inicializar balance desde el backend
  const [amount, setAmount] = useState('');
  const { t } = useTranslation();

  const images = [
    { src: "/img/slots-icons/billete.png", value: 1 },
    { src: "/img/slots-icons/cerveza.png", value: 5 },
    { src: "/img/slots-icons/cofre.png", value: 2 },
    { src: "/img/slots-icons/cristal.png", value: 3 },
    { src: "/img/slots-icons/durum.png", value: 4 },
    { src: "/img/slots-icons/llave.png", value: 6 },
    { src: "/img/slots-icons/moneda.png", value: 7 },
    { src: "/img/slots-icons/pocion.png", value: 8 },
    { src: "/img/slots-icons/pollo.png", value: 9 },
  ];

  // Cargar balance inicial desde la base de datos
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('/profile');
        setBalance(response.data.userInfo.balance);
      } catch (error) {
        console.error('Error al cargar el balance:', error);
      }
    };

    fetchBalance();

    // Escuchar eventos de actualización de balance
    const handleBalanceUpdate = (event) => {
      setBalance(event.detail.balance);
    };

    window.addEventListener('balanceUpdated', handleBalanceUpdate);

    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate);
    };
  }, []);

  // Inicializar el grid con imágenes aleatorias
  useEffect(() => {
    const initializeGrid = () => {
      const initialGrid = Array(3)
        .fill(null)
        .map(() =>
          Array(3)
            .fill(null)
            .map(() => images[Math.floor(Math.random() * images.length)])
        );
      setGrid(initialGrid);
    };

    initializeGrid();
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setAmount('');
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        if (parsedValue > balance) {
          setAmount(balance);
        } else {
          setAmount(parsedValue);
        }
      }
    }
  };

  const updateBalance = async (newBalance) => {
    try {
      await axios.put('/profile/balance', { balance: newBalance });
      setBalance(newBalance);
      window.dispatchEvent(new CustomEvent('balanceUpdated', { detail: { balance: newBalance } }));
    } catch (error) {
      console.error('Error al actualizar el balance:', error);
    }
  };

  const spinReels = () => {
    if (amount <= 0 || amount > balance) {
      setMessage(t('No tienes suficiente balance para apostar.'));
      return;
    }

    setSpinning(true);
    setBalance((prevBalance) => prevBalance - amount);
    updateBalance(balance - amount);

    const newGrid = Array(3)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(() => images[Math.floor(Math.random() * images.length)])
      );

    setTimeout(() => {
      setGrid(newGrid);
      checkWin(newGrid);
      setSpinning(false);
    }, 2000);
  };

  const checkWin = (grid) => {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        grid[a[0]][a[1]].value === grid[b[0]][b[1]].value &&
        grid[a[0]][a[1]].value === grid[c[0]][c[1]].value
      ) {
        const winAmount = amount * 3;
        const newBalance = balance + winAmount;
        setMessage(`¡Ganaste ${winAmount} pambicoins! 🎉`);
        updateBalance(newBalance);
        return;
      }
    }

    setMessage(t('¡No hubo suerte esta vez! 😢'));
  };

  return (
    <div className={styles.slotMachineContainer}>
      <div className={styles.reels}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <Reel key={colIndex} image={cell} spinning={spinning} />
            ))}
          </div>
        ))}
      </div>

      <br></br>
      <br></br>

      <div className={styles.controls}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0.10"
          max={balance}
          step="0.10"
          className={styles.input}
          disabled={spinning}
          placeholder={t('Ingrese su apuesta')}
        />
        <button
          onClick={spinReels}
          className={styles.button}
          disabled={spinning || amount <= 0}
        >
          {spinning ? t('Girando...') : t('Apostar')}
        </button>
      </div>

      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default SlotMachine;
