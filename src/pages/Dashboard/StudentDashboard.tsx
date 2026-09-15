import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { LiveClassCard } from '../../components/common/LiveClassCard';
import { CertificateCard } from '../../components/common/CertificateCard';
import { mockCourses } from '../../data/courses';
import { PlayCircle, CheckCircle2, BookOpen, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { LiveClass } from '../../types';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const studentDisplayName = user?.name || "Practitioner Senthil";

  const mockEnrolledCourses = [
    {
      course: mockCourses[0],
      progress: 72,
      lastLesson: "Lesson 03: Upper Body Varma Points",
      completedLessons: 13,
      totalLessons: 18
    },
    {
      course: mockCourses[3],
      progress: 45,
      lastLesson: "Lesson 02: High Impact Striking Targets",
      completedLessons: 5,
      totalLessons: 12
    }
  ];

  const mockLiveClass: LiveClass = {
    id: "live-101",
    title: "Live Q&A & Practical Varma Stance Corrections",
    courseTitle: "Varma Foundation & Vital Points Science",
    instructorName: "Grandmaster A. Jeyaraj",
    scheduledTime: "Thursday, 7:00 PM IST",
    meetUrl: "https://meet.google.com/abc-defg-hij",
    status: "upcoming"
  };

  return (
    <>
      <SEO 
        title="Student LMS Dashboard | JADMAA Varmakalai"
        description="Access your enrolled Varmakalai courses, track lesson progress, join Google Meet live classes, and download certificates."
      />

      {/* Header Banner */}
      <section className="bg-jadmaa-cream py-8 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 reveal-on-scroll">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-jadmaa-red text-white">
              STUDENT LMS PORTAL
            </span>
            <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal mt-1">
              Welcome back, {studentDisplayName}!
            </h1>
            <p className="text-xs text-jadmaa-textMuted">You have 2 active enrolled courses in your JADMAA academy account.</p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/my-courses"
              className="px-4 py-2 bg-white border border-jadmaa-border hover:border-jadmaa-red text-jadmaa-charcoal hover:text-jadmaa-red text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              My Courses
            </Link>
            <Link
              to="/certificates"
              className="px-4 py-2 bg-jadmaa-red hover:bg-jadmaa-redDark text-white text-xs font-bold rounded-lg shadow transition-all"
            >
              My Certificates
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Cols: Courses & Recent Activity */}
            <div className="lg:col-span-8 space-y-8 reveal-left">
              
              {/* Enrolled Courses Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal">
                    Continue Learning (My Courses)
                  </h3>
                  <Link to="/my-courses" className="text-xs font-bold text-jadmaa-red hover:underline">
                    View All &rarr;
                  </Link>
                </div>

                <div className="space-y-4 reveal-stagger">
                  {mockEnrolledCourses.map((item) => (
                    <div 
                      key={item.course.id}
                      className="reveal-child bg-white border border-jadmaa-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden img-interactive-frame border border-jadmaa-border flex-shrink-0">
                            <img 
                              src={item.course.thumbnail} 
                              alt={item.course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-jadmaa-red uppercase tracking-wider">
                              {item.course.category}
                            </span>
                            <h4 className="font-heading font-bold text-base text-jadmaa-charcoal">
                              {item.course.title}
                            </h4>
                            <p className="text-xs text-jadmaa-textMuted mt-0.5">
                              Next: <span className="font-semibold text-jadmaa-charcoal">{item.lastLesson}</span>
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/learn/${item.course.id}`}
                          className="inline-flex items-center space-x-1 px-4 py-2.5 bg-jadmaa-red hover:bg-jadmaa-redDark text-white text-xs font-bold rounded-xl shadow self-start sm:self-center transition-all"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Resume Lesson</span>
                        </Link>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 pt-2 border-t border-gray-100">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-jadmaa-charcoal">Course Progress</span>
                          <span className="text-jadmaa-red">{item.progress}% Completed</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-jadmaa-red h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-[10px] text-gray-400">
                          {item.completedLessons} of {item.totalLessons} lessons finished
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Student Activity Log */}
              <div className="bg-jadmaa-cream/60 rounded-2xl p-6 border border-jadmaa-border space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-jadmaa-charcoal">
                  Recent Learning Activity
                </h3>
                <div className="space-y-3 text-xs text-jadmaa-charcoal">
                  <div className="p-3 bg-white rounded-xl border border-jadmaa-border flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed Lesson: <strong>Head & Neck Varma Geography</strong></span>
                    </div>
                    <span className="text-gray-400">Yesterday</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-jadmaa-border flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed Quiz: <strong>Major Striking Angles & Counter Moves</strong></span>
                    </div>
                    <span className="text-gray-400">3 days ago</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Live Sessions & Certificates */}
            <div className="lg:col-span-4 space-y-8 reveal-right">
              
              {/* Upcoming Live Google Meet */}
              <div className="space-y-4">
                <h3 className="font-heading font-extrabold text-lg text-jadmaa-charcoal">
                  Live Academy Session
                </h3>
                <LiveClassCard liveClass={mockLiveClass} />
              </div>

              {/* Certificate Widget */}
              <div className="space-y-3">
                <h3 className="font-heading font-extrabold text-lg text-jadmaa-charcoal">
                  Verified Credential
                </h3>
                <CertificateCard 
                  courseTitle="Varma Foundation & Vital Points Science"
                  certificateId="JADMAA-2026-0001"
                  issueDate="August 15, 2026"
                  studentName={studentDisplayName}
                />
              </div>

              {/* Quick Links */}
              <div className="p-5 bg-jadmaa-cream rounded-2xl border border-jadmaa-border space-y-3">
                <h4 className="font-heading font-bold text-sm text-jadmaa-charcoal">Academy Shortcuts</h4>
                <div className="space-y-2 text-xs">
                  <Link to="/courses" className="flex items-center justify-between p-2 bg-white rounded-lg border border-jadmaa-border hover:border-jadmaa-red transition-all">
                    <span className="flex items-center space-x-2">
                      <BookOpen className="w-3.5 h-3.5 text-jadmaa-red" />
                      <span>Browse More Courses</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  </Link>
                  <Link to="/certificates" className="flex items-center justify-between p-2 bg-white rounded-lg border border-jadmaa-border hover:border-jadmaa-red transition-all">
                    <span className="flex items-center space-x-2">
                      <Award className="w-3.5 h-3.5 text-jadmaa-red" />
                      <span>View All Certificates</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};
