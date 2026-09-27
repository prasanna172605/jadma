import sys

with open('src/index.css', 'r') as f:
    css = f.read()

start_idx = css.find("@layer base {")
end_idx = css.find("}", css.find("}", css.find("}", start_idx) + 1) + 1) + 1 # It has 3 nested blocks? html, body, h1

# Actually let's just find the end of @layer base { ... }
# We can find the exact text:
old_str = """@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Work Sans', sans-serif;
    color: #5C5148;
    background-color: #FAF6F0;
    margin: 0;
    padding: 0;
    overflow-x: clip;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bricolage Grotesque', sans-serif;
    color: #2B2521;
    margin: 0;
  }
}"""

# Try just standard replace, but ignoring whitespace differences by using re
import re
pattern = r"@layer base\s*\{.*?\}(?=\s*/\* ==========================================)"

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
print("Regex patch 3 applied")
