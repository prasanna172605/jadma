import re

with open('src/context/AuthContext.tsx', 'r') as f:
    c = f.read()

# Replace the login logic
old_login = """      if (res.success && res.data) {
        localStorage.setItem('jadmaa_token', res.data.token);
        // fetch fresh user data to get enrollments
        const userRes = await authApi.getMe();
        let loggedInUser = res.data.user;
        if (userRes.data) {
          setUser(userRes.data);
          loggedInUser = userRes.data;
        } else {
          setUser(loggedInUser);
        }
        return loggedInUser;
      }"""

new_login = """      if (res.success && res.data) {
        localStorage.setItem('jadmaa_token', res.data.token);
        const loggedInUser = res.data.user;
        setUser(loggedInUser);
        return loggedInUser;
      }"""

if old_login in c:
    c = c.replace(old_login, new_login)
    with open('src/context/AuthContext.tsx', 'w') as f:
        f.write(c)
    print("AuthContext patched.")
else:
    print("Could not find the old login logic.")
