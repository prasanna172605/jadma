import React, { useEffect, useState } from 'react';

/**
 * ScrollProgressBar ("Prana Flow")
 * 
 * Minimal, disciplined scroll progress line anchored to the top of the viewport.
 * Uses a traditional brand crimson-to-gold gradient with a subtle glow tip.
 * Driven by high-performance passive scroll listeners with requestAnimationFrame.
 */
export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (winHeightPx > 0) {
        const scrolled = (scrollPx / winHeightPx) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
        setIsVisible(scrollPx > 15);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-full bg-gradient-to-r from-[#B12B2B] via-[#D4AF37] to-[#B12B2B] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        style={{
          width: `${scrollProgress}%`,
        }}
      />
    </div>
  );
};
