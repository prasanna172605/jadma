import React, { useState, useEffect } from 'react';
import { SEO } from '../../components/common/SEO';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { StudentDashboard } from './StudentDashboard';
import { MyCourses } from './MyCourses';
import { StudentProfile } from './StudentProfile';

type Tab = 'dashboard' | 'courses' | 'my-courses' | 'settings';

export const StudentPanel: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { user, isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '') as Tab;
      if (['dashboard', 'courses', 'my-courses', 'settings'].includes(hash)) {
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

  // Only allow student
  if (user?.role !== 'STUDENT') {
    return <Navigate to="/" />;
  }

  const tabs: { id: Tab, label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'my-courses', label: 'My Courses' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <>
      <SEO title="Student Panel | JADMAA LMS" />
      <section className="bg-jadmaa-cream pt-10 pb-0 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Student Area
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal">
            JADMAA Student Portal
          </h1>
          <p className="text-xs text-jadmaa-textMuted pb-4">Manage your learning, courses, and profile.</p>
          
          <div className="flex space-x-1 border-b border-jadmaa-border overflow-x-auto whitespace-nowrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'courses') {
                     window.location.href = '/courses';
                     return;
                  }
                  window.location.hash = tab.id;
                }}
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
      
      <div className="bg-gray-50 min-h-screen">
         {activeTab === 'dashboard' && <StudentDashboard />}
         {activeTab === 'my-courses' && <MyCourses />}
         {activeTab === 'settings' && <StudentProfile />}
      </div>
    </>
  );
};
