import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { authApi } from '../../lib/api/authApi';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await authApi.forgotPassword(email);
      setSuccess(true);
      setMessage(res.message || "If an account exists with this email, password reset instructions have been sent.");
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Forgot Password | JADMAA LMS" />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center mb-6">
            <img src="/images/logo-1.png" alt="JADMAA" className="h-16 w-auto" />
          </Link>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 font-heading">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your registered email address to receive reset instructions.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
            
            {success ? (
               <div className="text-center space-y-4">
                 <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                 <h3 className="text-lg font-bold text-gray-900">Check your email</h3>
                 <p className="text-sm text-gray-500">{message}</p>
                 <div className="pt-4">
                   <Link to="/login" className="text-jadmaa-red font-bold hover:underline">
                     Return to login
                   </Link>
                 </div>
               </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm text-center">
                    <p>{error}</p>
                    {error.toLowerCase().includes("register") && (
                      <div className="mt-2">
                        <Link to="/register" className="font-bold underline text-red-700 hover:text-red-900 block mt-1">
                          Click here to Register Now &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-jadmaa-red focus:border-jadmaa-red block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jadmaa-red hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jadmaa-red transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
            
            {!success && (
              <div className="mt-6 text-center">
                <Link to="/login" className="inline-flex items-center gap-1 text-sm font-semibold text-jadmaa-red hover:text-red-800">
                  <ArrowLeft className="w-4 h-4" /> Back to login
                </Link>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};
