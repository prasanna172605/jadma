import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../lib/api/apiClient';

interface SettingsContextType {
  settings: Record<string, string>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({ settings: {}, loading: true });

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetchApi('/settings');
        const map: Record<string, string> = {};
        res.data.forEach((s: any) => {
          map[s.key] = s.value;
        });
        setSettings(map);
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
