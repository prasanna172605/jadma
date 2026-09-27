export const getDashboard = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    // Get full user for profile basic info
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true, avatarUrl: true }
    });

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: {
        course: {
          include: {
            instructor: { select: { displayName: true } },
            modules: { include: { lessons: true } }
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
    
    const certificates = await prisma.certificate.findMany({
      where: { userId: user.id },
      include: { course: { select: { title: true } } },
      orderBy: { issuedAt: 'desc' },
      take: 5
    });

    let completedCourses = 0;
    let totalProgressSum = 0;
    let continueLearning: any = null;
    
    // Get last watched lesson info if any
    const lastWatched = await prisma.lessonProgress.findFirst({
      where: { userId: user.id },
      orderBy: { lastWatchedAt: 'desc' },
      include: { lesson: { include: { module: true } }, course: true }
    });

    const enrichedEnrollments = await Promise.all(enrollments.map(async (e) => {
      const progressCount = await prisma.lessonProgress.count({
        where: { userId: user.id, courseId: e.courseId, completed: true }
      });
      let totalLessons = 0;
      e.course.modules.forEach(m => totalLessons += m.lessons.length);
      const percentage = totalLessons > 0 ? Math.round((progressCount / totalLessons) * 100) : 0;
      
      if (e.status === 'COMPLETED') completedCourses++;
      totalProgressSum += percentage;

      const formatted = {
        id: e.courseId,
        title: e.course.title,
        thumbnail: e.course.thumbnailUrl,
        instructor: e.course.instructor.displayName,
        progress: percentage,
        status: e.status,
        enrolledAt: e.enrolledAt,
        completedAt: e.completedAt,
        slug: e.course.slug
      };

      if (!continueLearning && lastWatched?.courseId === e.courseId) {
         continueLearning = {
           course: formatted,
           lessonId: lastWatched.lessonId,
           lessonTitle: lastWatched.lesson.title,
           moduleTitle: lastWatched.lesson.module.title,
         };
      } else if (!continueLearning && e.status !== 'COMPLETED') {
         continueLearning = {
           course: formatted,
           lessonId: e.course.modules[0]?.lessons[0]?.id || null,
           lessonTitle: "Start Course",
           moduleTitle: ""
         };
      }

      return formatted;
    }));

    const stats = {
      enrolledCourses: enrollments.length,
      completedCourses,
      certificates: certificates.length,
      averageProgress: enrollments.length > 0 ? Math.round(totalProgressSum / enrollments.length) : 0
    };

    res.json({
      success: true,
      data: {
        student: fullUser,
        stats,
        continueLearning,
        recentCourses: enrichedEnrollments.slice(0, 4),
        certificates: certificates,
        recentActivity: [] // Optional
      }
    });
  } catch (err) {
    console.error('getDashboard error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getCertificates = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const certificates = await prisma.certificate.findMany({
      where: { userId: user.id },
      include: {
        course: { select: { title: true, thumbnailUrl: true } }
      },
      orderBy: { issuedAt: 'desc' }
    });
    res.json({ success: true, data: certificates });
  } catch (err) {
    console.error('getCertificates error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};
