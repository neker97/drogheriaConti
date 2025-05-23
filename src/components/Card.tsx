import React, { useRef, useState, useEffect } from 'react';

import styles from '../styles/Card.module.css';

interface CardProps {
  image: string; // esempio: prodotto1.jpg
  imagepng: string; // esempio: prodotto1.png
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, imagepng, title, description }) => {
  const [flipped, setFlipped] = useState(false);
  const [transform, setTransform] = useState('');
  const [showPng, setShowPng] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo lato client
    setIsMobile(
      typeof window !== 'undefined' &&
        window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  // Effetto 3D mousemove
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    setTransform(`rotateY(${rotateY}deg) rotateX(${rotateX}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('rotateY(0deg) rotateX(0deg)');
    setShowPng(false);
  };

  // Su mobile: tap per mostrare la PNG sopra la JPG
  const handleClickImg = () => {
    if (isMobile) {
      setShowPng((show) => !show);
    }
  };

  // Su desktop: mouse over per mostrare PNG sopra JPG
  const handleMouseEnterImg = () => {
    if (!isMobile) setShowPng(true);
  };

  const handleMouseLeaveImg = () => {
    if (!isMobile) setShowPng(false);
  };

  return (
    <div
      className={styles.cardContainer}
      ref={cardRef}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        style={{
          transform,
          transition: 'transform 0.33s cubic-bezier(.25,.8,.25,1)',
        }}
      >
        {/* FRONT */}
        <div className={`${styles.cardFace} ${styles.front}`}>
          <div
            className={styles.image3dBox}
            onClick={handleClickImg}
            onMouseEnter={handleMouseEnterImg}
            onMouseLeave={handleMouseLeaveImg}
            style={{
              cursor: isMobile ? 'pointer' : 'default',
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Immagine di base */}
            <img
              className={styles.cardImage}
              src={`/assets/images/products/${image}`}
              alt={title}
              draggable={false}
            />
            {/* PNG sopra la JPG, appare solo se showPng==true */}
            <img
              className={`${styles.cardImagePng} ${
                showPng ? styles.cardImagePngActive : ''
              }`}
              src={`/assets/images/products/${imagepng}`}
              alt={`${title} overlay`}
              draggable={false}
            />
          </div>
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
