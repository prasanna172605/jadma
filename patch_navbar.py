with open('src/components/layout/Navbar.tsx', 'r') as f:
    c = f.read()

replacement = """
  const isStudent = isLoggedIn && user?.role === 'STUDENT';

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'my-courses', label: 'My Courses', href: '/my-courses' },
    { id: 'courses', label: 'Browse Courses', href: '/courses' },
    { id: 'certificates', label: 'Certificates', href: '/certificates' },
  ];

  const currentNavItems = isStudent ? studentNavItems : mainNavItems;
"""

c = c.replace("const { user, isLoggedIn, logout } = useAuth();", "const { user, isLoggedIn, logout } = useAuth();\n" + replacement)

c = c.replace("mainNavItems.map", "currentNavItems.map")

c = c.replace("""
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/dashboard"}
                  className="flex items-center space-x-1.5 text-sm font-semibold text-[#B12B2B] hover:underline"
                >
                  <User className="w-4 h-4" />
                  <span>Profile ({user?.name.split(' ')[0]})</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1 text-[#5C5148] hover:text-[#B12B2B] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )""", """
            {isLoggedIn ? (
              <div className="flex items-center space-x-6">
                <Link
                  to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/profile"}
                  className="flex items-center space-x-1.5 text-sm font-semibold text-gray-700 hover:text-jadmaa-red transition"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1.5 text-sm font-semibold text-gray-700 hover:text-jadmaa-red transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )""")

c = c.replace("""
          <div className="pt-3 border-t border-[#E8DDD0] space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/dashboard"}
                  className="block w-full text-center py-2 bg-[#B12B2B] text-white text-sm font-bold rounded"
                >
                  My Profile & Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-center py-2 text-sm font-bold text-[#5C5148] hover:text-[#B12B2B]"
                >
                  Logout
                </button>
              </>
            )""", """
          <div className="pt-3 border-t border-[#E8DDD0] space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  to={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/profile"}
                  className="block w-full text-center py-2 bg-[#B12B2B] text-white text-sm font-bold rounded"
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-center py-2 text-sm font-bold text-[#5C5148] hover:text-[#B12B2B]"
                >
                  Logout
                </button>
              </>
            )""")

with open('src/components/layout/Navbar.tsx', 'w') as f:
    f.write(c)
