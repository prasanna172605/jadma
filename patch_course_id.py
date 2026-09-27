import re

with open('server/modules/courses/course.controller.ts', 'r') as f:
    c = f.read()

find_unique = """    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(slug);
    const course = await prisma.course.findUnique({
      where: isUUID ? { id: slug } : { slug: slug },
      include: {
        instructor: { select: { displayName: true, title: true, avatarUrl: true, bio: true } },
        modules: {
          include: { lessons: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });"""

c = re.sub(
    r"const course = await prisma\.course\.findUnique\(\{\s+where: \{ slug: req\.params\.slug \},\s+include: \{\s+instructor: \{ select: \{ displayName: true, title: true, avatarUrl: true, bio: true \} \},\s+modules: \{\s+include: \{ lessons: \{ orderBy: \{ sortOrder: 'asc' \} \} \},\s+orderBy: \{ sortOrder: 'asc' \}\s+\}\s+\}\s+\}\);",
    find_unique,
    c
)

with open('server/modules/courses/course.controller.ts', 'w') as f:
    f.write(c)

print("Course ID lookup patched.")
