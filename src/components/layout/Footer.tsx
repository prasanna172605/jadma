import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { getSettingValue } from '../../lib/cms/defaultContent';

export const Footer: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSettings();
  return (
    <footer className="bg-jadmaa-charcoal text-white pt-14 pb-8 border-t-4 border-jadmaa-red text-left">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700">
          
          {/* Brand Info & Short Note */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={getSettingValue(settings, 'site.header.logo')}
                alt="JADMAA Logo" 
                className="h-12 w-auto bg-white p-1 rounded-lg"
              />
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  JADMAA <span className="text-jadmaa-red">VARMAKALAI</span>
                </span>
                <p className="text-xs text-gray-400">Academy of Ancient Tamil Martial Science</p>
              </div>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {getSettingValue(settings, 'site.footer.description')}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={getSettingValue(settings, 'site.footer.social.instagram')}
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-jadmaa-red flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href={getSettingValue(settings, 'site.footer.social.facebook')}
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-jadmaa-red flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a 
                href={getSettingValue(settings, 'site.footer.social.youtube')}
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-jadmaa-red flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Our Branches */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-gray-700 pb-2 inline-block">
              Our Branches
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-jadmaa-red flex-shrink-0" />
                  <span>Thanjavur (HQ)</span>
                </p>
                <p className="text-gray-400 pl-5.5 text-xs">48, Carmel Nagar, Kaattuthottam</p>
              </div>
              <div>
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-jadmaa-red flex-shrink-0" />
                  <span>Kumbakonam</span>
                </p>
                <p className="text-gray-400 pl-5.5 text-xs">Swamimalai Main Road, Melakkaveri</p>
              </div>
              <div>
                <p className="font-bold text-white flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-jadmaa-red flex-shrink-0" />
                  <span>Ariyalur</span>
                </p>
                <p className="text-gray-400 pl-5.5 text-xs">Mr. Perfect Gym, Ariyalur</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-gray-700 pb-2 inline-block">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-jadmaa-red flex-shrink-0" />
                <span className="font-mono font-semibold">
                  {getSettingValue(settings, 'site.footer.phone')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-jadmaa-red flex-shrink-0" />
                <span className="font-mono font-semibold">
                  {getSettingValue(settings, 'site.footer.email')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-gray-700 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-jadmaa-red transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-jadmaa-red transition-colors">Careers & Pathways</Link></li>
              <li><Link to="/blog" className="hover:text-jadmaa-red transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-jadmaa-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Featured Courses / Programs */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-lg text-white border-b border-gray-700 pb-2 inline-block">
              Programs
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/courses/varma-foundation" className="hover:text-jadmaa-red transition-colors">Varma Foundation</Link></li>
              <li><Link to="/courses/intermediate-varma" className="hover:text-jadmaa-red transition-colors">Intermediate Varma</Link></li>
              <li><Link to="/courses/kids-varmakalai" className="hover:text-jadmaa-red transition-colors">Kids Varmakalai</Link></li>
              <li><Link to="/courses/womens-self-defence" className="hover:text-jadmaa-red transition-colors">Women's Self Defence</Link></li>
              <li><Link to="/courses/all-in-one-selfdefence" className="hover:text-jadmaa-red transition-colors">Complete Self Defence</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-jadmaa-red" />
            <span>&copy; {new Date().getFullYear()} JADMAA Varmakalai Academy. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="hover:text-white font-semibold">Login / Register</Link>
            <Link to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/dashboard"} className="hover:text-jadmaa-red font-semibold text-gray-300">Student LMS</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
