import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

/**
 * ScrollObserver powers scroll-reveal animations across all pages using both 
 * industry-standard AOS (for Home page) and IntersectionObserver (for other pages
 * using custom classes like 'reveal-on-scroll').
 * It also uses MutationObserver to handle dynamically loaded content (e.g. Courses API).
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
    
    let observer: IntersectionObserver;
    let mutationObserver: MutationObserver;

    // We need a slight delay to ensure the DOM is painted before observing
    const timer = setTimeout(() => {
      // Refresh AOS positions
      AOS.refresh();

      // Initialize custom IntersectionObserver for custom reveal classes
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      });

      const observeElements = () => {
        const revealElements = document.querySelectorAll(
          '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger'
        );
        revealElements.forEach((el) => {
          if (!el.classList.contains('is-revealed')) {
            observer.observe(el);
          }
        });
      };

      observeElements();

      // Set up a MutationObserver to watch for dynamically added elements (like loaded courses)
      mutationObserver = new MutationObserver(() => {
        observeElements();
        AOS.refresh();
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });

    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return null;
};
