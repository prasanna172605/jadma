with open('src/pages/Auth/Login.tsx', 'r') as f:
    c = f.read()

c = c.replace(
"""                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#B12B2B] focus:ring-[#B12B2B] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                </div>""",
"""                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-jadmaa-red focus:ring-jadmaa-red border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-semibold text-jadmaa-red hover:text-red-800">
                      Forgot your password?
                    </Link>
                  </div>
                </div>"""
)

with open('src/pages/Auth/Login.tsx', 'w') as f:
    f.write(c)
