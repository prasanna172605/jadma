import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { mockCourses } from '../../data/courses';
import { PlayCircle } from 'lucide-react';

export const MyCourses: React.FC = () => {
  const enrolledList = [
    { course: mockCourses[0], progress: 72 },
    { course: mockCourses[3], progress: 45 }
  ];

  return (
    <>
      <SEO 
        title="My Enrolled Courses | JADMAA LMS"
        description="View your active enrolled Varmakalai courses and continue your lessons."
      />

      <section className="bg-jadmaa-cream py-10 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Student Dashboard
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-jadmaa-charcoal">
            My Enrolled Courses
          </h1>
          <p className="text-xs text-jadmaa-textMuted">Select a course below to resume your curriculum and video lessons.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrolledList.map(({ course, progress }) => (
              <div key={course.id} className="bg-white border border-jadmaa-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-jadmaa-red text-white rounded">
                      Enrolled
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-heading font-bold text-xl text-jadmaa-charcoal">{course.title}</h3>
                    <p className="text-xs text-jadmaa-textMuted line-clamp-2">{course.description}</p>
                    
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Overall Progress</span>
                        <span className="text-jadmaa-red">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-jadmaa-red h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto">
                  <Link
                    to={`/learn/${course.id}`}
                    className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-jadmaa-red hover:bg-jadmaa-redDark text-white font-bold text-xs rounded-xl shadow transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Go to Course Player</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};
