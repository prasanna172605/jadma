import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CheckCircle2, Eye, Target } from 'lucide-react';
import { EditableText } from '../components/common/EditableText';

const whyChooseItems = [
  'Authentic Traditional Varmakalai Training',
  "Structured Beginner, Intermediate & Advanced Programs",
  "Women's Self-Defence Training",
  "Children's Martial Arts Development Programs",
  'Physical Fitness & Weight Management Training',
  'Experienced & Dedicated Instructors',
  'Safe, Friendly & Disciplined Learning Environment',
  'Focus on Confidence, Discipline & Mental Strength',
  'Weekend Training Programs for Working Professionals & Students.',
];

const curriculumLevels = [
  'Varma strikes',
  'Varma release techniques',
  'Gripping methods',
  'Defensive applications',
  'Physical conditioning',
];

export const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="About JADMAA Varmakalai Academy | Heritage & Lineage"
        description="Learn about JADMAA Varmakalai Academy, Founder Bojagarajan, traditional Tamil Siddha martial heritage, and our mission across Thanjavur, Kumbakonam and Ariyalur."
      />

      {/* Page Banner */}
      <section className="bg-jadmaa-cream py-12 border-b border-jadmaa-border text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-3 reveal-on-scroll">
          <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
            <EditableText settingKey="about.banner.subtitle" defaultText="Our Organization" />
          </span>
          <h1 className="font-heading font-extrabold text-[clamp(40px,6vw,60px)] text-jadmaa-charcoal">
            <EditableText settingKey="about.banner.title" defaultText="About JADMAA Varmakalai Academy" />
          </h1>
          <p className="text-base md:text-lg text-jadmaa-textMuted max-w-2xl">
            <EditableText settingKey="about.banner.desc" defaultText="Preserving the ancient 1000+ year old Tamil martial art, vital point energy science, and Siddha therapeutic traditions." multiline />
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white border-b border-jadmaa-border">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-16">
          
          {/* Section 1: History */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 text-left reveal-left">
              <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
                <EditableText settingKey="about.history.subtitle" defaultText="1000+ Year Heritage" />
              </span>
              <h2 className="font-heading font-extrabold text-[clamp(40px,6vw,60px)] text-jadmaa-charcoal">
                <EditableText settingKey="about.history.title" defaultText="The Science of Varmakalai" />
              </h2>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                <EditableText settingKey="about.history.p1" defaultText="Varmakalai (Vital Points Art) is a legendary Tamil martial and medical science formulated by ancient Siddhar sages such as Agastya Siddhar. It centers on the precise knowledge of 108 vital nerve points across the human body (*Varma Pulligal*)." multiline />
              </p>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                <EditableText settingKey="about.history.p2" defaultText="JADMAA was founded to safeguard this priceless cultural heritage from dilution or distortion. We teach both defensive tactics (*Adimurai*) and therapeutic healing (*Varma Vaidhiyam*) in a structured, ethical, and accessible manner." multiline />
              </p>
            </div>

            <div className="lg:col-span-6 reveal-right flex justify-center">
              <div className="img-interactive-frame w-full max-w-[460px] border border-jadmaa-border shadow-xl bg-jadmaa-cream">
                <img 
                  src="/images/pose-dab-red-e1785095608624-653x1024.jpg" 
                  alt="Varmakalai Stance" 
                  className="w-full h-auto max-h-[480px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left reveal-stagger">
              <div className="reveal-child bg-jadmaa-cream/60 p-8 rounded-2xl border border-jadmaa-border space-y-4 hover-lift">
                <div className="w-10 h-10 rounded-lg bg-jadmaa-red/10 text-jadmaa-red flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal">
                  <EditableText settingKey="about.vision.title" defaultText="Our Vision" />
                </h3>
                <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                  <EditableText settingKey="about.vision.desc" defaultText="To become one of India’s most trusted Varmakalai schools by preserving this ancient martial tradition and making it accessible to future generations through quality education and disciplined training." multiline />
                </p>
              </div>

              <div className="reveal-child bg-jadmaa-cream/60 p-8 rounded-2xl border border-jadmaa-border space-y-4 hover-lift">
                <div className="w-10 h-10 rounded-lg bg-jadmaa-red/10 text-jadmaa-red flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal">
                  <EditableText settingKey="about.mission.title" defaultText="Our Mission" />
                </h3>
                <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                  <EditableText settingKey="about.mission.desc" defaultText="To inspire individuals to live healthier, stronger, and more confident lives by providing authentic Varmakalai education that develops physical fitness, self-defence ability, mental focus, discipline, and respect while protecting the cultural heritage of Tamil martial arts and traditional Varma treatment practices." multiline />
                </p>
              </div>
            </div>

            {/* Why Choose JADMAA Varmakalai? */}
            <div className="bg-jadmaa-cream/40 rounded-2xl border border-jadmaa-border p-8 text-left reveal-on-scroll">
              <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal mb-6">
                Why Choose JADMAA Varmakalai?
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {whyChooseItems.map((item) => (
                  <li key={item} className="flex items-start space-x-2.5 text-base md:text-lg text-jadmaa-textMuted">
                    <CheckCircle2 className="w-4 h-4 text-jadmaa-red flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meet Our Founder */}
          <div className="bg-jadmaa-cream rounded-3xl p-8 border border-jadmaa-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left reveal-on-scroll">
            <div className="md:col-span-5">
              <div className="img-interactive-frame shadow-md border border-jadmaa-border bg-white">
                <img 
                  src="/images/founder.webp" 
                  alt="Founder Bojagarajan with his master, Aasan R. Rajendran of Madurai" 
                  className="w-full max-h-[420px] object-cover"
                />
              </div>
              <p className="text-base md:text-lg text-jadmaa-textMuted italic mt-3 text-center">
                Founder Bojagarajan with his master, Aasan R. Rajendran of Madurai
              </p>
            </div>
            <div className="md:col-span-7 space-y-3">
              <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
                <EditableText settingKey="about.founder.eyebrow" defaultText="Meet Our Founder" />
              </span>
              <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal">
                <EditableText settingKey="about.founder.name" defaultText="Bojagarajan" />
              </h3>
              <p className="text-xs font-semibold text-jadmaa-textMuted">
                <EditableText settingKey="about.founder.role" defaultText="Founder & Chief Instructor" />
              </p>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                <EditableText settingKey="about.founder.bio" defaultText="JADMAA Varmakalai was founded by Bojagarajan, a Varmakalai practitioner with over 15 years of experience in the art. He was trained in traditional Varmakalai under his master, Aasan R. Rajendran of Madurai, and carries that lineage forward today — personally training students and instructors across our Thanjavur, Kumbakonam, and Ariyalur branches." multiline />
              </p>
              <Link 
                to="/contact" 
                className="inline-block pt-2 font-bold text-xs text-jadmaa-red hover:underline"
              >
                Connect with Bojagarajan &rarr;
              </Link>
            </div>
          </div>

          {/* Best Choice / Curriculum */}
          <div className="space-y-10 text-left reveal-on-scroll">
            <div className="space-y-4">
              <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
                <EditableText settingKey="about.curriculum.eyebrow" defaultText="Your best choice for martial arts training" />
              </span>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed max-w-3xl">
                <EditableText settingKey="about.curriculum.intro" defaultText="Based on this strong traditional foundation, JADMAA Varmakalai Academy was established. Our training system goes beyond self-defense. It is designed as a holistic program that develops:" multiline />
              </p>
              <ul className="flex flex-wrap gap-2">
                {['Body-mind coordination', 'Discipline', 'Confidence', 'Energy control', 'Character development'].map((item) => (
                  <li key={item} className="px-3 py-1.5 text-xs font-semibold bg-jadmaa-cream/70 border border-jadmaa-border rounded-full text-jadmaa-charcoal hover-lift">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-extrabold text-[clamp(24px,4vw,40px)] text-jadmaa-charcoal">
                <EditableText settingKey="about.curriculum.title" defaultText="Learn from the best martial arts instructors around" />
              </h3>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed">
                <EditableText settingKey="about.curriculum.subtitle" defaultText="Students are taught structured levels including:" />
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {curriculumLevels.map((item) => (
                  <li key={item} className="flex items-start space-x-2.5 text-base md:text-lg text-jadmaa-textMuted">
                    <CheckCircle2 className="w-4 h-4 text-jadmaa-red flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed max-w-3xl pt-2">
                <EditableText settingKey="about.curriculum.progression" defaultText="Each student progresses from beginner to advanced stages, with opportunities to become professional instructors based on skill and discipline." multiline />
              </p>
              <p className="text-base md:text-lg text-jadmaa-textMuted leading-relaxed max-w-3xl">
                <EditableText settingKey="about.curriculum.welcome" defaultText="JADMAA Varmakalai welcomes everyone — from beginners taking their first step into martial arts to dedicated practitioners seeking advanced Varmakalai knowledge. Join us and become part of a community committed to preserving tradition while building strength for the future." multiline />
              </p>
              <Link to="/contact" className="btn-jadmaa-primary inline-block mt-2">
                Join Now
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};