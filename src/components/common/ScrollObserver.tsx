import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollObserver: Scrolls window to top smoothly on route change.
 * Implements a lightweight, consistent scroll reveal system (replacing AOS).
 */
export const ScrollObserver: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Animate only once per the requirements
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.1,
      }
    );

    const observeElements = () => {
      // Find all elements configured for animation that haven't been observed
      const selectors = '[data-aos]:not(.is-observed), .reveal:not(.is-observed), .reveal-on-scroll:not(.is-observed), .reveal-child:not(.is-observed)';
      document.querySelectorAll(selectors).forEach((el) => {
        el.classList.add('reveal');
        el.classList.add('is-observed');
        
        // Port data-aos-delay to inline transition-delay
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
          (el as HTMLElement).style.transitionDelay = `${delay}ms`;
        }

        observer.observe(el);

        // Immediate reveal for elements above the fold on initial load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          // Micro-delay ensures the browser registers the initial opacity:0 before transitioning
          setTimeout(() => {
            el.classList.add('is-visible');
          }, 40);
        }
      });
    };

    observeElements();

    // Use MutationObserver to gracefully handle dynamically loaded content (e.g. course grids)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};
