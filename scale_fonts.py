import re

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

# Scale up tracking/uppercase labels
c = c.replace('text-sm font-bold text-[#B12B2B] uppercase', 'text-sm md:text-base font-bold text-[#B12B2B] uppercase')
c = c.replace('text-sm sm:text-base font-bold tracking-wider', 'text-base font-bold tracking-wider')

# Scale up regular texts
c = c.replace('text-sm sm:text-base text-[#5C5148]', 'text-base md:text-lg text-[#5C5148]')
c = c.replace('text-base sm:text-lg text-[#5C5148]', 'text-lg md:text-xl text-[#5C5148]')
c = c.replace('text-base sm:text-lg leading-[1.65]', 'text-lg md:text-xl leading-[1.65]')

# Special small texts
c = c.replace('text-xs text-[#5C5148] italic', 'text-sm text-[#5C5148] italic')
c = c.replace('text-xs text-[#5C5148]', 'text-sm md:text-base text-[#5C5148]')
c = c.replace('text-xs uppercase', 'text-sm uppercase')
c = c.replace('text-xs font-bold text-[#B12B2B]', 'text-sm font-bold text-[#B12B2B]')

# Links
c = c.replace('text-sm text-[#B12B2B] hover:text-[#8C1E1E]', 'text-base text-[#B12B2B] hover:text-[#8C1E1E]')

# Avatar letters
c = c.replace('font-bold text-xs', 'font-bold text-sm')

# Heading fixes (some might need scaling)
# Hero heading is currently text-4xl sm:text-6xl lg:text-[64px]
# Other headings: text-3xl
c = c.replace('text-3xl text-[#2B2521]', 'text-3xl md:text-4xl text-[#2B2521]')

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)

print("Home.tsx fonts scaled up")
