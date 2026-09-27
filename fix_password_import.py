with open('server/modules/auth/password.controller.ts', 'r') as f:
    c = f.read()

c = c.replace("import prisma from '../../config/prisma.js';", "import { prisma } from '../../db.js';")

with open('server/modules/auth/password.controller.ts', 'w') as f:
    f.write(c)
