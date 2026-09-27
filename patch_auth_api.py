with open('src/lib/api/authApi.ts', 'r') as f:
    content = f.read()

new_methods = """
  forgotPassword: async (email: string) => {
    return fetchApi('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  resetPassword: async (data: any) => {
    return fetchApi('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  changePassword: async (data: any) => {
    return fetchApi('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};"""

content = content.replace("};", new_methods)

with open('src/lib/api/authApi.ts', 'w') as f:
    f.write(content)
