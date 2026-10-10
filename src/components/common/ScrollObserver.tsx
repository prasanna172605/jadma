import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * ScrollObserver: Scrolls window to top smoothly on route change.
 * Initializes and refreshes AOS scroll animations.
 */
export const ScrollObserver: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 500, // Very subtle, quick animation
      easing: 'ease-out-cubic',
      once: true, // Only animate once when scrolling down
      offset: 40, // Trigger early
      disable: 'mobile' // Avoid jumping on mobile
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [location.pathname]);

  return null;
};
