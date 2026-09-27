import re

with open('src/index.css', 'r') as f:
    css = f.read()

# Replace the entire @layer base block
pattern = r"@layer base \{.*?\}(?=\n/\* ==========================================)"

new_base = """@layer base {
  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }
  body {
    font-family: 'Work Sans', sans-serif;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.65;
    color: #5C5148;
    background-color: #FAF6F0;
    margin: 0;
    padding: 0;
    overflow-x: clip;
  }
  p {
    font-size: 1.125rem;
    line-height: 1.65;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800;
    color: #2B2521;
    margin: 0;
    line-height: 1.2;
  }
}"""

css = re.sub(pattern, new_base, css, flags=re.DOTALL)

with open('src/index.css', 'w') as f:
    f.write(css)
print("Regex patch applied")
