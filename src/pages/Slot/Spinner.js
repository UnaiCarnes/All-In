import React from "react";
import styles from "./styles/Reel.module.css";

const Reel = ({ image, spinning, isWinning }) => {
  return (
    <div
      className={`${styles.reel} ${spinning ? styles.spinning : ""} ${
        isWinning ? styles.winning : ""
      }`}
    >
      {image ? (
        <img src={image.src} alt="slot-icon" className={styles.icon} />
      ) : (
        <div className={styles.placeholder}>🎰</div>
      )}
    </div>
  );
};


export default Reel;
