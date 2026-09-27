with open('server/modules/progress/progress.routes.ts', 'r') as f:
    content = f.read()

content = content.replace("import { getCourseProgress, updateLessonProgress, getMyEnrollments } from './progress.controller.js';",
"import { getCourseProgress, updateLessonProgress, getMyEnrollments, getDashboard, getCertificates } from './progress.controller.js';")

new_routes = """
router.get('/dashboard', authenticate, getDashboard);
router.get('/certificates', authenticate, getCertificates);
"""
content = content.replace("router.get('/enrollments', authenticate, getMyEnrollments);", new_routes + "router.get('/enrollments', authenticate, getMyEnrollments);")

with open('server/modules/progress/progress.routes.ts', 'w') as f:
    f.write(content)
