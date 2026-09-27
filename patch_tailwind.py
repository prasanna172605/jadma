import sys

with open('tailwind.config.js', 'r') as f:
    content = f.read()

content = content.replace(
    'float: "jdHeroFloat 4s ease-in-out infinite",',
    'float: "jdHeroFloat 4s ease-in-out infinite",\n        marquee: "marquee 40s linear infinite",'
)

content = content.replace(
    '"50%": { transform: "translateY(-10px)" },\n        }',
    '"50%": { transform: "translateY(-10px)" },\n        },\n        marquee: {\n          "0%": { transform: "translateX(0%)" },\n          "100%": { transform: "translateX(-50%)" },\n        }'
)

with open('tailwind.config.js', 'w') as f:
    f.write(content)
