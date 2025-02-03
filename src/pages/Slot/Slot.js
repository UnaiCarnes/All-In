import React, { useState, useEffect } from 'react';
import styles from './styles/SlotMachine.module.css';
import Reel from './Spinner';
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios';

const SlotMachine = () => {
  const [grid, setGrid] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [gameStats, setGameStats] = useState({
    totalSpins: 0,
    wins: 0,
    losses: 0,
    streak: 0,
  });

  const { t } = useTranslation();

  const images = [
    { src: '/img/slots-icons/billete.png', value: 1 },
    { src: '/img/slots-icons/cerveza.png', value: 5 },
    { src: '/img/slots-icons/cofre.png', value: 2 },
    { src: '/img/slots-icons/cristal.png', value: 3 },
    { src: '/img/slots-icons/durum.png', value: 4 },
    { src: '/img/slots-icons/llave.png', value: 6 },
    { src: '/img/slots-icons/moneda.png', value: 7 },
    { src: '/img/slots-icons/pocion.png', value: 8 },
    { src: '/img/slots-icons/pollo.png', value: 9 },
  ];

  useEffect(() => {
    const fetchBalanceAndStats = async () => {
      try {
        const response = await axios.get('/profile');
        setBalance(response.data.userInfo.balance);
        setGameStats(response.data.userInfo.slotStats || gameStats);
        initializeGrid();
      } catch (error) {
        console.error('Error al cargar el balance:', error);
      }
    };

    fetchBalanceAndStats();
  }, []);

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

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setAmount('');
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setAmount(Math.min(parsedValue, balance));
      }
    }
  };

  const updateGlobalStats = async (win) => {
    setGameStats((prevStats) => {
        const updatedStats = {
            totalSpins: prevStats.totalSpins + 1,
            wins: win ? prevStats.wins + 1 : prevStats.wins,
            losses: win ? prevStats.losses : prevStats.losses + 1,
            streak: win ? prevStats.streak + 1 : 0, // Reinicia la racha si hay una derrota
        };

        // Aquí puedes hacer la llamada a la API para actualizar las estadísticas
        updateStatisticsAPI(updatedStats);

        return updatedStats; // Devuelve el nuevo estado
    });
};

  const updateStatisticsAPI = async (updatedStats) => {
      try {
          const response = await axios.put('/profile/statistics', {
            gamesPlayed: 1, // Siempre es 1 porque se jugó una partida
            gamesWon: updatedStats.wins > gameStats.wins ? 1 : 0, // Solo suma 1 si hay victoria
            gamesLost: updatedStats.losses > gameStats.losses ? 1 : 0, // Solo suma 1 si hay derrota
              totalWagered: parseFloat(amount),
              totalWon: updatedStats.wins > 0 ? parseFloat(amount) * 3 : 0,
              totalLost: updatedStats.losses > 0 ? parseFloat(amount) : 0,
              lastPrize: updatedStats.wins > 0 ? parseFloat(amount) * 3 : 0,
              bestPrize: Math.max(gameStats.bestPrize || 0, updatedStats.wins > 0 ? parseFloat(amount) * 3 : 0),
              highestBet: Math.max(gameStats.highestBet || 0, parseFloat(amount)),
              highestStreak: updatedStats.streak,
          });

          if (response.status === 200) {
              console.log('Estadísticas actualizadas correctamente.');
          }
      } catch (error) {
          console.error('Error al actualizar las estadísticas:', error);
      }
  };

  const updateBalance = async (newBalance) => {
    try {
      await axios.put('/profile/balance', { balance: newBalance });
      setBalance(newBalance);
    } catch (error) {
      console.error('Error al actualizar el balance:', error);
    }
  };
  
  const updateBalanceDisplay = (newBalance) => {
    updateBalance(newBalance);
    const event = new CustomEvent('balanceUpdated', { detail: { balance: newBalance } });
    window.dispatchEvent(event);
  };
  

  const spinReels = () => {
    if (amount <= 0 || amount > balance) {
      setMessage(t('No tienes suficiente balance para apostar.'));
      return;
    }

    setSpinning(true);
    updateBalanceDisplay(balance - amount);

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
        updateBalanceDisplay(newBalance);
        updateGlobalStats(true);
        return;
      }
    }

    setMessage(t('¡No hubo suerte esta vez! 😢'));
    updateGlobalStats(false);
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

      <div className={styles.controls}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0.10"
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
