with open('src/pages/Dashboard/StudentProfile.tsx', 'r') as f:
    c = f.read()

import_str = """import { User, Mail, Phone, Lock, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchApi } from '../../lib/api/apiClient';
import { authApi } from '../../lib/api/authApi';"""

c = c.replace("import { fetchApi } from '../../lib/api/apiClient';", import_str)


states_and_funcs = """  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError("New passwords do not match.");
      return;
    }
    setPassLoading(true);
    setPassError(null);
    setPassSuccess(null);
    try {
      const res = await authApi.changePassword({ currentPassword, newPassword, confirmPassword });
      setPassSuccess(res.message || "Password changed successfully.");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPassError(err.message || 'Failed to change password');
    } finally {
      setPassLoading(false);
    }
  };"""

c = c.replace("  const [loading, setLoading] = useState(true);\n  const [profile, setProfile] = useState<any>(null);", states_and_funcs)

password_form = """
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Security & Login
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input type="email" disabled value={profile?.email || ''} className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded cursor-not-allowed" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly.</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100 mt-6">
                   <h4 className="text-sm font-bold text-gray-900 mb-4">Change Password</h4>
                   
                   {passError && <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 border border-red-100">{passError}</div>}
                   {passSuccess && <div className="bg-green-50 text-green-700 p-3 rounded text-sm mb-4 border border-green-100">{passSuccess}</div>}
                   
                   <form className="space-y-4" onSubmit={handleChangePassword}>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                       <input 
                         type="password" 
                         required
                         value={currentPassword}
                         onChange={(e) => setCurrentPassword(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-jadmaa-red focus:border-jadmaa-red" 
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                       <input 
                         type="password" 
                         required
                         value={newPassword}
                         onChange={(e) => setNewPassword(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-jadmaa-red focus:border-jadmaa-red" 
                         placeholder="Min 8 chars, 1 uppercase, 1 number"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                       <input 
                         type="password" 
                         required
                         value={confirmPassword}
                         onChange={(e) => setConfirmPassword(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-jadmaa-red focus:border-jadmaa-red" 
                       />
                     </div>
                     <div className="pt-2">
                       <button type="submit" disabled={passLoading} className="px-5 py-2.5 bg-gray-900 text-white font-semibold rounded text-sm hover:bg-gray-800 transition disabled:opacity-50">
                         {passLoading ? 'Changing...' : 'Change Password'}
                       </button>
                     </div>
                   </form>
                </div>
              </div>
            </div>"""

c = c.replace("""
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Security & Login
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input type="email" disabled defaultValue={profile?.email} className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded cursor-not-allowed" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly.</p>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-4">
                   <h4 className="text-sm font-bold text-gray-900 mb-3">Change Password</h4>
                   <button type="button" className="px-5 py-2 border border-gray-300 text-gray-700 font-semibold rounded text-sm hover:border-gray-400 transition">
                     Request Password Reset
                   </button>
                </div>
              </div>
            </div>""", password_form)

with open('src/pages/Dashboard/StudentProfile.tsx', 'w') as f:
    f.write(c)
