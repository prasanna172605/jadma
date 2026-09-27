with open('src/pages/Home.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if line.strip() == "))" and "</div>" in lines[i+1]:
        new_lines.append("            ))}\n")
    else:
        new_lines.append(line)

with open('src/pages/Home.tsx', 'w') as f:
    f.writelines(new_lines)
