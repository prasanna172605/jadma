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
      duration: 550, // Consistent duration
      easing: 'ease-out',
      once: true, // Only animate once
      offset: 30, // Trigger early
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
