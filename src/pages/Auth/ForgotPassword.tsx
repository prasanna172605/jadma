import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <>
      <SEO 
        title="Reset Password | JADMAA Varmakalai LMS"
        description="Reset your JADMAA Varmakalai account password."
      />

      <section className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-jadmaa-cream/50">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-jadmaa-border shadow-xl space-y-6 text-left">
          
          <div className="text-center space-y-2">
            <img 
              src="/images/logo-1.png" 
              alt="JADMAA Logo" 
              className="h-14 w-auto mx-auto object-contain"
            />
            <h1 className="font-heading font-extrabold text-2xl text-jadmaa-charcoal">
              Reset Your Password
            </h1>
            <p className="text-xs text-jadmaa-textMuted">
              Enter your registered email address and we'll send you password recovery instructions.
            </p>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="text-xs text-jadmaa-textMuted leading-relaxed">
                Reset instructions have been sent to <strong>{email}</strong>. Please check your inbox.
              </p>
              <Link 
                to="/login"
                className="inline-block py-2.5 px-6 bg-jadmaa-red text-white font-bold text-xs rounded-xl shadow"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-jadmaa-charcoal">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@jadmaa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-jadmaa-border text-xs text-jadmaa-charcoal focus:border-jadmaa-red outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-jadmaa-red hover:bg-jadmaa-redDark text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Send Password Reset Link
              </button>
            </form>
          )}

          <div className="text-center pt-2 text-xs border-t border-gray-100">
            <Link to="/login" className="font-bold text-jadmaa-charcoal hover:text-jadmaa-red inline-flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};
