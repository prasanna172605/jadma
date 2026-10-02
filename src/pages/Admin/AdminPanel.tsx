import React, { useState, useEffect } from 'react';
import { SEO } from '../../components/common/SEO';
import { ShieldAlert } from 'lucide-react';
import { BlogManager } from './BlogManager';
import { Overview } from './Overview';
import { Students } from './Students';
import { Instructors } from './Instructors';
import { Courses } from './Courses';
import { Enrollments } from './Enrollments';
import { Payments } from './Payments';
import { DatabaseManager } from './DatabaseManager';
import { SettingsEditor } from './SettingsEditor';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

type Tab = 'dashboard' | 'students' | 'instructors' | 'courses' | 'enrollments' | 'payments' | 'blogs' | 'settings' | 'database';

export const AdminPanel: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { user, isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '') as Tab;
      if (['dashboard', 'students', 'instructors', 'courses', 'enrollments', 'payments', 'blogs', 'settings', 'database'].includes(hash)) {
        setActiveTab(hash);
      }
    } else {
      setActiveTab('dashboard');
    }
  }, [location.hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-jadmaa-cream flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-jadmaa-red rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Only allow admin or super_admin
  if (user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jadmaa-cream">
        <div className="text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-jadmaa-red mx-auto" />
          <h2 className="text-xl font-bold text-jadmaa-charcoal">Access Denied</h2>
          <p className="text-sm text-jadmaa-textMuted">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab, label: string }[] = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'students', label: 'Students' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'courses', label: 'Courses' },
    { id: 'enrollments', label: 'Enrollments' },
    { id: 'payments', label: 'Payments' },
    { id: 'blogs', label: 'Blog Manager' },
    { id: 'settings', label: 'Settings' },
  ];

  if (user?.role === 'SUPER_ADMIN') {
    tabs.push({ id: 'database', label: 'Database' });
  }

  return (
    <>
      <SEO title="Admin Panel | JADMAA LMS" />
      <section className="bg-jadmaa-cream pt-10 pb-0 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Administrative Management
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal">
            JADMAA Admin Portal
          </h1>
          <p className="text-xs text-jadmaa-textMuted pb-4">Manage branches, courses, users, and the Academy Journal.</p>
          
          <div className="flex space-x-1 border-b border-jadmaa-border overflow-x-auto whitespace-nowrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => window.location.hash = tab.id}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-jadmaa-red text-jadmaa-red' 
                    : 'border-transparent text-jadmaa-textMuted hover:text-jadmaa-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-8 bg-gray-50 text-left min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'dashboard' && <Overview />}
          {activeTab === 'students' && <Students />}
          {activeTab === 'instructors' && <Instructors />}
          {activeTab === 'courses' && <Courses />}
          {activeTab === 'enrollments' && <Enrollments />}
          {activeTab === 'payments' && <Payments />}
          {activeTab === 'blogs' && <BlogManager />}
          {activeTab === 'settings' && <SettingsEditor />}
          {activeTab === 'database' && user?.role === 'SUPER_ADMIN' && <DatabaseManager />}
        </div>
      </section>
    </>
  );
};
