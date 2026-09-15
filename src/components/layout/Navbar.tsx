import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { mainNavItems } from '../../data/navigation';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 bg-[#FAF6F0] transition-shadow duration-200 border-b border-[#E8DDD0] ${
      scrolled ? 'shadow-sm py-3' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/images/logo-1.png" 
              alt="JADMAA Varmakalai Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <span className="font-heading font-extrabold text-lg sm:text-xl text-[#2B2521] tracking-tight leading-none">
              JADMAA <span className="text-[#B12B2B]">VARMAKALAI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`text-sm font-semibold transition-colors duration-150 relative py-1.5 ${
                    isActive 
                      ? 'text-[#B12B2B] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B12B2B]' 
                      : 'text-[#5C5148] hover:text-[#B12B2B]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Auth / Profile Links */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1.5 text-sm font-semibold text-[#B12B2B] hover:underline"
                >
                  <User className="w-4 h-4" />
                  <span>Profile ({user?.name.split(' ')[0]})</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1 text-[#5C5148] hover:text-[#B12B2B] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-[#5C5148] hover:text-[#B12B2B] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#B12B2B] hover:bg-[#8C1E1E] rounded transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-3 py-1 text-xs font-bold text-white bg-[#B12B2B] rounded"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-3 py-1 text-xs font-bold text-white bg-[#B12B2B] rounded"
              >
                Register
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#2B2521] hover:text-[#B12B2B]"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-t border-[#E8DDD0] shadow-xl px-4 py-4 space-y-2 text-left">
          {mainNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="block px-3 py-2 text-sm font-semibold text-[#5C5148] hover:text-[#B12B2B]"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#E8DDD0] space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block w-full text-center py-2 bg-[#B12B2B] text-white text-xs font-bold rounded"
                >
                  My Profile & Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-center py-2 text-xs font-bold text-[#5C5148] hover:text-[#B12B2B]"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="w-1/2 text-center py-2 border border-[#E8DDD0] bg-white text-xs font-bold text-[#2B2521] rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-1/2 text-center py-2 bg-[#B12B2B] text-white text-xs font-bold rounded"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
