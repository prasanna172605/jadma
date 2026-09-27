import re

with open('server/modules/auth/auth.controller.ts', 'r') as f:
    c = f.read()

find_unique = """    const user = await prisma.user.findUnique({ 
      where: { email: validated.email },
      include: { enrollments: { select: { courseId: true } } }
    });"""

c = re.sub(
    r"const user = await prisma\.user\.findUnique\(\{ where: \{ email: validated\.email \} \}\);",
    find_unique,
    c
)

update_query = """    prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    }).catch(console.error);"""

c = re.sub(
    r"await prisma\.user\.update\(\{\s+where: \{ id: user\.id \},\s+data: \{ lastLoginAt: new Date\(\) \}\s+\}\);",
    update_query,
    c
)

return_json = """    res.json({ 
      success: true, 
      data: { 
        token: accessToken,
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          avatarUrl: user.avatarUrl,
          enrolledCourses: user.enrollments.map(e => e.courseId) 
        } 
      } 
    });"""

c = re.sub(
    r"res\.json\(\{\s+success: true,\s+data: \{\s+token: accessToken,[^}]+user: \{ id: user\.id, name: user\.name, email: user\.email, role: user\.role \}\s+\}\s+\}\);",
    return_json,
    c
)

with open('server/modules/auth/auth.controller.ts', 'w') as f:
    f.write(c)

print("Auth controller patched.")
