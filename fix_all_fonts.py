import os
import re

directories = ['src/pages', 'src/components']
skip_dirs = ['Admin', 'Auth', 'Dashboard', 'Instructor']

def replace_classes(content):
    c = content
    # For jadmaa-textMuted
    c = c.replace('text-xs text-jadmaa-textMuted', 'text-sm md:text-base text-jadmaa-textMuted')
    c = c.replace('text-sm text-jadmaa-textMuted', 'text-base md:text-lg text-jadmaa-textMuted')
    c = c.replace('text-base text-jadmaa-textMuted', 'text-lg md:text-xl text-jadmaa-textMuted')
    c = c.replace('text-sm sm:text-base text-jadmaa-textMuted', 'text-base md:text-lg text-jadmaa-textMuted')
    c = c.replace('text-base sm:text-lg text-jadmaa-textMuted', 'text-lg md:text-xl text-jadmaa-textMuted')

    # For jadmaa-red tags
    c = c.replace('text-xs font-bold text-jadmaa-red', 'text-sm md:text-base font-bold text-jadmaa-text-jadmaa-red')
    # wait typo
    c = c.replace('text-jadmaa-text-jadmaa-red', 'text-jadmaa-red')

    c = c.replace('text-sm font-bold text-jadmaa-red', 'text-base md:text-lg font-bold text-jadmaa-red')

    # General text colors (charcoal)
    c = c.replace('text-sm text-jadmaa-charcoal', 'text-base md:text-lg text-jadmaa-charcoal')
    c = c.replace('text-xs text-jadmaa-charcoal', 'text-sm md:text-base text-jadmaa-charcoal')
    c = c.replace('text-base text-jadmaa-charcoal', 'text-lg text-jadmaa-charcoal')
    
    # Headings
    c = c.replace('text-3xl text-jadmaa-charcoal', 'text-3xl md:text-4xl text-jadmaa-charcoal')
    c = c.replace('text-4xl text-jadmaa-charcoal', 'text-4xl md:text-5xl text-jadmaa-charcoal')
    c = c.replace('text-2xl text-jadmaa-charcoal', 'text-2xl md:text-3xl text-jadmaa-charcoal')
    c = c.replace('text-xl font-bold', 'text-xl md:text-2xl font-bold')
    
    # Text-gray (for dark mode or footer cards)
    c = c.replace('text-sm text-gray-500', 'text-base text-gray-500')
    c = c.replace('text-sm text-gray-600', 'text-base text-gray-600')
    c = c.replace('text-xs text-gray-500', 'text-sm text-gray-500')

    # specific tags
    c = c.replace('text-sm font-medium', 'text-base md:text-lg font-medium')
    c = c.replace('text-xs font-medium', 'text-sm md:text-base font-medium')

    return c

for d in directories:
    for root, dirs, files in os.walk(d):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    c = f.read()
                
                new_c = replace_classes(c)
                if new_c != c:
                    with open(filepath, 'w') as f:
                        f.write(new_c)
                    print(f"Updated: {filepath}")

print("Done fixing fonts.")
