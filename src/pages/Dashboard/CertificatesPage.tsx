import React from 'react';
import { SEO } from '../../components/common/SEO';
import { CertificateCard } from '../../components/common/CertificateCard';
import { useAuth } from '../../context/AuthContext';

export const CertificatesPage: React.FC = () => {
  const { user } = useAuth();
  const studentName = user?.name || "Senthil Kumar";

  return (
    <>
      <SEO 
        title="My Certificates | JADMAA LMS"
        description="View and download your official JADMAA Varmakalai Academy course certificates."
      />

      <section className="bg-jadmaa-cream py-10 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Verified Credentials
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal">
            My Course Certificates
          </h1>
          <p className="text-xs text-jadmaa-textMuted">Official credentials issued by JADMAA Varmakalai Academy.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CertificateCard
              courseTitle="Varma Foundation & Vital Points Science"
              certificateId="JADMAA-2026-0001"
              issueDate="August 15, 2026"
              studentName={studentName}
            />
          </div>

        </div>
      </section>
    </>
  );
};
