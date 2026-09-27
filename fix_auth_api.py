with open('src/lib/api/authApi.ts', 'r') as f:
    c = f.read()
c = c.replace("  getMe: async () => {\n    return fetchApi('/auth/me');\n  }\n  forgotPassword", "  getMe: async () => {\n    return fetchApi('/auth/me');\n  },\n  forgotPassword")
with open('src/lib/api/authApi.ts', 'w') as f:
    f.write(c)
