import re

with open('server/modules/courses/course.controller.ts', 'r') as f:
    c = f.read()

cache_code = """
const slugCache: Record<string, {data: any, time: number}> = {};

export const getCourseBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    if (slugCache[slug] && Date.now() - slugCache[slug].time < CACHE_TTL) {
      return res.json({ success: true, data: slugCache[slug].data });
    }
"""

c = c.replace('export const getCourseBySlug = async (req: Request, res: Response) => {\n  try {', cache_code)

cache_set = """
    slugCache[slug] = { data: formatted, time: Date.now() };
    res.json({ success: true, data: formatted });
"""
c = c.replace('    res.json({ success: true, data: formatted });', cache_set)

with open('server/modules/courses/course.controller.ts', 'w') as f:
    f.write(c)

print("Slug cache applied.")
