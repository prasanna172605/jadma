import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { 
  Briefcase, 
  CheckCircle2, 
  Sparkles,
  Send
} from 'lucide-react';

export const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roleInterest: 'Varmakalai Instructor',
    experience: 'Beginner',
    branch: 'Thanjavur',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and contact phone number.");
      return;
    }
    setSubmitted(true);
  };

  const careerTracks = [
    {
      title: 'Varmakalai Certified Instructor',
      badge: 'Full-Time / Part-Time',
      description: 'Lead traditional martial training batches, teach authentic 108 vital points strikes and releases at official JADMAA branches.',
      perks: ['Academy grading license', 'Direct mentorship under Grandmaster', 'Branch revenue share']
    },
    {
      title: "Women's Tactical Defence Coach",
      badge: 'High Demand',
      description: 'Conduct dedicated self-defence workshops for colleges, corporate offices, IT companies, and women batches across Tamil Nadu.',
      perks: ['Corporate training modules', 'Official coach certificate', 'Flexible batch schedule']
    },
    {
      title: "Children's Martial Arts Educator",
      badge: 'Weekend / Evening',
      description: 'Instill mental focus, ancient discipline, physical flexibility, and moral character in young students aged 6 to 16.',
      perks: ['Structured pedagogy training', 'School workshop tie-ups', 'Rewarding career path']
    },
    {
      title: 'Siddha Varma Wellness Practitioner',
      badge: 'Therapeutic Practice',
      description: 'Specialize in traditional pressure point energy balance, pain management, and joint relief therapies under expert lineage.',
      perks: ['Therapeutic practice guidance', 'Consultation center support', 'Community health impact']
    }
  ];

  const steps = [
    { step: '01', title: 'Foundation Training', desc: 'Master the fundamental stances, Adimurai steps, and core 108 Varma point geography.' },
    { step: '02', title: 'Pedagogy & Ethics', desc: 'Learn instructional methodology, practitioner safety, injury prevention, and student psychology.' },
    { step: '03', title: 'Academy Examination', desc: 'Complete practical evaluation and viva under Grandmaster A. Jeyaraj.' },
    { step: '04', title: 'Branch Placement', desc: 'Receive your verified instructor credentials and lead official academy training centers.' }
  ];

  return (
    <>
      <SEO 
        title="Careers & Instructor Pathways | JADMAA Varmakalai Academy"
        description="Build a purposeful career in authentic Tamil Varmakalai. Become a certified martial arts instructor, women's self-defence coach, or wellness practitioner."
      />

      {/* Hero Banner */}
      <section className="bg-jadmaa-cream py-12 md:py-16 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 reveal-on-scroll">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B12B2B]/10 text-[#B12B2B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth & Leadership Pathway</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2B2521] leading-tight max-w-3xl">
            Build a Purposeful Career in Ancient Tamil Varmakalai
          </h1>
          <p className="font-body text-base text-[#5C5148] max-w-2xl leading-relaxed">
            Train under recognized Gurukulam lineage, earn official certifications, and inspire future generations as a certified instructor or branch leader.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a href="#apply" className="btn-jadmaa-primary">
              Apply as Instructor
            </a>
            <Link to="/courses" className="btn-jadmaa-outline">
              Explore Prerequisites
            </Link>
          </div>
        </div>
      </section>

      {/* Career Tracks */}
      <section className="py-16 bg-white border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="reveal-on-scroll">
            <span className="text-xs font-bold text-[#B12B2B] uppercase tracking-wider">Where It Can Lead</span>
            <h2 className="font-heading font-extrabold text-3xl text-[#2B2521] mt-1">Instructor Opportunities</h2>
            <p className="text-sm text-[#5C5148] mt-1">Choose the pathway that aligns with your passion and community focus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-stagger">
            {careerTracks.map((track) => (
              <div key={track.title} className="reveal-child jd-card p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-[#FAF6F0] text-[#B12B2B] border border-[#E8DDD0]">
                      {track.badge}
                    </span>
                    <Briefcase className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#2B2521]">{track.title}</h3>
                  <p className="text-xs text-[#5C5148] leading-relaxed">{track.description}</p>
                </div>

                <div className="pt-4 border-t border-[#E8DDD0] space-y-2">
                  <p className="text-[11px] font-bold text-[#2B2521]">Key Highlights:</p>
                  <ul className="space-y-1 text-xs text-[#5C5148]">
                    {track.perks.map((perk) => (
                      <li key={perk} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Steps */}
      <section className="py-16 bg-[#FAF6F0] border-b border-[#E8DDD0] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 reveal-on-scroll">
            <span className="text-xs font-bold text-[#B12B2B] uppercase tracking-wider">The Roadmap</span>
            <h2 className="font-heading font-extrabold text-3xl text-[#2B2521]">How to Become a JADMAA Instructor</h2>
            <p className="text-xs text-[#5C5148]">Structured progression combining physical mastery and pedagogical excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {steps.map((item) => (
              <div key={item.step} className="reveal-child bg-white p-6 rounded-2xl border border-[#E8DDD0] shadow-sm space-y-3">
                <span className="text-2xl font-black text-[#B12B2B] font-heading">{item.step}</span>
                <h4 className="font-heading font-bold text-base text-[#2B2521]">{item.title}</h4>
                <p className="text-xs text-[#5C5148] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-white border-b border-jadmaa-border text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
          <div className="bg-[#FAF6F0] p-8 sm:p-10 rounded-3xl border border-[#E8DDD0] shadow-sm space-y-6">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#B12B2B] uppercase tracking-wider">Instructor Admissions</span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2B2521]">
                Enquire About the Instructor Pathway
              </h3>
              <p className="text-xs text-[#5C5148]">
                Fill in your details and our senior faculty will contact you to schedule an initial consultation and assessment.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3 bg-white rounded-2xl border border-[#E8DDD0] p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-[#2B2521]">Application Received</h4>
                <p className="text-xs text-[#5C5148] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our faculty team will review your enquiry for <strong>{formData.roleInterest}</strong> and get back to you via <strong>{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 bg-[#B12B2B] text-white text-xs font-bold rounded-lg shadow"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2B2521]">Full Name *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Senthil Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2B2521]">Phone Number (WhatsApp) *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2B2521]">Email Address</label>
                    <input 
                      type="email"
                      placeholder="senthil@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2B2521]">Interested Pathway</label>
                    <select
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                    >
                      <option value="Varmakalai Instructor">Varmakalai Certified Instructor</option>
                      <option value="Womens Self Defence Coach">Women's Tactical Defence Coach</option>
                      <option value="Childrens Coach">Children's Martial Arts Educator</option>
                      <option value="Siddha Wellness Practitioner">Siddha Varma Wellness Practitioner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2B2521]">Prior Martial Arts / Fitness Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                    >
                      <option value="Beginner">No prior experience (Beginner)</option>
                      <option value="1-3 Years">1 - 3 Years (Martial Arts / Yoga / Fitness)</option>
                      <option value="3-5 Years">3 - 5 Years Martial Arts Experience</option>
                      <option value="5+ Years">5+ Years / Existing Black Belt / Instructor</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#2B2521]">Preferred Branch Location</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                    >
                      <option value="Thanjavur">Thanjavur (HQ)</option>
                      <option value="Kumbakonam">Kumbakonam</option>
                      <option value="Ariyalur">Ariyalur</option>
                      <option value="Online / Distance">Online / Distance Mentorship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2B2521]">Brief Note / Goals</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your background and why you want to teach Varmakalai..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-xs text-[#2B2521] focus:border-[#B12B2B] outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#B12B2B] hover:bg-[#8C1E1E] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Instructor Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
