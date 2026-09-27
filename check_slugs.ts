import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: "postgresql://postgres.kakomchteolqajcjjgtr:Jadmaa%402026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
});

async function main() {
  const courses = await prisma.course.findMany({
    select: { slug: true }
  });
  console.log(courses.map(c => c.slug));
}
main().catch(console.error).finally(() => prisma.$disconnect());
