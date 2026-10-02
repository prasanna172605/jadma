import React, { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api/adminApi';
import { Save, Loader } from 'lucide-react';

export const SettingsEditor: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const predefinedSettings = [
    { key: 'home.hero.title', label: 'Home Hero Title', type: 'text', default: 'Ancient Wisdom for Modern Warriors' },
    { key: 'home.hero.subtitle', label: 'Home Hero Subtitle', type: 'textarea', default: 'Master the ancient art of Varmakalai through our comprehensive online platform.' },
    { key: 'contact.phone', label: 'Contact Phone', type: 'text', default: '+91 98765 43210' },
    { key: 'contact.email', label: 'Contact Email', type: 'text', default: 'info@jadmaa.com' },
    { key: 'contact.address', label: 'Office Address', type: 'textarea', default: '123 Varmakalai Street, Chennai, TN' },
    { key: 'footer.about', label: 'Footer About Text', type: 'textarea', default: 'JADMAA is dedicated to preserving and teaching the ancient martial art of Varmakalai.' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSettings();
      const settingsMap: Record<string, string> = {};
      res.data.forEach((s: any) => {
        settingsMap[s.key] = s.value;
      });
      
      // Initialize predefined settings if missing
      predefinedSettings.forEach(ps => {
        if (!settingsMap[ps.key]) {
          settingsMap[ps.key] = ps.default;
        }
      });
      setSettings(settingsMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string, value: string) => {
    setSavingKey(key);
    try {
      await adminApi.updateSetting(key, value);
    } catch (err) {
      alert('Failed to update setting');
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-heading font-bold">Website Content Editor</h2>
          <p className="text-sm text-gray-500">Update website text, contact information, and more.</p>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {predefinedSettings.map((item) => (
            <div key={item.key} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <h4 className="font-bold text-gray-800 text-sm">{item.label}</h4>
                <p className="text-xs text-gray-400 mt-1 font-mono">{item.key}</p>
              </div>
              <div className="md:col-span-2 space-y-3">
                {item.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={settings[item.key] || ''}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-jadmaa-red text-sm resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={settings[item.key] || ''}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-jadmaa-red text-sm"
                  />
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave(item.key, settings[item.key])}
                    disabled={savingKey === item.key}
                    className="flex items-center space-x-2 px-4 py-1.5 bg-jadmaa-red text-white text-xs font-bold rounded hover:bg-[#8C1E1E] transition disabled:opacity-50"
                  >
                    {savingKey === item.key ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savingKey === item.key ? 'Saving...' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
