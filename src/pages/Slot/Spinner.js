import React from "react";
import styles from "./styles/Reel.module.css";

const Reel = ({ image, spinning }) => {
  return (
    <div className={`${styles.reel} ${spinning ? styles.spinning : ""}`}>
      {image ? (
        <img src={image.src} alt="slot-icon" className={styles.icon} />
      ) : (
        <div className={styles.placeholder}>🎰</div> // Un fallback si no hay imagen
      )}
    </div>
  );
};

export default Reel;
