import os
import re

directories = ['src/pages', 'src/components']
skip_dirs = ['Admin', 'Auth', 'Dashboard', 'Instructor']

def process_file(filepath):
    with open(filepath, 'r') as f:
        c = f.read()

    original = c

    # 1. Scale headings
    c = c.replace('text-3xl sm:text-4xl', 'text-4xl sm:text-5xl')
    c = c.replace('text-3xl text-[#2B2521]', 'text-3xl md:text-4xl text-[#2B2521]')
    c = c.replace('text-2xl sm:text-3xl', 'text-3xl sm:text-4xl')
    c = c.replace('text-xl font-bold', 'text-2xl font-bold')

    # 2. Scale up uppercase labels/subheadings
    c = c.replace('text-xs font-bold text-[#B12B2B] uppercase', 'text-sm md:text-base font-bold text-[#B12B2B] uppercase')
    c = c.replace('text-xs sm:text-sm font-bold', 'text-sm sm:text-base font-bold')
    c = c.replace('text-sm font-bold text-[#B12B2B] uppercase', 'text-base font-bold text-[#B12B2B] uppercase')
    
    # 3. Body text scaling
    c = c.replace('text-xs text-[#5C5148]', 'text-sm md:text-base text-[#5C5148]')
    c = c.replace('text-sm text-[#5C5148]', 'text-base md:text-lg text-[#5C5148]')
    c = c.replace('text-sm sm:text-base text-[#5C5148]', 'text-base md:text-lg text-[#5C5148]')
    c = c.replace('text-base sm:text-lg text-[#5C5148]', 'text-lg md:text-xl text-[#5C5148]')
    
    # 4. Links and accents
    c = c.replace('text-sm text-[#B12B2B]', 'text-base text-[#B12B2B]')
    c = c.replace('text-xs font-bold text-[#B12B2B]', 'text-sm font-bold text-[#B12B2B]')
    c = c.replace('text-xs font-bold', 'text-sm font-bold')
    
    # 5. Tiny text
    c = c.replace('text-[11px]', 'text-sm')
    c = c.replace('text-[13px]', 'text-sm md:text-base')
    c = c.replace('text-[10px]', 'text-xs')
    c = c.replace('text-xs text-white/70', 'text-sm text-white/70')
    c = c.replace('text-xs text-white/80', 'text-sm text-white/80')

    # 6. Navbar and Footer specific
    c = c.replace('text-sm font-medium', 'text-base font-medium')
    c = c.replace('text-sm text-[#2B2521]', 'text-base text-[#2B2521]')
    c = c.replace('text-sm text-white/80', 'text-base text-white/80')
    
    if c != original:
        with open(filepath, 'w') as f:
            f.write(c)
        print(f"Updated: {filepath}")

for d in directories:
    for root, dirs, files in os.walk(d):
        # exclude skip_dirs
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for file in files:
            if file.endswith('.tsx'):
                process_file(os.path.join(root, file))

print("Done scaling fonts.")
