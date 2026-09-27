with open('src/pages/Home.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if line.strip() == "</div>" and "</div>" in lines[i+1] and "</div>" in lines[i+2] and "</section>" in lines[i+3]:
        # we have 3 divs before section, meaning we found our spot.
        # But wait, there are two such spots:
        # 1. Featured courses
        # 2. Branch locations
        # If we skip one of them, it balances the tree.
        pass
    else:
        new_lines.append(line)

# Let's just do a simpler search and replace for the exact pattern
