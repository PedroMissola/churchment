'use client'

import { Typography } from '@material-tailwind/react';
import { useState, useEffect, useRef } from 'react';

export default function LogoCarousel() {
  const logos = [
    '/churchLogos/CityChurch.png',
    '/churchLogos/ElevationChurch.png',
    '/churchLogos/GraceChurch.png',
    '/churchLogos/HolyChurch.png',
    '/churchLogos/PeaceChurch.png',
    '/churchLogos/SaintChurch.png',
    '/churchLogos/SpiritChurch.png',
  ];

  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPosition = useRef(0);
  const speed = 0.5; // Velocidade do scroll (ajuste conforme necessário)

  useEffect(() => {
    const startScrolling = () => {
      if (isPaused || !scrollRef.current) return;

      scrollPosition.current += speed;

      // Reinicia a posição quando chegar ao final do conteúdo duplicado
      if (scrollPosition.current >= scrollRef.current.scrollWidth / 2) {
        scrollPosition.current = 0;
      }

      scrollRef.current.style.transform = `translateX(-${scrollPosition.current}px)`;
      animationRef.current = requestAnimationFrame(startScrolling);
    };

    animationRef.current = requestAnimationFrame(startScrolling);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  return (
    <section className="py-[36px] px-4 sm:px-6 md:px-8 flex flex-col text-center" role="region" aria-label="Carousel de Logos de Igrejas">
      <Typography type='h3' className="text-secondary-dark text-xl">
        Já ajudamos igrejas ao redor do mundo a se organizarem melhor.
      </Typography>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden h-32 mt-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 flex h-full items-center"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              // Ajustado para 2 imagens em mobile (w-1/2) e 6 em desktop (md:w-1/6)
              // Adicionado px-4 para padding interno e espaçamento entre os logos.
              className="w-1/2 md:w-1/6 px-4 flex-shrink-0 transition-all duration-300 hover:scale-110"
              aria-hidden={index >= logos.length}
            >
              <img
                src={logo}
                alt="Logo de igreja"
                className="h-24 sm:h-28 md:h-32 w-auto object-contain opacity-80 hover:opacity-100"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};