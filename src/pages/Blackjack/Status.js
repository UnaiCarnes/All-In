import React, { useState, useEffect } from 'react';
import styles from './styles/Status.module.css';
import { useTranslation } from 'react-i18next';

const Status = ({ message, balance, placeBet, resetGame }) => {
  const [amount, setAmount] = useState('');
  const [inputStyle, setInputStyle] = useState(styles.input);
  const [canBet, setCanBet] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (amount > balance) {
      setInputStyle(styles.inputError);
    } else {
      setInputStyle(styles.input);
    }
  }, [amount, balance]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '') {
        setAmount('');
    } else {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            if (parsedValue < 0) {
                setAmount('');
            } else if (parsedValue > balance) {
                setAmount(balance);
            } else {
                setAmount(parsedValue);
            }
        }
    }
};

  const handleBetClick = () => {
    if (canBet && amount > 0) {
      placeBet(amount);
      setCanBet(false);
    }
  };

  return (
    <div className={styles.statusContainer}>
    <div className={styles.status}>
        <h1 className={styles.value}>{message}</h1>
    </div>
      <div className={styles.betContainer}>
        <h4>
          <img src="/img/moneda.png" alt="Moneda" className={styles.coinImage} />
        </h4>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0.10"
          max={balance}
          step="0.10"
          className={inputStyle}
          placeholder={t('BLACKJACK.Ingresa tu apuesta')}
        />
        <button onClick={handleBetClick} className={styles.button} disabled={!canBet}>
        {t('BLACKJACK.Apostar')}
        </button>
      </div>
    </div>
  );
};

export default Status;