import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    
    try {
      const user = await login(email, password);
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        navigate('/admin');
      } else if (user.role === 'INSTRUCTOR') {
        navigate('/instructor');
      } else {
        navigate('/student');
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <SEO 
        title="Login | JADMAA Varmakalai"
        description="Login to your JADMAA student portal."
      />
      <section className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#E8DDD0] shadow-md space-y-6 text-left">
          
          <div className="text-center space-y-2">
            <img 
              src="/images/logo-1.png" 
              alt="JADMAA Logo" 
              className="h-14 w-auto mx-auto object-contain"
            />
            <h1 className="font-heading font-extrabold text-2xl text-[#2B2521]">
              Login to JADMAA
            </h1>
            <p className="text-xs text-[#5C5148]">
              Enter your credentials to access your student account.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2B2521]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="student@jadmaa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2B2521]">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-[#B12B2B] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#E8DDD0] text-xs text-[#2B2521] focus:border-[#B12B2B] focus:ring-1 focus:ring-[#B12B2B] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-[#2B2521]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-[#B12B2B] focus:ring-[#B12B2B]"
              />
              <label htmlFor="remember" className="text-xs text-[#5C5148] cursor-pointer">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#B12B2B] hover:bg-[#8C1E1E] text-white font-bold text-sm rounded-lg shadow transition-all flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-[#5C5148] border-t border-[#E8DDD0]">
            <span>Don't have an account? </span>
            <Link to="/register" className="font-bold text-[#B12B2B] hover:underline inline-flex items-center space-x-1">
              <span>Register Here</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};
