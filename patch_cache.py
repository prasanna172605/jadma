import re

with open('server/modules/courses/course.controller.ts', 'r') as f:
    c = f.read()

cache_code = """
let coursesCache: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export const getCourses = async (req: Request, res: Response) => {
  try {
    if (coursesCache && Date.now() - lastCacheTime < CACHE_TTL) {
      return res.json({ success: true, data: coursesCache });
    }
"""

c = c.replace('export const getCourses = async (req: Request, res: Response) => {\n  try {', cache_code)

cache_set = """
    coursesCache = formatted;
    lastCacheTime = Date.now();

    res.json({ success: true, data: formatted });
"""
c = c.replace('    res.json({ success: true, data: formatted });', cache_set, 1)

with open('server/modules/courses/course.controller.ts', 'w') as f:
    f.write(c)

print("Course caching applied.")
