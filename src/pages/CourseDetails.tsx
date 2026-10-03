import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CurriculumAccordion } from '../components/courses/CurriculumAccordion';
import { CourseCard } from '../components/courses/CourseCard';
import { 
  Clock, Star, BookOpen, Award, CheckCircle2, Play 
} from 'lucide-react';
import { courseApi } from '../lib/api/courseApi';
import { paymentApi } from '../lib/api/paymentApi';
import { enrollmentApi } from '../lib/api/enrollmentApi';
import { loadRazorpayScript } from '../lib/razorpay';
import { useAuth } from '../context/AuthContext';
import type { Course } from '../types';

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'faq'>('overview');
  
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (slug) {
          const courseData = await courseApi.getCourseBySlug(slug);
          setCourse(courseData);
        }
        const allCourses = await courseApi.getCourses();
        setRelatedCourses(allCourses);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [slug]);

  const handleEnrollClick = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    if (!course) return;
    
    // Check if already enrolled in the frontend state (we could also check via API)
    if (user?.enrolledCourses?.includes(course.id)) {
      navigate(`/learn/${course.id}`);
      return;
    }

    try {
      setEnrolling(true);
      if (course.isFree) {
        const res = await enrollmentApi.enrollFree(course.id);
        if (res.success) {
          alert('Enrolled successfully!');
          navigate(`/learn/${course.id}`);
        } else {
          alert(res.error?.message || 'Failed to enroll');
        }
      } else {
        // Load Razorpay Checkout SDK
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert('Failed to load Razorpay payment gateway. Please check your internet connection.');
          return;
        }

        // Create order on backend (authoritative DB pricing)
        const orderRes = await paymentApi.createOrder(course.id);
        if (!orderRes.success || !orderRes.data) {
          alert(orderRes.error?.message || 'Failed to initiate Razorpay order');
          return;
        }

        const { keyId, orderId, amount, currency, prefill } = orderRes.data;

        // Initialize Razorpay Standard Checkout
        const options = {
          key: keyId,
          amount,
          currency: currency || 'INR',
          name: 'JADMAA',
          description: course.title,
          image: '/logo.png',
          order_id: orderId,
          prefill: {
            name: prefill?.name || user?.name || '',
            email: prefill?.email || user?.email || '',
            contact: prefill?.contact || '',
          },
          theme: {
            color: '#A020F0', // Brand accent or #991B1B jadmaa-red
          },
          modal: {
            ondismiss: () => {
              setEnrolling(false);
            },
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              setEnrolling(true);
              // Verify payment on backend
              const verifyRes = await paymentApi.verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.success) {
                // Navigate to payment status confirmation page
                navigate(`/payment/status/${response.razorpay_order_id}?status=success`);
              } else {
                alert(verifyRes.error?.message || 'Payment verification failed.');
                navigate(`/payment/status/${response.razorpay_order_id}?status=failed`);
              }
            } catch (err: any) {
              console.error('Verification error:', err);
              navigate(`/payment/status/${response.razorpay_order_id}?status=failed`);
            } finally {
              setEnrolling(false);
            }
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (failResponse: any) => {
          console.error('Payment failed:', failResponse.error);
          alert(`Payment Failed: ${failResponse.error?.description || 'Transaction unsuccessful'}`);
          setEnrolling(false);
        });
        rzp.open();
      }
    } catch (err: any) {
      alert('An error occurred during checkout');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-jadmaa-textMuted">Loading course details...</div>;
  }

  if (error || !course) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading course: {error || 'Not found'}</div>;
  }

  return (
    <>
      <SEO 
        title={`${course.title} | JADMAA Varmakalai`}
        description={course.description}
      />

      {/* Course Hero Banner */}
      <section className="bg-jadmaa-charcoal text-white py-12 border-b-4 border-jadmaa-red text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-jadmaa-red text-white font-bold">
                  {course.category}
                </span>
                <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-medium">
                  {course.level}
                </span>
                <div className="flex items-center space-x-1 text-amber-400 font-bold ml-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating?.toFixed(1) || '5.0'}</span>
                  <span className="text-gray-400">({course.reviewCount || 0} reviews)</span>
                </div>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {course.subtitle || course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-300 pt-2">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-jadmaa-red" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-jadmaa-red" />
                  <span>Total Lessons: <strong>{course.totalLessons}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-jadmaa-red" />
                  <span>Certificate Included</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <img 
                  src={course.instructor.avatar || '/images/logo-1.png'} 
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full border-2 border-jadmaa-red object-cover bg-white" 
                />
                <div>
                  <p className="text-xs text-gray-400">Aasan</p>
                  <p className="text-sm font-bold text-white">
                    {course.instructor.name?.toLowerCase().startsWith('aasan') 
                      ? course.instructor.name 
                      : `Aasan - ${course.instructor.name}`}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Card / Enrollment Box */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 text-jadmaa-charcoal shadow-2xl border border-jadmaa-border space-y-6">
                
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-gray-100 border border-gray-200 img-interactive-frame group cursor-pointer">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-jadmaa-red text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-base md:text-lg text-jadmaa-textMuted">Includes full access & academy certificate</p>
                </div>

                <button
                  onClick={handleEnrollClick}
                  disabled={enrolling}
                  className="w-full py-3.5 px-4 bg-jadmaa-red hover:bg-jadmaa-redDark text-white font-bold text-sm rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {enrolling ? (
                    <span>Processing Payment...</span>
                  ) : course.isFree ? (
                    <span>Enroll for Free Now</span>
                  ) : (
                    <span>Pay with Razorpay • ₹{course.price}</span>
                  )}
                </button>

                <div className="space-y-2 text-sm md:text-xl text-jadmaa-textMuted border-t border-gray-100 pt-4">
                  <p className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>LMS Video & Curriculum Access</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Digital Certificate upon completion</span>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Tabbed Details Area */}
      <section className="py-12 bg-white border-b border-jadmaa-border min-h-[600px] text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-8">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-jadmaa-border space-x-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'overview' ? 'border-jadmaa-red text-jadmaa-red' : 'border-transparent text-jadmaa-textMuted hover:text-jadmaa-charcoal'
              }`}
            >
              Course Overview
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'curriculum' ? 'border-jadmaa-red text-jadmaa-red' : 'border-transparent text-jadmaa-textMuted hover:text-jadmaa-charcoal'
              }`}
            >
              Curriculum ({course.modules.length} Modules)
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'instructor' ? 'border-jadmaa-red text-jadmaa-red' : 'border-transparent text-jadmaa-textMuted hover:text-jadmaa-charcoal'
              }`}
            >
              Aasan Profile
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              <div className="lg:col-span-8 space-y-8">
                
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal">
                    About This Course
                  </h3>
                  <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                    {course.longDescription || course.description}
                  </p>
                </div>

                {/* What You'll Learn Box */}
                {course.whatYouWillLearn?.length > 0 && (
                  <div className="bg-jadmaa-cream/70 p-6 rounded-2xl border border-jadmaa-border space-y-4">
                    <h4 className="font-heading font-extrabold text-lg text-jadmaa-charcoal flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-jadmaa-red" />
                      <span>What You'll Learn</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm md:text-lg text-jadmaa-charcoal">
                          <span className="w-1.5 h-1.5 rounded-full bg-jadmaa-red mt-1.5 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {course.requirements?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-heading font-extrabold text-lg text-jadmaa-charcoal">
                      Requirements & Prerequisites
                    </h4>
                    <ul className="space-y-2 text-sm md:text-xl text-jadmaa-textMuted list-disc pl-5">
                      {course.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Target Audience */}
                {course.targetAudience?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-heading font-extrabold text-lg text-jadmaa-charcoal">
                      Who This Course Is For
                    </h4>
                    <ul className="space-y-2 text-sm md:text-xl text-jadmaa-textMuted list-disc pl-5">
                      {course.targetAudience.map((aud, idx) => (
                        <li key={idx}>{aud}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-jadmaa-cream/50 p-5 rounded-2xl border border-jadmaa-border space-y-4 text-xs">
                  <h4 className="font-heading font-bold text-base md:text-lg text-jadmaa-charcoal">
                    Certificate Information
                  </h4>
                  <div className="flex items-start space-x-3">
                    <Award className="w-6 h-6 text-jadmaa-red flex-shrink-0" />
                    <p className="text-jadmaa-textMuted leading-relaxed">
                      Upon completing all modules, students receive an accredited <strong>JADMAA Varmakalai Academy</strong> digital certificate.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal">
                  Course Modules & Lessons
                </h3>
                <span className="text-sm md:text-xl text-jadmaa-textMuted">Click module headers to expand</span>
              </div>
              <CurriculumAccordion modules={course.modules} />
            </div>
          )}

          {/* Tab 3: Instructor */}
          {activeTab === 'instructor' && (
            <div className="max-w-3xl bg-jadmaa-cream/60 p-6 rounded-2xl border border-jadmaa-border space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={course.instructor.avatar || '/images/logo-1.png'} 
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full border-2 border-jadmaa-red object-cover bg-white" 
                />
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal">
                    {course.instructor.name}
                  </h3>
                  <p className="text-xs font-semibold text-jadmaa-red">
                    {course.instructor.title}
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-xl text-jadmaa-textMuted leading-relaxed">
                {course.instructor.bio}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Related Courses */}
      <section className="py-12 bg-jadmaa-cream border-b border-jadmaa-border text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-6">
          <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal">
            Related Varmakalai Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.filter(c => c.id !== course.id).slice(0, 3).map(related => (
              <CourseCard key={related.id} course={related} hidePrice />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
