import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "JADMAA Varmakalai | Varmakalai Training & Self Defence", 
  description = "Learn traditional Varmakalai and self-defence training at JADMAA. Join structured programs for kids, students, women and adults in Thanjavur, Kumbakonam and Ariyalur."
}) => {
  useEffect(() => {
    document.title = title;
    
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [title, description]);

  return null;
};
