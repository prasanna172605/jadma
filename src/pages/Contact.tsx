import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { mockBranches } from '../data/branches';
import { Phone, Mail, Send, CheckCircle2, Clock, ExternalLink, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCourse = queryParams.get('course') || 'Varma Foundation';
  const initialBranch = queryParams.get('branch') || 'Thanjavur';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: initialBranch,
    courseInterest: initialCourse,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const pCourse = queryParams.get('course');
    const pBranch = queryParams.get('branch');
    if (pCourse) setFormData(prev => ({ ...prev, courseInterest: pCourse }));
    if (pBranch) setFormData(prev => ({ ...prev, branch: pBranch }));
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Please fill in your name and contact phone number.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <SEO 
        title="Contact JADMAA Varmakalai Academy | Admissions & Enquiries"
        description="Get in touch with JADMAA Varmakalai Academy for course admissions, free demo classes, and branch locations in Thanjavur, Kumbakonam and Ariyalur."
      />

      <section className="bg-jadmaa-cream py-12 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 reveal-on-scroll">
          <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
            Admissions & Enquiries
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-jadmaa-charcoal">
            Get in Touch With JADMAA
          </h1>
          <p className="text-base md:text-lg text-jadmaa-textMuted max-w-2xl">
            Book a free demo class, inquire about course admissions, or consult with our Varmakalai masters.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Form */}
            <div className="lg:col-span-7 bg-jadmaa-cream/60 p-8 rounded-3xl border border-jadmaa-border shadow-sm reveal-left">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-jadmaa-charcoal">
                    Enquiry Submitted Successfully!
                  </h3>
                  <p className="text-sm md:text-lg md:text-xl text-jadmaa-textMuted max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our admissions team at the <strong>{formData.branch}</strong> branch will call you back on <strong>{formData.phone}</strong> shortly to schedule your session.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', branch: 'Thanjavur', courseInterest: 'Varma Foundation', message: '' }); }}
                    className="px-6 py-2.5 bg-jadmaa-red text-white font-bold text-xs rounded-xl shadow hover:bg-jadmaa-redDark transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-jadmaa-charcoal">
                      Send Us a Message
                    </h3>
                    <p className="text-sm md:text-lg md:text-xl text-jadmaa-textMuted">Fill out the form below to request a free trial class or course brochure.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Senthil Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-sm md:text-lg text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-sm md:text-lg text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="senthil@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-sm md:text-lg text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-jadmaa-charcoal">Preferred Branch</label>
                      <select 
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-sm md:text-lg text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                      >
                        <option value="Thanjavur">Thanjavur (HQ)</option>
                        <option value="Kumbakonam">Kumbakonam</option>
                        <option value="Ariyalur">Ariyalur</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-jadmaa-charcoal">Course / Program Interest</label>
                    <select 
                      value={formData.courseInterest}
                      onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-sm md:text-lg text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                    >
                      <option value="Varma Foundation">Varma Foundation & Vital Points</option>
                      <option value="Intermediate Varma">Intermediate Varma Combat</option>
                      <option value="Kids Varmakalai">Kids Varmakalai & Fitness</option>
                      <option value="Womens Self Defence">Women's Tactical Self Defence</option>
                      <option value="Varma Wellness">Varma Healing & Wellness Therapy</option>
                      <option value="Complete Master Program">Complete Master Program</option>
                      <option value="Instructor Pathway">Certified Instructor Pathway</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-jadmaa-charcoal">Your Message or Preferred Timings</label>
                    <textarea 
                      rows={4}
                      placeholder="Please let us know your preferred training time or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-sm md:text-lg text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-jadmaa-red hover:bg-jadmaa-redDark text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Free Demo Class Request</span>
                  </button>

                </form>
              )}

            </div>

            {/* Right Contact Info */}
            <div className="lg:col-span-5 space-y-8 reveal-right">
              
              <div className="space-y-4">
                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-jadmaa-charcoal">
                  Direct Contact Information
                </h3>
                <p className="text-sm md:text-lg md:text-xl text-jadmaa-textMuted leading-relaxed">
                  Have urgent questions about class timings, registrations or therapeutic appointments? Reach out to our central team.
                </p>

                <div className="space-y-3 pt-2">
                  <a 
                    href="tel:+919345220020"
                    className="p-4 bg-jadmaa-cream rounded-2xl border border-jadmaa-border flex items-start space-x-3 hover:border-jadmaa-red transition-all group"
                  >
                    <Phone className="w-5 h-5 text-jadmaa-red flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-bold text-left">Central Admissions Line</p>
                      <p className="font-bold text-base md:text-lg text-jadmaa-charcoal text-left">+91 93452 20020</p>
                    </div>
                  </a>

                  <a 
                    href="tel:+919655457500"
                    className="p-4 bg-jadmaa-cream rounded-2xl border border-jadmaa-border flex items-start space-x-3 hover:border-jadmaa-red transition-all group"
                  >
                    <Phone className="w-5 h-5 text-jadmaa-red flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-bold text-left">Secondary Support Line</p>
                      <p className="font-bold text-base md:text-lg text-jadmaa-charcoal text-left">+91 96554 57500</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:info@jadmaa.com"
                    className="p-4 bg-jadmaa-cream rounded-2xl border border-jadmaa-border flex items-start space-x-3 hover:border-jadmaa-red transition-all group"
                  >
                    <Mail className="w-5 h-5 text-jadmaa-red flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-bold text-left">Official Email</p>
                      <p className="font-bold text-base md:text-lg text-jadmaa-charcoal text-left">info@jadmaa.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-heading font-bold text-lg text-jadmaa-charcoal text-left">
                  Branch Operating Hours
                </h4>
                <div className="space-y-3 reveal-stagger">
                  {mockBranches.map(b => (
                    <div key={b.id} className="reveal-child p-4 bg-white rounded-xl border border-jadmaa-border text-xs space-y-1.5 shadow-sm hover:border-jadmaa-red transition-all text-left">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-jadmaa-charcoal text-sm">{b.city} Branch</p>
                        <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-jadmaa-red/10 text-jadmaa-red">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-jadmaa-textMuted pt-0.5">
                        <Clock className="w-3.5 h-3.5 text-jadmaa-red flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{b.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Majestic "Our Branches" section with live location maps */}
      <section className="bg-jadmaa-cream/40 py-16 border-b border-jadmaa-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-sm md:text-base font-bold text-jadmaa-red uppercase tracking-wider">
              VISIT OUR ACADEMIES
            </span>
            <h2 className="font-heading font-extrabold text-4xl text-[#2B2521]">
              Our Branches
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBranches.map((branch) => {
              // Custom map link query for direct opening in google maps
              const mapQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                branch.id === 'ariyalur' 
                  ? "Mr. Perfect Gym, Ariyalur, Tamil Nadu" 
                  : branch.name + " " + branch.city
              )}`;
              
              return (
                <div key={branch.id} className="bg-white rounded-3xl border border-jadmaa-border shadow-md p-6 text-left space-y-5 flex flex-col justify-between hover-lift">
                  <div className="space-y-3">
                    <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal flex items-center space-x-2">
                      <span role="img" aria-label="pin" className="text-jadmaa-red">📍</span>
                      <span>{branch.id === 'thanjavur' ? 'Thanjavur Branch' : branch.id === 'kumbakonam' ? 'Kumbakonam Branch' : 'Ariyalur Branch'}</span>
                    </h3>
                    <p className="text-[#5C5148] text-sm md:text-base leading-relaxed h-[4.5rem] overflow-hidden">
                      {branch.address}
                    </p>
                  </div>
                  
                  {/* Interactive Map Block */}
                  <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-inner h-[220px] w-full group/map">
                    <iframe
                      src={branch.mapEmbedUrl}
                      className="w-full h-full border-0"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={branch.name}
                    />
                    {/* Open in Maps Overlay Button */}
                    <a
                      href={mapQueryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 left-4 bg-white border border-gray-200 rounded-xl px-3.5 py-1.5 shadow-sm text-xs font-bold text-[#1a73e8] hover:bg-gray-50 flex items-center space-x-1.5 transition-all"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
