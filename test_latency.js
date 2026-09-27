import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.time("Prisma Query");
  const courses = await prisma.course.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { price: 'asc' },
    include: {
      instructor: { select: { displayName: true, title: true, avatarUrl: true, bio: true } },
      modules: {
        include: { lessons: true }
      }
    }
  });
  console.timeEnd("Prisma Query");
}
main().catch(console.error).finally(() => prisma.$disconnect());
