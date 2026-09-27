import { PrismaClient } from '@prisma/client';
import { mockCourses } from './src/data/courses.js';

const prisma = new PrismaClient();

async function main() {
  for (const mockCourse of mockCourses) {
    await prisma.course.updateMany({
      where: { slug: mockCourse.slug },
      data: {
        rating: mockCourse.rating,
        reviewCount: mockCourse.reviewCount
      }
    });
    console.log(`Updated ${mockCourse.slug}`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
