import React, { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api/adminApi';

export const Enrollments: React.FC = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getEnrollments({ page: pagination.page, limit: pagination.limit });
      setEnrollments(res.data.items);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [pagination.page, pagination.limit]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-bold">Enrollments</h2>
      </div>
      
      <div className="bg-white border rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700">Student</th>
              <th className="px-6 py-4 font-bold text-gray-700">Course</th>
              <th className="px-6 py-4 font-bold text-gray-700">Date</th>
              <th className="px-6 py-4 font-bold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading && enrollments.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : enrollments.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No enrollments found</td></tr>
            ) : (
              enrollments.map(enrollment => (
                <tr key={enrollment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{enrollment.user?.name || enrollment.user?.email || 'Unknown'}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{enrollment.course?.title || 'Unknown'}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${enrollment.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                      {enrollment.status}
                    </span>
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
