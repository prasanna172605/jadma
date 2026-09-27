import re

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

# Make hero title slightly bigger
c = c.replace('text-3xl sm:text-5xl lg:text-[54px]', 'text-4xl sm:text-6xl lg:text-[64px]')

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)

print("Hero title updated")
