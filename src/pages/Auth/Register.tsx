import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { User, Mail, Phone, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      navigate('/student');
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <SEO 
        title="Register Account | JADMAA Varmakalai"
        description="Register a new student account at JADMAA Varmakalai."
      />

      <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#E8DDD0] shadow-md space-y-6 text-left">
          
          <div className="text-center space-y-2">
            <img 
              src="/images/logo-1.png" 
              alt="JADMAA Logo" 
              className="h-14 w-auto mx-auto object-contain"
            />
            <h1 className="font-heading font-extrabold text-2xl text-[#2B2521]">
              Register Account
            </h1>
            <p className="text-xs text-[#5C5148]">
              Create your JADMAA student account to access courses.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2B2521]">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Senthil Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2B2521]">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="senthil@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2B2521]">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2B2521]">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2B2521]">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#B12B2B] hover:bg-[#8C1E1E] text-white font-bold text-sm rounded-lg shadow transition-all flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Account</span>
            </button>

          </form>

          <div className="text-center pt-2 text-xs text-[#5C5148] border-t border-[#E8DDD0]">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-[#B12B2B] hover:underline inline-flex items-center space-x-1">
              <span>Login Here</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};
