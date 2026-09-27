import re

with open('server/modules/courses/course.controller.ts', 'r') as f:
    c = f.read()

bad_str = """    coursesCache = formatted;
    lastCacheTime = Date.now();

    slugCache[slug] = { data: formatted, time: Date.now() };
    res.json({ success: true, data: formatted });"""

good_str = """    coursesCache = formatted;
    lastCacheTime = Date.now();

    res.json({ success: true, data: formatted });"""

if bad_str in c:
    c = c.replace(bad_str, good_str)
else:
    c = re.sub(
        r"coursesCache = formatted;\s*lastCacheTime = Date\.now\(\);\s*slugCache\[slug\] = \{ data: formatted, time: Date\.now\(\) \};\s*res\.json\(\{ success: true, data: formatted \}\);",
        "coursesCache = formatted;\n    lastCacheTime = Date.now();\n\n    res.json({ success: true, data: formatted });",
        c
    )

with open('server/modules/courses/course.controller.ts', 'w') as f:
    f.write(c)
