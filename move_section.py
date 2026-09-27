import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Extract featured courses section
featured_start = content.find('      {/* 4. FEATURED COURSES SECTION */}')
featured_end = content.find('      {/* 5. VARMA WELLNESS & TRADITIONAL THERAPY SECTION */}')

featured_section = content[featured_start:featured_end]

# Remove featured section from its original place
new_content = content[:featured_start] + content[featured_end:]

# Find Branch Locations section
branch_start = new_content.find('      {/* 8. BRANCH LOCATIONS SECTION */}')

# Insert featured section before Branch Locations
new_content = new_content[:branch_start] + featured_section + new_content[branch_start:]

# Renumber the comments if we want to be neat (optional, but good)
new_content = new_content.replace('{/* 5. VARMA WELLNESS & TRADITIONAL THERAPY SECTION */}', '{/* 4. VARMA WELLNESS & TRADITIONAL THERAPY SECTION */}')
new_content = new_content.replace('{/* 6. TRAINING AT JADMAA SECTION */}', '{/* 5. TRAINING AT JADMAA SECTION */}')
new_content = new_content.replace('{/* 7. GROWTH & LEADERSHIP SECTION */}', '{/* 6. GROWTH & LEADERSHIP SECTION */}')
new_content = new_content.replace('{/* 4. FEATURED COURSES SECTION */}', '{/* 7. FEATURED COURSES SECTION */}')


with open('src/pages/Home.tsx', 'w') as f:
    f.write(new_content)
print("Done moving section")
