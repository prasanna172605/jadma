import re

with open('src/pages/Dashboard/LearnCourse.tsx', 'r') as f:
    c = f.read()

c = c.replace('console.error("Failed to load course", err);', '')

with open('src/pages/Dashboard/LearnCourse.tsx', 'w') as f:
    f.write(c)

print("LearnCourse console error removed.")
