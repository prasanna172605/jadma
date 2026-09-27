import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { authApi } from '../lib/api/authApi';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => Promise<User>;
  register: (name: string, email: string, phone: string, password?: string) => Promise<User>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('jadmaa_token');
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.data) {
            setUser(res.data);
          }
        } catch (err: any) {
          console.warn('Auth session expired or invalid', err.message);
          localStorage.removeItem('jadmaa_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      const res = await authApi.login({ email, password: password || 'defaultpass123' });
      if (res.success && res.data) {
        localStorage.setItem('jadmaa_token', res.data.token);
        const loggedInUser = res.data.user;
        setUser(loggedInUser);
        return loggedInUser;
      } else {
        throw new Error(res.error?.message || 'Login failed');
      }
    } catch (err: any) {
      
      throw err;
    }
  };

  const register = async (name: string, email: string, phone: string, password?: string) => {
    try {
      const res = await authApi.register({ name, email, phone, password: password || 'defaultpass123' });
      if (!res.success) { 
        throw new Error(res.error?.message || 'Registration failed');
      }
      return await login(email, password);
    } catch (err: any) {
      
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      localStorage.removeItem('jadmaa_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, loading }}>
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
