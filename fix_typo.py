import os
import re

directories = ['src/pages', 'src/components']
skip_dirs = ['Admin', 'Auth', 'Dashboard', 'Instructor']

for d in directories:
    for root, dirs, files in os.walk(d):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    c = f.read()
                
                new_c = c.replace('text-3xl md:text-4xl md:text-5xl', 'text-4xl md:text-5xl')
                new_c = new_c.replace('text-4xl md:text-5xl md:text-5xl', 'text-4xl md:text-5xl')
                new_c = new_c.replace('text-2xl md:text-3xl md:text-4xl', 'text-3xl md:text-4xl')
                new_c = new_c.replace('text-sm md:text-base md:text-lg', 'text-base md:text-lg')
                new_c = new_c.replace('text-base md:text-lg md:text-xl', 'text-lg md:text-xl')
                new_c = new_c.replace('text-base md:text-lg md:text-lg', 'text-base md:text-lg')
                new_c = new_c.replace('text-sm md:text-base md:text-base', 'text-sm md:text-base')

                if new_c != c:
                    with open(filepath, 'w') as f:
                        f.write(new_c)
                    print(f"Fixed typo in: {filepath}")

