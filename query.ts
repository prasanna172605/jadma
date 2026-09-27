import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN', 'INSTRUCTOR'] } } });
  const instructors = await prisma.instructor.findMany();
  console.log("Users:", users);
  console.log("Instructors:", instructors);
}
main().finally(() => prisma.$disconnect());
