import sys

with open('src/index.css', 'r') as f:
    css = f.read()

base_layer_old = """@layer base {
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

base_layer_new = """@layer base {
  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }
  body {
    font-family: 'Work Sans', sans-serif;
    font-size: 1.125rem; /* 18px */
    font-weight: 400;
    line-height: 1.65;
    color: #5C5148;
    background-color: #FAF6F0;
    margin: 0;
    padding: 0;
    overflow-x: clip;
  }
  p {
    font-size: 1.125rem; /* 18px for standard text */
    line-height: 1.65;
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800; /* Bold/Extrabold weight for headers */
    color: #2B2521;
    margin: 0;
    line-height: 1.2;
  }
}"""

css = css.replace(base_layer_old, base_layer_new)

with open('src/index.css', 'w') as f:
    f.write(css)

print("index.css updated")
