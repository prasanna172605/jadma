import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ScrollObserver } from './components/common/ScrollObserver';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLearnPlayer = location.pathname.startsWith('/learn/');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2B2521]">
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
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
