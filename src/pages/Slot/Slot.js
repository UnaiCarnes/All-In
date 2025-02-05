import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {useWindowSize} from 'react-use';
import styles from './styles/SlotMachine.module.css';
import Reel from './Spinner';
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios';

const SlotMachine = () => {
  const [grid, setGrid] = useState([]);
  const [winningPositions, setWinningPositions] = useState([]);
  const { width, height } = useWindowSize();
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
    { src: '/img/slots-icons/pollo.png', value: 1, multiplier: 2, probability: 0.25 },
    { src: '/img/slots-icons/billete.png', value: 2, multiplier: 3, probability: 0.17 },
    { src: '/img/slots-icons/pocion.png', value: 3, multiplier: 4, probability: 0.14 },
    { src: '/img/slots-icons/cristal.png', value: 4, multiplier: 5, probability: 0.12 },
    { src: '/img/slots-icons/llave.png', value: 5, multiplier: 6, probability: 0.1 },
    { src: '/img/slots-icons/cofre.png', value: 6, multiplier: 7, probability: 0.08 },
    { src: '/img/slots-icons/cerveza.png', value: 7, multiplier: 8, probability: 0.06 },
    { src: '/img/slots-icons/durum.png', value: 8, multiplier: 9, probability: 0.05 },
    { src: '/img/slots-icons/moneda.png', value: 9, multiplier: 10, probability: 0.03 },
  ];

  const triggerConfetti = () => {
    // Configuración para disparar confetti desde las esquinas
    const duration = 2 * 1000; // 2 segundos
    const end = Date.now() + duration;

    // Función para disparar desde las esquinas
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 }, // Esquina inferior izquierda
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 }, // Esquina inferior derecha
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

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

  const getRandomImage = () => {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const image of images) {
      cumulativeProbability += image.probability;
      if (random < cumulativeProbability) {
        return image;
      }
    }

    // Por defecto, devuelve la última imagen.
    return images[images.length - 1];
  };

  const initializeGrid = () => {
    const initialGrid = Array(3)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(() => getRandomImage())
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
          .map(() => getRandomImage())
      );

    setTimeout(() => {
      setGrid(newGrid);
      checkWin(newGrid);
      setSpinning(false);
    }, 2000);
  };

  const checkWin = (grid) => {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]], // Horizontal 1
      [[1, 0], [1, 1], [1, 2]], // Horizontal 2
      [[2, 0], [2, 1], [2, 2]], // Horizontal 3
      [[0, 0], [1, 0], [2, 0]], // Vertical 1
      [[0, 1], [1, 1], [2, 1]], // Vertical 2
      [[0, 2], [1, 2], [2, 2]], // Vertical 3
      [[0, 0], [1, 1], [2, 2]], // Diagonal 1
      [[0, 2], [1, 1], [2, 0]], // Diagonal 2
    ];
  
    let totalWinAmount = 0;
    let totalMultiplier = 0;
    const allWinningPositions = [];
  
    // Map para contar ocurrencias de cada símbolo
    const symbolCounts = {};
  
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        grid[a[0]][a[1]].value === grid[b[0]][b[1]].value &&
        grid[a[0]][a[1]].value === grid[c[0]][c[1]].value
      ) {
        const winningImage = grid[a[0]][a[1]];
        const multiplier = winningImage.multiplier;
  
        // Sumar el multiplicador de la combinación actual
        totalMultiplier += multiplier;
        totalWinAmount += amount * multiplier;
  
        // Guardar posiciones ganadoras
        allWinningPositions.push(...combination);
  
        // Incrementar contador de símbolos ganadores
        symbolCounts[winningImage.value] = (symbolCounts[winningImage.value] || 0) + 1;
      }
    }
  
    // Verificar si toda la cuadrícula tiene el mismo símbolo
    const allSameSymbol = grid.every(row => row.every(cell => cell.value === grid[0][0].value));
    if (allSameSymbol) {
      const globalMultiplier = totalMultiplier * 8; // Considera todas las combinaciones posibles
      totalWinAmount = amount * globalMultiplier;
      totalMultiplier = globalMultiplier;
    }
  
    if (totalWinAmount > 0) {
      const newBalance = balance + totalWinAmount;
      setMessage(
        t('SLOTS.¡Ganaste', {
          totalWinAmount,
          totalMultiplier,
        })
      );
      updateBalanceDisplay(newBalance);
      setWinningPositions(allWinningPositions); // Guardar todas las posiciones ganadoras
      updateGlobalStats(true);
      triggerConfetti();
    } else {
      setMessage(t('SLOTS.¡No hubo suerte esta vez!'));
      setWinningPositions([]); // Reinicia si no hay ganancia
      updateGlobalStats(false);
    }          
  }

  return (
    <div className={styles.slotMachineWrapper}>
      <h1 className={styles.mainTitle}>{t('SLOTS.Tragaperras')}</h1>
      <div className={styles.slotMachineContainer}>
        <div className={styles.reels}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <Reel
                  key={colIndex}
                  image={cell}
                  spinning={spinning}
                  isWinning={winningPositions.some(
                    ([r, c]) => r === rowIndex && c === colIndex
                  )}
                />
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
            placeholder={t('SLOTS.Ingrese su apuesta')}
          />
          <button
            onClick={spinReels}
            className={styles.button}
            disabled={spinning || amount <= 0}
          >
            {spinning ? t('SLOTS.Girando...') : t('SLOTS.Apostar')}
          </button>
        </div>
  
        <p className={styles.message}>{message}</p>
        <div className={styles.multipliersMenu}>
          <h3>{t('SLOTS.Multiplicadores de las imágenes')}</h3>
          <div className={styles.imagesList}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageItem}>
                <img
                  src={image.src}
                  alt={`Ícono ${image.value}`}
                  className={styles.icon}
                />
                <p>{t('SLOTS.Multiplicador').replace('x', `x${image.multiplier}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default SlotMachine;
