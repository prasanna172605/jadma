import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentApi } from '../../lib/api/paymentApi';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const PaymentStatus: React.FC = () => {
  const { merchantOrderId } = useParams<{ merchantOrderId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (!merchantOrderId) return;

    let isMounted = true;
    const startTime = Date.now();
    const MAX_POLL_DURATION_MS = 5 * 60 * 1000; // 5 minutes

    const checkStatus = async () => {
      try {
        const res = await paymentApi.checkStatus(merchantOrderId);
        if (!isMounted) return;

        if (res.success && res.data) {
          const currentStatus = res.data.status as 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
          setStatus(currentStatus);
          if (res.data.courseId) {
            setCourseId(res.data.courseId);
          }

          if (currentStatus === 'SUCCESS') {
            try {
              sessionStorage.removeItem('jadmaa_enrollments_cache');
              sessionStorage.removeItem('jadmaa_dashboard_cache');
            } catch {
              // ignore storage errors
            }
          }
        }
      } catch (err) {
        console.warn('[PaymentStatus] Check error:', err);
      }
    };

    checkStatus();

    const interval = setInterval(() => {
      if (Date.now() - startTime > MAX_POLL_DURATION_MS) {
        clearInterval(interval);
        return;
      }
      // Stop polling once reached a terminal state
      if (status === 'SUCCESS' || status === 'FAILED' || status === 'CANCELLED' || status === 'REFUNDED') {
        clearInterval(interval);
        return;
      }
      checkStatus();
    }, 2500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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
              <p className="text-sm text-jadmaa-textMuted">Please wait while we confirm your payment transaction securely.</p>
            </>
          ) : status === 'SUCCESS' ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-jadmaa-charcoal">Payment Successful!</h2>
              <p className="text-sm text-jadmaa-textMuted">You are now enrolled in the course. Start learning right away!</p>
              <button 
                onClick={() => navigate(courseId ? `/learn/${courseId}` : '/dashboard/my-courses')}
                className="w-full py-3 bg-jadmaa-red text-white font-bold rounded-lg hover:bg-jadmaa-redDark transition-colors shadow-sm"
              >
                Go to Course
              </button>
            </>
          ) : status === 'CANCELLED' ? (
            <>
              <XCircle className="w-16 h-16 text-amber-600 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-jadmaa-charcoal">Payment Cancelled</h2>
              <p className="text-sm text-jadmaa-textMuted">The transaction was cancelled. No amount was deducted.</p>
              <button 
                onClick={() => navigate(courseId ? `/courses/${courseId}` : '/courses')}
                className="w-full py-3 bg-jadmaa-charcoal text-white font-bold rounded-lg hover:bg-black transition-colors"
              >
                Return to Course & Pay Again
              </button>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-600 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-jadmaa-charcoal">Payment Failed</h2>
              <p className="text-sm text-jadmaa-textMuted">We could not confirm your payment. If money was debited, it will be refunded automatically by your bank.</p>
              <button 
                onClick={() => navigate(courseId ? `/courses/${courseId}` : '/courses')}
                className="w-full py-3 bg-jadmaa-red text-white font-bold rounded-lg hover:bg-jadmaa-redDark transition-colors"
              >
                Try Again
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
};
