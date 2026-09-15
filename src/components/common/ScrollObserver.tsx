import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

/**
 * ScrollObserver powers scroll-reveal animations across all pages using industry-standard AOS.
 * Supports:
 * - data-aos="fade-up"
 * - data-aos="fade-left"
 * - data-aos="fade-right"
 * - data-aos="zoom-in"
 * - data-aos-delay="100", "200", etc.
 *
 * Automatically refreshes upon route transitions so every page reveals as the user scrolls.
 */
export const ScrollObserver: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 50,
      disableMutationObserver: false,
    });
  }, []);

  useEffect(() => {
    // Scroll window to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // Refresh AOS positions after route render
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};


