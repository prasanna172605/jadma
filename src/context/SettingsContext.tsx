import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../lib/api/apiClient';
import { adminApi } from '../lib/api/adminApi';
import { defaultCmsContent } from '../lib/cms/defaultContent';

interface SettingsContextType {
  settings: Record<string, string>;
  loading: boolean;
  isEditing: boolean;
  updateSetting: (key: string, value: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({ 
  settings: {}, 
  loading: true,
  isEditing: false,
  updateSetting: async () => {}
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check URL for edit parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetchApi('/settings');
      const map: Record<string, string> = {};
      // Merge with defaults so we never have empty values for missing DB entries
      Object.assign(map, defaultCmsContent);

      if (res.data) {
        res.data.forEach((s: any) => {
          if (s.value !== undefined && s.value !== null) {
            map[s.key] = s.value;
          }
        });
      }
      setSettings(map);
    } catch (err) {
      console.error('Failed to load settings', err);
      // Fallback to defaults entirely
      setSettings({ ...defaultCmsContent });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateSetting = async (key: string, value: string) => {
    try {
      // Optimistically update local state
      setSettings(prev => ({ ...prev, [key]: value }));
      
      // Persist to backend (Requires SUPER_ADMIN / ADMIN token)
      await adminApi.updateSettings({ [key]: value });
    } catch (err) {
      console.error(`Failed to update setting ${key}`, err);
      // Reload on failure
      loadSettings();
      throw err;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, isEditing, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
