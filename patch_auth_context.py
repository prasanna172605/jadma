import re

with open('src/context/AuthContext.tsx', 'r') as f:
    c = f.read()

c = c.replace('console.error("Login failed:", err);', '')
c = c.replace('console.error("Registration failed:", err);', '')

with open('src/context/AuthContext.tsx', 'w') as f:
    f.write(c)

print("AuthContext console errors removed.")
