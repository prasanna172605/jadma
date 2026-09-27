import re

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

# Increase tracking/uppercase labels
c = c.replace('text-xs font-bold', 'text-sm font-bold')
c = c.replace('text-xs sm:text-sm font-bold', 'text-sm sm:text-base font-bold')

# Increase body texts
c = c.replace('text-xs text-[#5C5148]', 'text-sm sm:text-base text-[#5C5148]')
c = c.replace('text-sm text-[#5C5148]', 'text-base sm:text-lg text-[#5C5148]')

# Increase other tiny texts
c = c.replace('text-[11px]', 'text-xs')
c = c.replace('text-xs font-bold text-[#2B2521]', 'text-sm font-bold text-[#2B2521]')

# Fix the image
img_pattern = r'<img\s+src="/images/hero-kick-action-386x1024\.jpg"\s+alt="Varmakalai Practitioner Stance"\s+className="max-h-\[500px\] lg:max-h-\[540px\] w-auto object-contain object-bottom drop-shadow-md animate-jadmaa-float mix-blend-multiply"\s+/>'
img_replacement = '''<img 
                  src="/images/hero-kick-action-386x1024.jpg" 
                  alt="Varmakalai Practitioner Stance" 
                  className="max-h-[500px] lg:max-h-[600px] xl:max-h-[650px] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(177,43,43,0.25)] hover:scale-105 transition-transform duration-700 ease-out"
                />'''
c = re.sub(img_pattern, img_replacement, c)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)

print("Font sizes and image updated")
