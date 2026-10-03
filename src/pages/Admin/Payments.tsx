import React, { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api/adminApi';
import { Search, RotateCcw } from 'lucide-react';

export const Payments: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPayments({ page: pagination.page, limit: pagination.limit, merchantOrderId: search });
      setPayments(res.data.items);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [pagination.page, search]);

  const handleRefund = async (id: string, amount: number) => {
    if (!confirm(`Are you sure you want to refund ₹${amount}?`)) return;
    try {
      await adminApi.refundPayment(id);
      fetchPayments();
    } catch (err) {
      alert('Failed to refund payment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">Payments & Transactions</h2>
          <p className="text-xs text-gray-500 mt-0.5">Track real-time Razorpay orders and legacy transactions</p>
        </div>
        
        <div className="flex w-full sm:w-auto items-center space-x-2">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID / Payment ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-jadmaa-red"
            />
          </div>
          <button 
            onClick={fetchPayments}
            className="p-2 border rounded-lg hover:bg-gray-50 text-gray-600"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <>
        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5 font-bold text-gray-700">Order ID</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Gateway</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Student</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Course</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Amount</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Razorpay Payment ID</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Status</th>
                <th className="px-5 py-3.5 font-bold text-gray-700">Paid / Created At</th>
                <th className="px-5 py-3.5 font-bold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && payments.length === 0 ? (
                <tr><td colSpan={9} className="px-6 py-12 text-center text-gray-500">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={9} className="px-6 py-12 text-center text-gray-500">No payment records found</td></tr>
              ) : (
                payments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4 font-mono font-medium text-xs text-gray-900 select-all">
                      {payment.merchantOrderId}
                    </td>
                    <td className="px-5 py-4">
                      {payment.gateway === 'RAZORPAY' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Razorpay
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          PhonePe
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      <div className="font-medium text-gray-900">{payment.user?.name || 'Anonymous'}</div>
                      <div className="text-xs text-gray-400">{payment.user?.email}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-700 max-w-[200px]">
                      <div className="truncate font-medium" title={payment.course?.title}>
                        {payment.course?.title || 'Unknown Course'}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-900">
                      ₹{payment.amount?.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-600 select-all">
                      {payment.gatewayTransactionId ? (
                        <span className="text-emerald-700 font-semibold">{payment.gatewayTransactionId}</span>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full 
                        ${payment.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                          payment.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                          payment.status === 'REFUNDED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500">
                      {payment.paidAt ? (
                        <div>{new Date(payment.paidAt).toLocaleString()}</div>
                      ) : (
                        <div>{new Date(payment.createdAt).toLocaleString()}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {payment.status === 'SUCCESS' && (
                        <button 
                          onClick={() => handleRefund(payment.id, payment.amount)} 
                          className="text-jadmaa-red hover:underline font-medium text-xs px-2 py-1 rounded hover:bg-rose-50"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Card View */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {loading && payments.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white border rounded-xl shadow-sm">Loading...</div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white border rounded-xl shadow-sm">No payments found</div>
          ) : (
            payments.map(payment => (
              <div key={payment.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-800 break-all select-all">
                      {payment.merchantOrderId}
                    </span>
                    <div className="mt-1">
                      {payment.gateway === 'RAZORPAY' ? (
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                          Razorpay
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-purple-50 text-purple-700 rounded border border-purple-200">
                          PhonePe
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full shrink-0 
                    ${payment.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 
                      payment.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 
                      payment.status === 'REFUNDED' ? 'bg-blue-100 text-blue-800' :
                      'bg-rose-100 text-rose-800'}`}>
                    {payment.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{payment.user?.name || payment.user?.email || 'Unknown'}</h3>
                  <p className="text-xs text-gray-400">{payment.user?.email}</p>
                </div>
                
                <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Course:</span>
                    <span className="font-medium text-gray-900 truncate max-w-[200px]">{payment.course?.title || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-bold text-gray-900">₹{payment.amount}</span>
                  </div>
                  {payment.gatewayTransactionId && (
                    <div className="flex justify-between font-mono">
                      <span className="text-gray-400">Payment ID:</span>
                      <span className="text-emerald-700 select-all">{payment.gatewayTransactionId}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-200">
                    <span>Date:</span>
                    <span>{new Date(payment.paidAt || payment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {payment.status === 'SUCCESS' && (
                  <div className="flex justify-end space-x-2 pt-2 border-t mt-1">
                    <button 
                      onClick={() => handleRefund(payment.id, payment.amount)}
                      className="flex-1 flex items-center justify-center space-x-1 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition font-medium text-xs"
                    >
                      Refund Payment
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </>
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>Showing page {pagination.page} of {pagination.totalPages || 1} ({pagination.total} total)</div>
        <div className="flex space-x-2">
          <button disabled={pagination.page <= 1} onClick={() => setPagination({...pagination, page: pagination.page - 1})} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <button disabled={pagination.page >= pagination.totalPages} onClick={() => setPagination({...pagination, page: pagination.page + 1})} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};
export default Payments;
