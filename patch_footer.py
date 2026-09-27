import re

with open('src/components/layout/Footer.tsx', 'r') as f:
    c = f.read()

c = c.replace('text-xs text-gray-400', 'text-sm text-gray-400')
c = c.replace('text-gray-300 text-sm', 'text-gray-300 text-base')
c = c.replace('text-sm text-gray-300', 'text-base text-gray-300')
c = c.replace('text-xs text-gray-300', 'text-sm text-gray-300')
c = c.replace('text-base text-white border-b', 'text-lg text-white border-b')

with open('src/components/layout/Footer.tsx', 'w') as f:
    f.write(c)
