import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { ArrowRight, CheckCircle2, ChevronDown, User, Star, Award, BookOpen, Send } from 'lucide-react';

const careerSteps = [
  {
    title: "Step 1 – Basic Level",
    description: "Start your journey by mastering the foundational stances, blocks, and basic strikes of Varmakalai.",
    icon: <User className="w-5 h-5" />
  },
  {
    title: "Step 2 – Intermediate Level",
    description: "Progress into advanced combinations, weapon defense, and understanding fundamental Varma points.",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    title: "Step 3 – Advanced Level",
    description: "Deepen your expertise with complex pressure point applications, therapeutic healing, and advanced Adimurai.",
    icon: <Star className="w-5 h-5" />
  },
  {
    title: "Step 4 – Assistant Instructor",
    description: "Begin assisting senior masters in training sessions to develop your teaching, leadership, and communication skills.",
    icon: <Award className="w-5 h-5" />
  },
  {
    title: "Step 5 – Certified Instructor",
    description: "Pass the official JADMAA certification exams to become a recognized instructor capable of leading full batches.",
    icon: <CheckCircle2 className="w-5 h-5" />
  },
  {
    title: "Step 6 – Branch Trainer",
    description: "Take on the responsibility of managing and leading training at one of our dedicated branch locations.",
    icon: <Award className="w-5 h-5" />
  }
];

export const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <SEO 
        title="Careers & Instructor Path | JADMAA Varmakalai"
        description="Build your future through Varmakalai. Learn how to progress from a student to a certified Branch Trainer at JADMAA Academy."
      />
      
      {/* Banner */}
      <section className="bg-jadmaa-cream py-12 md:py-16 border-b border-jadmaa-border text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-4 reveal-on-scroll">
          <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
            Career Opportunities
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-jadmaa-charcoal">
            Build Your Future Through <span className="text-jadmaa-red">Varmakalai</span>
          </h1>
          <p className="text-base md:text-lg text-jadmaa-textMuted max-w-2xl leading-relaxed">
            Train. Lead. Inspire. Preserve the Legacy. Join the JADMAA family and turn your passion for traditional martial arts into a fulfilling career path.
          </p>
        </div>
      </section>

      {/* From Student to Branch Trainer */}
      <section className="py-16 bg-white border-b border-jadmaa-border text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 reveal-on-scroll">
            <h2 className="font-heading font-extrabold text-[clamp(40px,6vw,60px)] text-jadmaa-charcoal">
              From Student to Branch Trainer
            </h2>
            <p className="text-base md:text-lg text-jadmaa-textMuted">
              Our structured progression ensures you receive the highest quality of martial and pedagogical training before you step onto the mat as a leader.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
            {careerSteps.map((step, idx) => (
              <div key={idx} className="bg-jadmaa-cream/50 rounded-2xl border border-jadmaa-border p-6 hover-lift reveal-child flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-jadmaa-red/10 text-jadmaa-red flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-heading font-extrabold text-lg text-jadmaa-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Apply & Form */}
      <section className="py-16 bg-jadmaa-cream border-b border-jadmaa-border text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6 reveal-on-scroll">
              <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
                Who Can Apply?
              </span>
              <h2 className="font-heading font-extrabold text-[clamp(40px,6vw,60px)] text-jadmaa-charcoal">
                Join the Instructor Program
              </h2>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                Whether you are already an advanced martial artist or a dedicated beginner aiming for the long term, we have a pathway for you. Candidates must demonstrate high moral character, physical discipline, and a deep respect for the art of Varmakalai.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start space-x-3 text-base md:text-lg text-jadmaa-textMuted">
                  <CheckCircle2 className="w-5 h-5 text-jadmaa-red flex-shrink-0" />
                  <span>Passionate about teaching and mentoring others.</span>
                </li>
                <li className="flex items-start space-x-3 text-base md:text-lg text-jadmaa-textMuted">
                  <CheckCircle2 className="w-5 h-5 text-jadmaa-red flex-shrink-0" />
                  <span>Willing to undergo rigorous technical and pedagogical training.</span>
                </li>
                <li className="flex items-start space-x-3 text-base md:text-lg text-jadmaa-textMuted">
                  <CheckCircle2 className="w-5 h-5 text-jadmaa-red flex-shrink-0" />
                  <span>Committed to preserving the authenticity of JADMAA Varmakalai.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="bg-white rounded-2xl shadow-sm border border-jadmaa-border p-6 md:p-8">
                <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal mb-6">
                  Apply for the Instructor Program
                </h3>
                
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-green-900">Application Received</h4>
                    <p className="text-sm text-green-700">Thank you for your interest in becoming a JADMAA Instructor. Our team will review your details and contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-jadmaa-charcoal">Full Name <span className="text-jadmaa-red">*</span></label>
                        <input 
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-jadmaa-cream/50 border border-jadmaa-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-jadmaa-charcoal">Phone Number <span className="text-jadmaa-red">*</span></label>
                        <input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-jadmaa-cream/50 border border-jadmaa-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Email Address</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-jadmaa-cream/50 border border-jadmaa-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Prior Martial Arts Experience</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full bg-jadmaa-cream/50 border border-jadmaa-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red transition-colors"
                      >
                        <option value="">Select your experience level...</option>
                        <option value="none">No prior experience</option>
                        <option value="beginner">Beginner (Less than 1 year)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                        <option value="instructor">Existing Instructor in another art</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Why do you want to become a JADMAA Instructor?</label>
                      <textarea 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-jadmaa-cream/50 border border-jadmaa-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red transition-colors resize-none"
                        placeholder="Tell us a bit about your goals..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full btn-jadmaa-primary flex items-center justify-center space-x-2"
                    >
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
