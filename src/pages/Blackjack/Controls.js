import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles/Controls.module.css';

const Controls = ({ gameState, buttonState, hitEvent, standEvent, resetEvent }) => {
  const { t } = useTranslation();
  const getControls = () => {
    if (gameState === 0) {
      return null;
    } else {
      return (
        <div className={styles.controlsContainer}>
          <button onClick={hitEvent} disabled={buttonState.hitDisabled} className={styles.button}>
          {t('BLACKJACK.Pedir Carta')}
          </button>
          <button onClick={standEvent} disabled={buttonState.standDisabled} className={styles.button}>
          {t('BLACKJACK.Plantarse')}
          </button>
          <button onClick={resetEvent} disabled={buttonState.resetDisabled} className={styles.button}>
          {t('BLACKJACK.Reiniciar')}
          </button>
        </div>
      );
    }
  };

  return <>{getControls()}</>;
};

export default Controls;