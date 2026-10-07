import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Phone, Mail, CheckCircle2 } from 'lucide-react';
import { EditableText } from '../components/common/EditableText';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    branch: 'Thanjavur',
    course: 'Basic Varmakalai Training',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert('Please fill in your name and mobile number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <SEO 
        title="Contact JADMAA Varmakalai | We'd Love to Hear From You"
        description="Contact JADMAA Varmakalai for admissions, trial classes, or Varma treatment across our Thanjavur, Kumbakonam, and Ariyalur branches."
      />

      <div className="bg-[#FAF6F0] min-h-screen font-body text-[#2B2521] text-left">
        
        {/* Banner Section */}
        <section className="py-8 sm:py-12 bg-[#FAF6F0] border-b border-[#E8DDD0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#2B2521] leading-[1.15]">
              <EditableText settingKey="contact.title" defaultText="Contact JADMAA Varmakalai" />
            </h1>
            <p className="font-heading font-bold text-[18px] sm:text-[20px] text-[#2B2521] leading-[1.3]">
              <EditableText settingKey="contact.subtitle" defaultText="We'd Love to Hear From You" />
            </p>
            <p className="font-body text-[16px] text-[#5C5148] leading-[1.6] max-w-2xl mx-auto pt-1">
              Whether you're interested in joining our Varmakalai (Varma Kalai) martial arts training programs, booking a trial class, asking about Varma treatment, or becoming part of our instructor network, our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact Info + Enquiry Form Grid */}
        <section className="py-8 sm:py-12 bg-[#FAF6F0] border-b border-[#E8DDD0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Phone, Email, Connect */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Phone Card */}
                <div className="bg-white p-6 rounded-[14px] border border-[#E8DDD0] space-y-3">
                  <h4 className="font-heading font-semibold text-[18px] text-[#2B2521] leading-[1.2]">
                    Phone
                  </h4>
                  <ul className="space-y-2 text-[15px] font-body text-[#2B2521]">
                    <li>
                      <a href="tel:+919345220020" className="inline-flex items-center space-x-2.5 text-[#2B2521] hover:text-[#B12B2B] transition-colors">
                        <Phone className="w-4 h-4 text-[#B12B2B]" />
                        <span>+91 93452 20020</span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+919655457500" className="inline-flex items-center space-x-2.5 text-[#2B2521] hover:text-[#B12B2B] transition-colors">
                        <Phone className="w-4 h-4 text-[#B12B2B]" />
                        <span>+91 96554 57500</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-[14px] border border-[#E8DDD0] space-y-3">
                  <h4 className="font-heading font-semibold text-[18px] text-[#2B2521] leading-[1.2]">
                    Email
                  </h4>
                  <ul className="text-[15px] font-body text-[#2B2521]">
                    <li>
                      <a href="mailto:info@jadmaa.com" className="inline-flex items-center space-x-2.5 text-[#2B2521] hover:text-[#B12B2B] transition-colors">
                        <Mail className="w-4 h-4 text-[#B12B2B]" />
                        <span>info@jadmaa.com</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Connect With Us Card */}
                <div className="bg-white p-6 rounded-[14px] border border-[#E8DDD0] space-y-3">
                  <h4 className="font-heading font-semibold text-[18px] text-[#2B2521] leading-[1.2]">
                    Connect With Us
                  </h4>
                  <p className="font-body text-[15px] text-[#5C5148] leading-[1.6]">
                    Stay connected with JADMAA Varmakalai for training updates, workshops, self-defence tips, and student success stories.
                  </p>
                  <div className="pt-1">
                    <a 
                      href="https://chat.whatsapp.com/BOdavYeDSMJ0xREnzyelJh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#B12B2B] hover:bg-[#8F2020] text-white font-semibold text-[15px] px-6 py-2.5 rounded-[8px] transition-colors"
                    >
                      Join Our WhatsApp Community
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Enquiry Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[14px] border border-[#E8DDD0] space-y-4">
                <div>
                  <h3 className="font-heading font-semibold text-[22px] text-[#2B2521] leading-[1.2]">
                    Send Us an Enquiry
                  </h3>
                  <p className="font-body text-[15px] text-[#5C5148] leading-[1.6] mt-1">
                    Fill out the form below and our team will get back to you as soon as possible.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 bg-[#FAF6F0] rounded-[10px] border border-[#E8DDD0] text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#B12B2B] mx-auto" />
                    <h4 className="font-heading font-bold text-[18px] text-[#2B2521]">Thank you for your enquiry!</h4>
                    <p className="font-body text-[14px] text-[#5C5148]">
                      Our team will reach out to you at <strong>{formData.mobile}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[13px] font-semibold text-[#B12B2B] hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <input 
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[8px] border border-[#E8DDD0] bg-white text-[15px] text-[#2B2521] placeholder-[#5C5148]/60 focus:border-[#B12B2B] outline-none"
                      />
                    </div>

                    <div>
                      <input 
                        type="tel"
                        required
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[8px] border border-[#E8DDD0] bg-white text-[15px] text-[#2B2521] placeholder-[#5C5148]/60 focus:border-[#B12B2B] outline-none"
                      />
                    </div>

                    <div>
                      <input 
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[8px] border border-[#E8DDD0] bg-white text-[15px] text-[#2B2521] placeholder-[#5C5148]/60 focus:border-[#B12B2B] outline-none"
                      />
                    </div>

                    <div>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[8px] border border-[#E8DDD0] bg-white text-[15px] text-[#2B2521] focus:border-[#B12B2B] outline-none"
                      >
                        <option value="Thanjavur">Thanjavur</option>
                        <option value="Kumbakonam">Kumbakonam</option>
                        <option value="Ariyalur">Ariyalur</option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[8px] border border-[#E8DDD0] bg-white text-[15px] text-[#2B2521] focus:border-[#B12B2B] outline-none"
                      >
                        <option value="Basic Varmakalai Training">Basic Varmakalai Training</option>
                        <option value="Intermediate Varmakalai Training">Intermediate Varmakalai Training</option>
                        <option value="Advanced Varmakalai Training">Advanced Varmakalai Training</option>
                        <option value="Kids Self-Defence Training">Kids Self-Defence Training</option>
                        <option value="Self-Defence Training for ALL">Self-Defence Training for ALL</option>
                        <option value="Women's Self-Defence Program">Women's Self-Defence Program</option>
                        <option value="Weight Loss Training">Weight Loss Training</option>
                      </select>
                    </div>

                    <div>
                      <textarea
                        rows={4}
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[8px] border border-[#E8DDD0] bg-white text-[15px] text-[#2B2521] placeholder-[#5C5148]/60 focus:border-[#B12B2B] outline-none resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <input 
                        type="submit" 
                        value="Submit Enquiry"
                        className="bg-[#B12B2B] hover:bg-[#8F2020] text-white font-semibold text-[15px] px-7 py-3 rounded-[8px] transition-colors cursor-pointer w-full sm:w-auto"
                      />
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Our Branches Section */}
        <section className="py-8 sm:py-12 bg-[#FAF6F0] border-b border-[#E8DDD0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#2B2521] leading-[1.15]">
              Our Branches
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Branch 1: Thanjavur */}
              <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-[#E8DDD0] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-heading font-semibold text-[18px] text-[#2B2521] leading-[1.2]">
                    📍 Thanjavur Branch
                  </h4>
                  <p className="font-body text-[15px] text-[#5C5148] leading-[1.6]">
                    48, Carmel Nagar, Kaattuthottam,<br />
                    Near Mariamman Kovil Park,<br />
                    Thanjavur, Tamil Nadu.
                  </p>
                </div>
                <div className="w-full h-[220px] rounded-[10px] overflow-hidden border border-[#E8DDD0]">
                  <iframe 
                    src="https://maps.google.com/maps?q=JADMAA%20Varmakalai%2C%20Thanjavur%20-%20Nagapattinam%20Rd%2C%20Mariamman%20Kovil%2C%20Pulianthoppu%2C%20Thanjavur%2C%20Tamil%20Nadu%20613501&t=m&z=17&output=embed&iwloc=near"
                    title="JADMAA Varmakalai, Thanjavur"
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Branch 2: Kumbakonam */}
              <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-[#E8DDD0] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-heading font-semibold text-[18px] text-[#2B2521] leading-[1.2]">
                    📍 Kumbakonam Branch
                  </h4>
                  <p className="font-body text-[15px] text-[#5C5148] leading-[1.6]">
                    SVS Trader,<br />
                    Melakkaveri GH Back Side,<br />
                    Swamimalai Main Road,<br />
                    Kumbakonam, Tamil Nadu.
                  </p>
                </div>
                <div className="w-full h-[220px] rounded-[10px] overflow-hidden border border-[#E8DDD0]">
                  <iframe 
                    src="https://maps.google.com/maps?q=JADMAA%20Varmakalai%2C%20Jadma%20Varmakalai%20GH%20backside%2C%20Swamimalai%20Rd%2C%20Melacavery%2C%20Kumbakonam%2C%20Tamil%20Nadu%20612001&t=m&z=17&output=embed&iwloc=near"
                    title="JADMAA Varmakalai, Kumbakonam"
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Branch 3: Ariyalur */}
              <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-[#E8DDD0] space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-heading font-semibold text-[18px] text-[#2B2521] leading-[1.2]">
                    📍 Ariyalur Branch
                  </h4>
                  <p className="font-body text-[15px] text-[#5C5148] leading-[1.6]">
                    Mr. Perfect Gym,<br />
                    Ariyalur, Tamil Nadu.
                  </p>
                </div>
                <div className="w-full h-[220px] rounded-[10px] overflow-hidden border border-[#E8DDD0]">
                  <iframe 
                    src="https://maps.google.com/maps?q=JADMAA%20Varmakalai%2C%20Mr.%20Perfect%20Gym%2C%20Ariyalur%2C%20Tamil%20Nadu&t=m&z=15&output=embed&iwloc=near"
                    title="JADMAA Varmakalai, Ariyalur"
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
};
