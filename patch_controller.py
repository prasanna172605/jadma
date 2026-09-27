import re

with open('server/modules/courses/course.controller.ts', 'r') as f:
    c = f.read()

# Replace mock rating and reviewCount in getCourses
c = c.replace(
    '      rating: 5.0, // Mock\n      reviewCount: 100, // Mock',
    '      rating: c.rating || 0,\n      reviewCount: c.reviewCount || 0,'
)

# Replace mock rating and reviewCount in getCourseBySlug
c = c.replace(
    '      rating: 5.0,\n      reviewCount: 100,',
    '      rating: course.rating || 0,\n      reviewCount: course.reviewCount || 0,'
)

with open('server/modules/courses/course.controller.ts', 'w') as f:
    f.write(c)
print("Course controller patched")
