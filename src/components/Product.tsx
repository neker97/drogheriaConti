import React, { useRef, useEffect, useState } from 'react';

import products from '../json/products.json';
import stylesCarousel from '../styles/CardCarousel.module.css';
import { useLanguage } from '../utils/LanguageContext';
import Card from './Card';
import Divider from './Divider';

const Product = () => {
  const { config } = useLanguage();
  const { product } = config;
  const [firstItem, secondItem] = product.items;

  // Prendi il titolo da products.subtitle (IT o EN)
  const words = product.subtitle.split(' ');
  // parole da evidenziare
  const highlightWords = ['selezione', 'selection'];

  // Carosello logica:
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Crea array circolare: clona gli elementi per l'effetto infinito
  const extendedProducts = [
    ...products.slice(-2), // Ultimi 2 elementi all'inizio
    ...products, // Array originale
    ...products.slice(0, 2), // Primi 2 elementi alla fine
  ];

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const containerWidth = container.clientWidth;

    let cardsVisible = 3;
    if (window.innerWidth <= 640) cardsVisible = 1;
    else if (window.innerWidth <= 1024) cardsVisible = 2;

    const cardWidth = containerWidth / cardsVisible;
    const scrollPosition = index * cardWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: container.style.scrollBehavior === 'auto' ? 'auto' : 'smooth',
    });
  };

  // Reset posizione per l'effetto infinito
  const resetPosition = () => {
    if (!scrollRef.current) return;

    const totalOriginal = products.length;

    if (currentIndex >= totalOriginal + 2) {
      // Se siamo troppo avanti, torna all'inizio
      setIsTransitioning(true);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = 'auto';
          setCurrentIndex(2);
          scrollToIndex(2);
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.style.scrollBehavior = 'smooth';
            }
            setIsTransitioning(false);
          }, 50);
        }
      }, 300);
    } else if (currentIndex < 2) {
      // Se siamo troppo indietro, va alla fine
      setIsTransitioning(true);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = 'auto';
          setCurrentIndex(totalOriginal + 1);
          scrollToIndex(totalOriginal + 1);
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.style.scrollBehavior = 'smooth';
            }
            setIsTransitioning(false);
          }, 50);
        }
      }, 300);
    }
  };

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!scrollRef.current || isTransitioning) return;

    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);

    // Controlla se dobbiamo resettare la posizione
    setTimeout(() => {
      resetPosition();
    }, 500);
  };

  // Inizializza la posizione
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      setCurrentIndex(2); // Inizia dal primo elemento reale
      scrollToIndex(2);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = 'smooth';
        }
      }, 100);
    }
  }, []);

  // Drag e touch handlers
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    scrollRef.current.classList.add('active');
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove('active');
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove('active');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.25;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const touchStartX = useRef<number>(0);
  const touchScrollLeft = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
    touchScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    if (!e.touches || !e.touches[0]) return;
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX.current) * 1.2;
    scrollRef.current.scrollLeft = touchScrollLeft.current - walk;
  };

  return (
    <section className="bg-background py-8" id="product">
      <div className="container max-w-5xl mx-auto px-8">
        <h1 className="w-full my-2 text-4xl md:text-5xl font-bold leading-tight text-center">
          {words.map((word, idx) =>
            highlightWords.includes(word.toLowerCase()) ? (
              <span key={idx} className="text-primary">
                {word}{' '}
              </span>
            ) : (
              <span key={idx} className="text-border">
                {word}{' '}
              </span>
            )
          )}
        </h1>
      </div>

      <Divider />

      {/* CAROSELLO */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className={stylesCarousel.carouselWrapper}>
          <button
            className={`${stylesCarousel.arrowBtn} ${stylesCarousel.arrowLeft}`}
            aria-label="Scroll left"
            onClick={() => scrollByCard('left')}
          >
            &#8592;
          </button>

          <button
            className={`${stylesCarousel.arrowBtn} ${stylesCarousel.arrowRight}`}
            aria-label="Scroll right"
            onClick={() => scrollByCard('right')}
          >
            &#8594;
          </button>

          <div
            className={stylesCarousel.carouselScroll}
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            {extendedProducts.map((item, idx) => (
              <Card
                key={`${item.title}-${idx}`}
                image={item.image}
                imagepng={item.imagepng}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* SEZIONE PRODOTTI */}
      <div className="container max-w-5xl mx-auto px-8">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-primary">
          {product.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>

        <Divider />

        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6 mt-20">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              {firstItem?.title}
            </h3>
            <p className="text-gray-600">{firstItem?.description}</p>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <img
              className="h-6/6"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
          </div>
        </div>

        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6">
            <img
              className="h-6/6"
              src={secondItem?.img}
              alt={secondItem?.title}
            />
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-20">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                {secondItem?.title}
              </h3>
              <p className="text-gray-600 mb-8">{secondItem?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
