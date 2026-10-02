import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings as SettingsIcon, ChevronDown } from 'lucide-react';
import { mainNavItems } from '../../data/navigation';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const isStudent = isLoggedIn && user?.role === 'STUDENT';

  let currentNavItems = mainNavItems;
  if (isLoggedIn) {
    if (user?.role === 'STUDENT') {
      currentNavItems = [
        { id: 'home', label: 'Home', href: '/' },
        { id: 'courses', label: 'Courses', href: '/courses' },
        { id: 'my-courses', label: 'My Courses', href: '/student#my-courses' }
      ];
    } else if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
      currentNavItems = [
        { id: 'courses', label: 'Courses', href: '/admin#courses' },
        { id: 'students', label: 'My Students', href: '/admin#students' }
      ];
    } else if (user?.role === 'INSTRUCTOR') {
      currentNavItems = [
        { id: 'students', label: 'My Students', href: '/instructor#students' }
      ];
    }
  }


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
            {currentNavItems.map((item) => {
              const fullPath = location.pathname + location.hash;
              const isActive = fullPath === item.href || (location.pathname === item.href && !item.href.includes('#'));
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
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-1.5 text-sm font-semibold text-gray-700 hover:text-jadmaa-red transition py-1.5"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50 animate-fade-in">
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-xs font-bold text-gray-600 rounded">
                        {user?.role}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <Link
                        to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin#settings" : user?.role === "INSTRUCTOR" ? "/instructor#settings" : "/student#settings"}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center space-x-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-jadmaa-red rounded-lg transition"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="flex items-center space-x-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-jadmaa-red rounded-lg transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-sm font-bold text-white bg-[#B12B2B] hover:bg-[#8C1E1E] rounded transition-all"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            {isLoggedIn ? (
              <Link
                to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/student"}
                className="px-3 py-1 text-sm font-bold text-white bg-[#B12B2B] rounded"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 text-sm font-bold text-white bg-[#B12B2B] rounded"
              >
                Login / Register
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
          {currentNavItems.map((item) => (
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
                  to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/student"}
                  className="block w-full text-center py-2 bg-[#B12B2B] text-white text-sm font-bold rounded"
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-center py-2 text-sm font-bold text-[#5C5148] hover:text-[#B12B2B]"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="w-full text-center py-2 bg-[#B12B2B] text-white text-sm font-bold rounded"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
