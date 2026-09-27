import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres.kakomchteolqajcjjgtr:Jadmaa%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
});

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: '1-basic-varmakalai-training' },
    include: {
      instructor: { select: { displayName: true, title: true, avatarUrl: true, bio: true } },
      modules: {
        include: { lessons: { orderBy: { sortOrder: 'asc' } } },
        orderBy: { sortOrder: 'asc' }
      }
    }
  });
  console.log(course?.id, course?.title, course?.instructor);
}
main().catch(console.error).finally(() => prisma.$disconnect());
