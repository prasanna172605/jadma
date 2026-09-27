with open('src/routes/AppRoutes.tsx', 'r') as f:
    c = f.read()

c = c.replace("import { StudentDashboard } from '../pages/Dashboard/StudentDashboard';",
"import { StudentDashboard } from '../pages/Dashboard/StudentDashboard';\nimport { StudentProfile } from '../pages/Dashboard/StudentProfile';")

c = c.replace('<Route path="/profile" element={<StudentDashboard />} />',
'<Route path="/profile" element={<StudentProfile />} />')

with open('src/routes/AppRoutes.tsx', 'w') as f:
    f.write(c)
