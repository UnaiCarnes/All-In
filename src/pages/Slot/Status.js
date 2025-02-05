import React, { useState, useEffect } from "react";
import styles from "./styles/Status.module.css";

const Status = ({ message, balance, placeBet, gameReset, spinning }) => {
  const [amount, setAmount] = useState("");
  const [inputStyle, setInputStyle] = useState(styles.input);

  useEffect(() => {
    if (amount > balance) {
      setInputStyle(styles.inputError);
    } else {
      setInputStyle(styles.input);
    }
  }, [amount, balance]);

  useEffect(() => {
    if (gameReset) {
      setAmount("");
    }
  }, [gameReset]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        if (parsedValue < 0) {
          setAmount("");
        } else if (parsedValue > balance) {
          setAmount(balance);
        } else {
          setAmount(parsedValue);
        }
      }
    }
  };

  const handleBetClick = () => {
    if (!spinning && amount > 0) {
      placeBet(amount);
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
          placeholder="Ingresa tu apuesta"
        />
        <button onClick={handleBetClick} className={styles.button} disabled={spinning || amount <= 0}>
          Apostar
        </button>
      </div>
    </div>
  );
};

export default Status;
