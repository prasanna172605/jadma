with open('src/pages/Dashboard/StudentProfile.tsx', 'r') as f:
    c = f.read()
    
c = c.replace("import { User, Mail, Phone, Lock, CheckCircle, Clock } from 'lucide-react';\nimport { useAuth } from '../../context/AuthContext';\nimport { User, Mail, Phone, Lock, CheckCircle, Clock } from 'lucide-react';\nimport { useAuth } from '../../context/AuthContext';", "import { User, Mail, Phone, Lock, CheckCircle, Clock } from 'lucide-react';\nimport { useAuth } from '../../context/AuthContext';")

with open('src/pages/Dashboard/StudentProfile.tsx', 'w') as f:
    f.write(c)
