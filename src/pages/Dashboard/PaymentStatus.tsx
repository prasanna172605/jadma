import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentApi } from '../../lib/api/paymentApi';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const PaymentStatus: React.FC = () => {
  const { merchantOrderId } = useParams<{ merchantOrderId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'PENDING' | 'SUCCESS' | 'FAILED' | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (!merchantOrderId) return;
      try {
        const res = await paymentApi.checkStatus(merchantOrderId);
        if (res.success && res.data) {
          setStatus(res.data.status);
          setCourseId(res.data.courseId);
        } else {
          setStatus('FAILED');
        }
      } catch (err) {
        setStatus('FAILED');
      }
    };
    
    checkStatus();
    // Re-check periodically if pending
    const interval = setInterval(() => {
      if (status === 'PENDING') {
        checkStatus();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [merchantOrderId, status]);

  return (
    <>
      <SEO title="Payment Status | JADMAA Varmakalai" />
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF6F0] py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#E8DDD0] shadow-md text-center space-y-6">
          
          {status === 'PENDING' || status === null ? (
            <>
              <Loader2 className="w-16 h-16 text-jadmaa-red animate-spin mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-jadmaa-charcoal">Verifying Payment...</h2>
              <p className="text-sm text-jadmaa-textMuted">Please wait while we confirm your payment transaction.</p>
            </>
          ) : status === 'SUCCESS' ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-jadmaa-charcoal">Payment Successful!</h2>
              <p className="text-sm text-jadmaa-textMuted">You are now enrolled in the course.</p>
              <button 
                onClick={() => navigate(`/learn/${courseId}`)}
                className="w-full py-3 bg-jadmaa-red text-white font-bold rounded-lg hover:bg-jadmaa-redDark transition-colors"
              >
                Go to Course
              </button>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-600 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-jadmaa-charcoal">Payment Failed</h2>
              <p className="text-sm text-jadmaa-textMuted">We could not process your payment. Please try again.</p>
              <button 
                onClick={() => navigate('/courses')}
                className="w-full py-3 bg-gray-200 text-jadmaa-charcoal font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Return to Courses
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
};
