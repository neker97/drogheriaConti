import React, { useState } from 'react';

import styles from '../styles/Card.module.css';

interface CardProps {
  image: string; // Solo il nome, es: "prodotto1.png"
  title: string;
  description: string;
  imagepng: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
        {/* FRONT */}
        <div className={`${styles.cardFace} ${styles.front}`}>
          <img
            className={styles.cardImage}
            src={`/assets/images/products/${image}`}
            alt={title}
          />
          <h3 className={styles.cardTitle}>{title}</h3>
          <button className={styles.btn} onClick={() => setFlipped(true)}>
            Info
          </button>
        </div>
        {/* BACK */}
        <div className={`${styles.cardFace} ${styles.back}`}>
          <div className={styles.backContent}>{description}</div>
          <div className={styles.backBtnWrapper}>
            <button className={styles.btn} onClick={() => setFlipped(false)}>
              &larr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
