import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { mockCourses } from '../../data/courses';
import { CurriculumAccordion } from '../../components/courses/CurriculumAccordion';
import { PlayCircle, CheckCircle2, ChevronLeft, Award, FileText } from 'lucide-react';

export const LearnCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find(c => c.id === courseId || c.slug === courseId) || mockCourses[0];

  const firstLessonId = course.modules[0]?.lessons[0]?.id || 'l1';
  const [activeLessonId, setActiveLessonId] = useState<string>(firstLessonId);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    'l1': true,
    'l2': true
  });

  // Find active lesson details
  let activeLessonTitle = "Lesson Video";
  let activeLessonDuration = "15 min";
  course.modules.forEach(m => {
    const found = m.lessons.find(l => l.id === activeLessonId);
    if (found) {
      activeLessonTitle = found.title;
      activeLessonDuration = found.duration;
    }
  });

  const toggleComplete = (id: string) => {
    setCompletedLessons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / (course.totalLessons || 18)) * 100));

  return (
    <>
      <SEO 
        title={`Learning: ${course.title} | JADMAA LMS`}
        description={`Study ${activeLessonTitle} in JADMAA Varmakalai online classroom.`}
      />

      <div className="bg-jadmaa-charcoal text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs">
          <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center space-x-1 font-semibold transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="font-bold text-white truncate max-w-xs">{course.title}</span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="text-gray-400 hidden sm:inline">
            Progress: <strong className="text-jadmaa-red font-mono">{progressPercent}%</strong>
          </span>
          <Link
            to={`/courses/${course.slug}`}
            className="font-bold text-jadmaa-red hover:underline"
          >
            Course Details
          </Link>
        </div>
      </div>

      <section className="bg-gray-900 min-h-[calc(100vh-120px)] text-left">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Video & Content Area (8 Cols on lg) */}
          <div className="lg:col-span-8 p-4 sm:p-6 space-y-6">
            
            {/* Video Player Area */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex items-center justify-center group">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-jadmaa-red text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                  <PlayCircle className="w-8 h-8 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {activeLessonTitle}
                  </h3>
                  <p className="text-xs text-gray-300">Phase 1 LMS Video Player Preview ({activeLessonDuration})</p>
                </div>
              </div>
            </div>

            {/* Lesson Control Bar */}
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <h4 className="font-heading font-bold text-base text-white">{activeLessonTitle}</h4>
                <p className="text-gray-400">Instructor: {course.instructor.name}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleComplete(activeLessonId)}
                  className={`px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 transition-colors ${
                    completedLessons[activeLessonId] 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedLessons[activeLessonId] ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>

            {/* Lesson Overview & Notes */}
            <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700 space-y-4 text-xs text-gray-300 leading-relaxed">
              <h4 className="font-heading font-bold text-sm text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-jadmaa-red" />
                <span>Lesson Curriculum Notes</span>
              </h4>
              <p>
                In this lecture, Master Jeyaraj demonstrates the precise location, angle of approach, and safe stimulation techniques for critical Varma pressure points.
              </p>
              <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-700 text-amber-300">
                <strong>Safety Caution:</strong> Varmakalai strikes and releases must only be practiced under qualified instructor supervision. Never apply full force on unconditioned training partners.
              </div>
            </div>

          </div>

          {/* Sidebar Curriculum Accordion (4 Cols on lg) */}
          <div className="lg:col-span-4 p-4 sm:p-6 bg-gray-800/50 border-t lg:border-t-0 lg:border-l border-gray-800 min-h-full space-y-4">
            <div className="flex items-center justify-between text-xs text-white border-b border-gray-700 pb-3">
              <h3 className="font-heading font-bold text-sm">Course Syllabus & Lessons</h3>
              <span className="text-jadmaa-red font-mono font-bold">{course.totalLessons} Lessons</span>
            </div>

            <CurriculumAccordion 
              modules={course.modules}
              onSelectLesson={(lessonId) => setActiveLessonId(lessonId)}
              activeLessonId={activeLessonId}
            />

            {/* Certificate Unlock Banner */}
            <div className="p-4 bg-gradient-to-br from-amber-500/10 to-jadmaa-red/10 border border-amber-500/30 rounded-xl space-y-2 text-xs text-gray-200">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Award className="w-4 h-4" />
                <span>Completion Certificate</span>
              </div>
              <p className="text-[11px] text-gray-400">Complete all lessons in this syllabus to unlock your verified academy credential.</p>
              <Link 
                to="/certificates" 
                className="inline-block text-[11px] font-bold text-amber-400 hover:underline pt-1"
              >
                Preview Certificate Template &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
