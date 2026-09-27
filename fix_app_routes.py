with open('src/routes/AppRoutes.tsx', 'r') as f:
    c = f.read()

c = c.replace("import { ForgotPassword } from '../pages/Auth/ForgotPassword';\nimport { ResetPassword } from '../pages/Auth/ResetPassword';\nimport { ForgotPassword } from '../pages/Auth/ForgotPassword';", "import { ForgotPassword } from '../pages/Auth/ForgotPassword';\nimport { ResetPassword } from '../pages/Auth/ResetPassword';")
c = c.replace('<Route path="/forgot-password" element={<ForgotPassword />} />\n        <Route path="/reset-password" element={<ResetPassword />} />\n        <Route path="/forgot-password" element={<ForgotPassword />} />', '<Route path="/forgot-password" element={<ForgotPassword />} />\n        <Route path="/reset-password" element={<ResetPassword />} />')

with open('src/routes/AppRoutes.tsx', 'w') as f:
    f.write(c)
