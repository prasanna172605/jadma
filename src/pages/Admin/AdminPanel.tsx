import React from 'react';
import { SEO } from '../../components/common/SEO';
import { ShieldAlert, Users, BookOpen, Settings, Layers } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  return (
    <>
      <SEO title="Admin Panel Placeholder | JADMAA LMS" />

      <section className="bg-jadmaa-cream py-10 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Administrative Management
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal">
            JADMAA Admin Portal (Phase 1 Placeholder)
          </h1>
          <p className="text-xs text-jadmaa-textMuted">Admin dashboard management layout structure ready for Phase 2 Firebase integration.</p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <Users className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-lg text-jadmaa-charcoal">Total Students</h4>
              <p className="text-2xl font-black text-jadmaa-red">1,420</p>
            </div>

            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <BookOpen className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-lg text-jadmaa-charcoal">Active Courses</h4>
              <p className="text-2xl font-black text-jadmaa-charcoal">7</p>
            </div>

            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <Layers className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-lg text-jadmaa-charcoal">Branch Academies</h4>
              <p className="text-2xl font-black text-jadmaa-charcoal">3</p>
            </div>

            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <Settings className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-lg text-jadmaa-charcoal">System Status</h4>
              <p className="text-sm font-bold text-emerald-600">Phase 1 UI Ready</p>
            </div>
          </div>

          <div className="p-8 bg-jadmaa-cream/60 rounded-3xl border border-dashed border-jadmaa-border text-center space-y-3">
            <ShieldAlert className="w-10 h-10 text-jadmaa-red mx-auto" />
            <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal">Admin Management Module</h3>
            <p className="text-xs text-jadmaa-textMuted max-w-lg mx-auto">
              Backend student management, course creation forms, branch analytics, and certificate approval workflows will be connected to Firebase Firestore in Phase 2.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
