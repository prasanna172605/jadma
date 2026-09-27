import sys

with open('src/pages/Home.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if "              ))} " in line and "</div>" in lines[i+1]:
        # Actually it's:
        #               ))}
        #             </div>
        pass
    new_lines.append(line)
