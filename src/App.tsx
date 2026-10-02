import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ScrollObserver } from './components/common/ScrollObserver';
import { SEOManager } from './components/common/SEOManager';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLearnPlayer = location.pathname.startsWith('/learn/');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2B2521] pb-[80px] md:pb-0">
      <SEOManager />
      <ScrollObserver />
      {!isLearnPlayer && <Navbar />}
      <main key={location.pathname} className="flex-grow page-enter">
        <AppRoutes />
      </main>
      {!isLearnPlayer && <Footer />}
      <WhatsAppButton />
    </div>
  );
};

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SettingsProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </SettingsProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
