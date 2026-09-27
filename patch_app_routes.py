with open('src/routes/AppRoutes.tsx', 'r') as f:
    content = f.read()

imports = """import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ForgotPassword } from '../pages/Auth/ForgotPassword';
import { ResetPassword } from '../pages/Auth/ResetPassword';"""

content = content.replace("import { Login } from '../pages/Auth/Login';\nimport { Register } from '../pages/Auth/Register';", imports)

routes = """        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />"""

content = content.replace('        <Route path="/login" element={<Login />} />\n        <Route path="/register" element={<Register />} />', routes)

with open('src/routes/AppRoutes.tsx', 'w') as f:
    f.write(content)
