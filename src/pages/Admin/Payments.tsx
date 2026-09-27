import React, { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api/adminApi';
import { Search } from 'lucide-react';

export const Payments: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

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
    const delayDebounceFn = setTimeout(() => {
      fetchPayments();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pagination.page, pagination.limit]);

  const handleRefund = async (id: string, amount: number) => {
    if (!window.confirm(`Are you sure you want to refund ₹${amount}? This action will record a refund and cannot be undone.`)) return;
    try {
      await adminApi.refundPayment(id);
      fetchPayments();
    } catch (err) {
      alert('Failed to refund payment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-bold">Payments</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Order ID..." 
            className="pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-jadmaa-red w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white border rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700">Order ID</th>
              <th className="px-6 py-4 font-bold text-gray-700">Student</th>
              <th className="px-6 py-4 font-bold text-gray-700">Course</th>
              <th className="px-6 py-4 font-bold text-gray-700">Amount</th>
              <th className="px-6 py-4 font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading && payments.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : payments.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No payments found</td></tr>
            ) : (
              payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-xs">{payment.merchantOrderId}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.user?.name || payment.user?.email || 'Unknown'}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{payment.course?.title || 'Unknown'}</td>
                  <td className="px-6 py-4 text-gray-600 font-bold">₹{payment.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full 
                      ${payment.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 
                        payment.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                        payment.status === 'REFUNDED' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {payment.status === 'SUCCESS' && (
                      <button onClick={() => handleRefund(payment.id, payment.amount)} className="text-jadmaa-red hover:underline font-medium text-xs">
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
