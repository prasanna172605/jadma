import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollObserver: Scrolls window to top smoothly on route change.
 * All revealing animations have been removed for instant, crisp rendering.
 */
export const ScrollObserver: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return null;
};
