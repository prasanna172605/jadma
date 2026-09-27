import React, { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api/adminApi';
import { Search } from 'lucide-react';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCourses({ page: pagination.page, limit: pagination.limit, search });
      setCourses(res.data.items);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourses();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pagination.page, pagination.limit]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-heading font-bold">Courses</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search courses..." 
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
              <th className="px-6 py-4 font-bold text-gray-700">Title</th>
              <th className="px-6 py-4 font-bold text-gray-700">Instructor</th>
              <th className="px-6 py-4 font-bold text-gray-700">Price</th>
              <th className="px-6 py-4 font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 font-bold text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading && courses.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : courses.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No courses found</td></tr>
            ) : (
              courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{course.title}</td>
                  <td className="px-6 py-4 text-gray-600">{course.instructor?.displayName || 'Unknown'}</td>
                  <td className="px-6 py-4 text-gray-600">₹{course.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${course.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>Showing page {pagination.page} of {pagination.totalPages || 1} ({pagination.total} total)</div>
        <div className="flex space-x-2">
          <button 
            disabled={pagination.page <= 1} 
            onClick={() => setPagination({...pagination, page: pagination.page - 1})}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Prev</button>
          <button 
            disabled={pagination.page >= pagination.totalPages} 
            onClick={() => setPagination({...pagination, page: pagination.page + 1})}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Next</button>
        </div>
      </div>
    </div>
  );
};
