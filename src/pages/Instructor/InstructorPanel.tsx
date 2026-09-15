import React from 'react';
import { SEO } from '../../components/common/SEO';
import { GraduationCap, Video, Users, CheckSquare } from 'lucide-react';

export const InstructorPanel: React.FC = () => {
  return (
    <>
      <SEO title="Instructor Panel Placeholder | JADMAA LMS" />

      <section className="bg-jadmaa-cream py-10 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Faculty Portal
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal">
            Instructor Portal (Grandmaster A. Jeyaraj)
          </h1>
          <p className="text-xs text-jadmaa-textMuted">Instructor management layout ready for live class scheduling and student evaluations.</p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <Video className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-base text-jadmaa-charcoal">Scheduled Live Classes</h4>
              <p className="text-xl font-bold text-jadmaa-charcoal">3 Sessions This Week</p>
            </div>

            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <Users className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-base text-jadmaa-charcoal">Assigned Students</h4>
              <p className="text-xl font-bold text-jadmaa-charcoal">340 Enrolled</p>
            </div>

            <div className="bg-jadmaa-cream p-5 rounded-2xl border border-jadmaa-border space-y-2">
              <CheckSquare className="w-6 h-6 text-jadmaa-red" />
              <h4 className="font-heading font-bold text-base text-jadmaa-charcoal">Pending Evaluations</h4>
              <p className="text-xl font-bold text-jadmaa-red">12 Submissions</p>
            </div>
          </div>

          <div className="p-8 bg-jadmaa-cream/60 rounded-3xl border border-dashed border-jadmaa-border text-center space-y-3">
            <GraduationCap className="w-10 h-10 text-jadmaa-red mx-auto" />
            <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal">Instructor Dashboard</h3>
            <p className="text-xs text-jadmaa-textMuted max-w-lg mx-auto">
              Live Google Meet class links, video lesson uploads, and student grading tools will be connected in Phase 2.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
