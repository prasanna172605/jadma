import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('jadmaa_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: name || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Student'),
      email,
      role: 'student',
      enrolledCourses: ['varma-foundation'],
      progress: { 'varma-foundation': 72 }
    };
    setUser(newUser);
    localStorage.setItem('jadmaa_user', JSON.stringify(newUser));
  };

  const register = (name: string, email: string, _phone: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: 'student',
      enrolledCourses: ['varma-foundation'],
      progress: { 'varma-foundation': 0 }
    };
    setUser(newUser);
    localStorage.setItem('jadmaa_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jadmaa_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
