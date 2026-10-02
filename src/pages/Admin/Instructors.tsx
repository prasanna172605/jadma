import React, { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api/adminApi';
import { Search, Plus, X } from 'lucide-react';

export const Instructors: React.FC = () => {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    displayName: '',
    title: '',
    specialization: '',
    experience: ''
  });
  const [submitError, setSubmitError] = useState('');

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getInstructors({ page: pagination.page, limit: pagination.limit, search });
      setInstructors(res.data.items);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInstructors();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pagination.page, pagination.limit]);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this instructor?`)) return;
    try {
      await adminApi.updateInstructorStatus(id, !currentStatus);
      fetchInstructors();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleCreateInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    try {
      await adminApi.createInstructor(formData);
      setIsModalOpen(false);
      setFormData({
        name: '', email: '', phone: '', password: '', displayName: '', title: '', specialization: '', experience: ''
      });
      fetchInstructors();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to create instructor');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-heading font-bold">Instructors</h2>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search instructors..." 
              className="pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-jadmaa-red w-full sm:w-64"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 bg-jadmaa-red text-white text-sm font-bold rounded hover:bg-red-800 transition-colors shrink-0 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Instructor
          </button>
        </div>
      </div>
      
      <>
        {/* Desktop Table View */}
        <div className="hidden md:block bg-white border rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">Display Name</th>
                <th className="px-6 py-4 font-bold text-gray-700">Title</th>
                <th className="px-6 py-4 font-bold text-gray-700">Joined</th>
                <th className="px-6 py-4 font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading && instructors.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : instructors.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No instructors found</td></tr>
              ) : (
                instructors.map(instructor => (
                  <tr key={instructor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{instructor.displayName}</td>
                    <td className="px-6 py-4 text-gray-600">{instructor.title || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(instructor.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${instructor.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {instructor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {!instructor.user?.isAdmin && instructor.user?.role !== 'SUPER_ADMIN' ? (
                        <button onClick={() => toggleStatus(instructor.id, instructor.isActive)} className="text-jadmaa-red hover:underline font-medium text-xs">
                          {instructor.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Protected (Admin)</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid View */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {loading && instructors.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white border rounded-xl shadow-sm">Loading...</div>
          ) : instructors.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white border rounded-xl shadow-sm">No instructors found</div>
          ) : (
            instructors.map(instructor => (
              <div key={instructor.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-gray-900 leading-tight">{instructor.displayName}</h3>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-full shrink-0 ${instructor.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {instructor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="block text-xs text-gray-400 font-bold uppercase mb-0.5">Title</span>
                    {instructor.title || '-'}
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-bold uppercase mb-0.5">Joined</span>
                    {new Date(instructor.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-3 border-t mt-2">
                  {!instructor.user?.isAdmin && instructor.user?.role !== 'SUPER_ADMIN' ? (
                    <button 
                      onClick={() => toggleStatus(instructor.id, instructor.isActive)}
                      className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg transition font-medium text-sm ${instructor.isActive ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}
                    >
                      <span>{instructor.isActive ? 'Deactivate' : 'Activate'}</span>
                    </button>
                  ) : (
                    <div className="flex-1 text-center py-2 text-gray-400 text-xs italic bg-gray-50 rounded-lg">Protected (Admin)</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </>
      
      {/* Pagination */}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-bold text-lg font-heading">Add New Instructor</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateInstructor} className="p-6 space-y-4">
              {submitError && (
                <div className="bg-red-50 text-red-700 p-3 rounded text-sm">
                  {submitError}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Full Name *</label>
                  <input required type="text" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Display Name</label>
                  <input type="text" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Email *</label>
                  <input required type="email" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Phone</label>
                  <input type="text" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Temporary Password *</label>
                <input required type="password" placeholder="Min 6 characters" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Title</label>
                <input type="text" placeholder="e.g. Master Instructor, Yoga Expert" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Specialization</label>
                  <input type="text" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Experience</label>
                  <input type="text" placeholder="e.g. 10 Years" className="w-full px-3 py-2 border rounded focus:border-jadmaa-red focus:ring-1 focus:ring-jadmaa-red" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-jadmaa-charcoal text-white rounded font-bold hover:bg-gray-900">Create Instructor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
