import { Request, Response } from 'express';
import { prisma } from '../../db.js';

export const getMyEnrollments = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id }, // Can be ACTIVE or COMPLETED
      include: {
        course: {
          include: {
            modules: {
              include: { lessons: true }
            }
          }
        }
      }
    });

    const enrichedEnrollments = await Promise.all(enrollments.map(async (e) => {
      const progressCount = await prisma.lessonProgress.count({
        where: { userId: user.id, courseId: e.courseId, completed: true }
      });
      
      let totalLessons = 0;
      (e.course as any).modules.forEach((m: any) => {
        totalLessons += m.lessons.length;
      });
      
      const percentage = totalLessons > 0 ? Math.round((progressCount / totalLessons) * 100) : 0;
      
      return {
        ...e,
        course: e.course,
        progress: percentage
      };
    }));

    res.json({ success: true, data: enrichedEnrollments });
  } catch (err) {
    console.error('getMyEnrollments error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getCourseProgress = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const courseId = req.params.courseId as string;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ success: false, error: { message: 'Course not found' } });
    }

    const progress = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        courseId: course.id,
        completed: true
      },
      select: { lessonId: true }
    });

    const completedLessonIds = progress.map(p => p.lessonId);
    
    let totalLessons = 0;
    (course as any).modules.forEach(m => {
      totalLessons += m.lessons.length;
    });

    const completedLessonsCount = completedLessonIds.length;
    const percentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    res.json({
      success: true,
      data: {
        courseId: course.id,
        totalLessons,
        completedLessons: completedLessonsCount,
        percentage,
        completed: percentage === 100,
        completedLessonIds
      }
    });
  } catch (err) {
    console.error('getCourseProgress error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const updateLessonProgress = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const lessonId = req.params.lessonId as string;
    const { watchedSeconds, completed } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { select: { courseId: true } } }
    });

    if (!lesson) {
      return res.status(404).json({ success: false, error: { message: 'Lesson not found' } });
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: (lesson as any).module.courseId } }
    });

    if (!enrollment || enrollment.status !== 'ACTIVE') {
      return res.status(403).json({ success: false, error: { message: 'Not enrolled in this course' } });
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      update: {
        watchedSeconds,
        completed: completed !== undefined ? completed : undefined,
        completedAt: completed ? new Date() : undefined,
        lastWatchedAt: new Date()
      },
      create: {
        userId: user.id,
        courseId: (lesson as any).module.courseId,
        lessonId,
        watchedSeconds: watchedSeconds || 0,
        completed: completed || false,
        completedAt: completed ? new Date() : null,
        lastWatchedAt: new Date()
      }
    });

    // Check if course is fully completed and unlock certificate
    if (completed) {
      const course = await prisma.course.findUnique({
        where: { id: (lesson as any).module.courseId },
        include: { modules: { include: { lessons: { where: { isRequired: true } } } } }
      });
      
      let requiredLessonIds: string[] = [];
      (course as any)?.modules.forEach(m => {
        requiredLessonIds.push(...m.lessons.map(l => l.id));
      });

      const allProgress = await prisma.lessonProgress.findMany({
        where: { userId: user.id, courseId: (lesson as any).module.courseId, completed: true }
      });
      const completedIds = allProgress.map(p => p.lessonId);
      
      const isFinished = requiredLessonIds.every(id => completedIds.includes(id));
      
      if (isFinished && enrollment.status !== 'COMPLETED') {
        // Mark enrollment as completed
        await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: { status: 'COMPLETED', completedAt: new Date() }
        });
        
        // Generate Certificate
        if (course?.certificateEnabled) {
          const certNumber = `JADMAA-${Date.now().toString().slice(-6)}-${user.id.slice(-4).toUpperCase()}`;
          const verifyCode = `V-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
          
          await prisma.certificate.create({
            data: {
              userId: user.id,
              courseId: course.id,
              certificateNumber: certNumber,
              verificationCode: verifyCode,
              status: 'ISSUED'
            }
          });
        }
      }
    }

    res.json({ success: true, data: progress });
  } catch (err) {
    console.error('updateLessonProgress error:', err);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};
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
      (e.course as any).modules.forEach(m => totalLessons += m.lessons.length);
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
           moduleTitle: (lastWatched.lesson as any).module.title,
         };
      } else if (!continueLearning && e.status !== 'COMPLETED') {
         continueLearning = {
           course: formatted,
           lessonId: (e.course as any).modules[0]?.lessons[0]?.id || null,
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
