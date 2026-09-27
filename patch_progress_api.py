with open('src/lib/api/progressApi.ts', 'r') as f:
    c = f.read()

c = c.replace("export const progressApi = {", "export const progressApi = {\n  getDashboard: async () => {\n    return fetchApi('/me/dashboard');\n  },\n  getCertificates: async () => {\n    return fetchApi('/me/certificates');\n  },")

with open('src/lib/api/progressApi.ts', 'w') as f:
    f.write(c)
