import { Request, Response } from 'express';
import { prisma } from '../../db.js';
import { logAdminAction } from '../../utils/audit.js';
import bcrypt from 'bcryptjs';
import { sendNewCourseSuggestionEmail } from '../../services/email/email.service.js';

const getPagination = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    const activeStudents = await prisma.user.count({ where: { role: 'STUDENT', isActive: true } });
    const totalInstructors = await prisma.user.count({ where: { role: 'INSTRUCTOR' } });
    const publishedCourses = await prisma.course.count({ where: { status: 'PUBLISHED' } });
    const draftCourses = await prisma.course.count({ where: { status: 'DRAFT' } });
    
    const totalEnrollments = await prisma.enrollment.count();
    const completedCourses = await prisma.enrollment.count({ where: { status: 'COMPLETED' } });
    const certificatesIssued = await prisma.certificate.count({ where: { status: 'ISSUED' } });
    
    const successfulPaymentsCount = await prisma.payment.count({ where: { status: 'SUCCESS' } });
    const pendingPaymentsCount = await prisma.payment.count({ where: { status: 'PENDING' } });
    
    const successfulPayments = await prisma.payment.aggregate({
      where: { status: 'SUCCESS' },
      _sum: { amount: true }
    });
    
    const refundedPayments = await prisma.payment.aggregate({
      where: { status: 'REFUNDED' },
      _sum: { amount: true }
    });
    
    const totalRevenue = (successfulPayments._sum.amount || 0) - (refundedPayments._sum.amount || 0);

    res.json({
      success: true,
      data: {
        totalStudents, activeStudents, totalInstructors, publishedCourses, draftCourses,
        totalEnrollments, completedCourses, certificatesIssued,
        successfulPayments: successfulPaymentsCount,
        pendingPayments: pendingPaymentsCount,
        totalRevenue
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  // A simplified analytics implementation
  try {
    // For now, return basic mock structures representing the shape
    // In production, this would use group by queries based on date ranges
    res.json({
      success: true,
      data: {
        enrollmentsOverTime: [],
        revenueOverTime: [],
        courseCompletionRate: 0
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { search, status } = req.query;
    
    const where: any = { role: 'STUDENT' };
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { phone: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (status === 'active') where.isActive = true;
    if (status === 'inactive') where.isActive = false;

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: { id: true, name: true, email: true, phone: true, isActive: true, createdAt: true, lastLoginAt: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        items,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { 
        id: true, name: true, email: true, phone: true, isActive: true, createdAt: true, lastLoginAt: true,
        enrollments: { include: { course: { select: { title: true } } } },
        payments: { orderBy: { createdAt: 'desc' } },
        certificates: { include: { course: { select: { title: true } } } },
        lessonProgress: true
      }
    });
    if (!student || student.role !== 'STUDENT') {
      return res.status(404).json({ success: false, error: { message: 'Student not found' } });
    }
    res.json({ success: true, data: student });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const updateStudentStatus = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.body;
    const student = await prisma.user.update({
      where: { id: req.params.id },
      data: { isActive }
    });
    
    await logAdminAction((req as any).user.id, 'UPDATE_STUDENT_STATUS', 'User', student.id, { isActive }, req);
    
    res.json({ success: true, data: { id: student.id, isActive: student.isActive } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

// --- Instructors ---
export const getInstructors = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { search } = req.query;
    
    const where: any = {};
    if (search) {
      where.OR = [
        { displayName: { contains: search as string, mode: 'insensitive' } },
        { user: { email: { contains: search as string, mode: 'insensitive' } } }
      ];
    }

    const [items, total] = await Promise.all([
      prisma.instructor.findMany({
        where, skip, take: limit,
        include: { user: { select: { email: true, name: true, isAdmin: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.instructor.count({ where })
    ]);

    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id: req.params.id },
      include: { 
        user: { select: { email: true, name: true, phone: true } },
        courses: { select: { id: true, title: true, status: true } } 
      }
    });
    if (!instructor) return res.status(404).json({ success: false, error: { message: 'Instructor not found' } });
    res.json({ success: true, data: instructor });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const createInstructor = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, displayName, title, bio, specialization, experience } = req.body;
    
    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const passwordHash = await bcrypt.hash(password || 'Jadmaa@123', 10);
      user = await prisma.user.create({
        data: { name, email, phone, passwordHash, role: 'INSTRUCTOR' }
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: { role: 'INSTRUCTOR' }
      });
    }

    const instructor = await prisma.instructor.create({
      data: { userId: user.id, displayName: displayName || name, title, bio, specialization, experience }
    });

    await logAdminAction((req as any).user.id, 'CREATE_INSTRUCTOR', 'Instructor', instructor.id, { email }, req);
    res.json({ success: true, data: instructor });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const updateInstructor = async (req: Request, res: Response) => {
  try {
    const { displayName, title, bio, specialization, experience } = req.body;
    const instructor = await prisma.instructor.update({
      where: { id: req.params.id },
      data: { displayName, title, bio, specialization, experience }
    });
    await logAdminAction((req as any).user.id, 'UPDATE_INSTRUCTOR', 'Instructor', instructor.id, null, req);
    res.json({ success: true, data: instructor });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const updateInstructorStatus = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.body;
    
    // Check if it's the founder/admin
    const existing = await prisma.instructor.findUnique({
      where: { id: req.params.id },
      include: { user: true }
    });
    
    if (existing?.user?.isAdmin || existing?.user?.role === 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, error: { message: 'Cannot deactivate an admin instructor' } });
    }

    const instructor = await prisma.instructor.update({
      where: { id: req.params.id },
      data: { isActive },
      include: { user: true }
    });
    
    await prisma.user.update({
      where: { id: instructor.userId },
      data: { isActive }
    });
    
    await logAdminAction((req as any).user.id, 'UPDATE_INSTRUCTOR_STATUS', 'Instructor', instructor.id, { isActive }, req);
    res.json({ success: true, data: instructor });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

// --- Courses ---
export const getCourses = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { search, status } = req.query;
    
    const where: any = {};
    if (search) where.title = { contains: search as string, mode: 'insensitive' };
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.course.findMany({
        where, skip, take: limit,
        include: { instructor: { select: { displayName: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.course.count({ where })
    ]);

    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { 
        instructor: true,
        modules: {
          include: { lessons: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });
    if (!course) return res.status(404).json({ success: false, error: { message: 'Course not found' } });
    res.json({ success: true, data: course });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    const course = await prisma.course.create({ data });
    await logAdminAction((req as any).user.id, 'CREATE_COURSE', 'Course', course.id, { title: course.title }, req);
    if (course.status === 'PUBLISHED') {
      sendNewCourseSuggestionEmail(course.id).catch(err => console.error('Failed to trigger course recommendation emails:', err));
    }
    res.json({ success: true, data: course });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: req.body
    });
    await logAdminAction((req as any).user.id, 'UPDATE_COURSE', 'Course', course.id, null, req);
    res.json({ success: true, data: course });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    // Check if course has enrollments or payments
    const enrollmentsCount = await prisma.enrollment.count({ where: { courseId: req.params.id } });
    if (enrollmentsCount > 0) {
      return res.status(400).json({ success: false, error: { message: 'Cannot delete course with active enrollments. Archive it instead.' } });
    }
    
    await prisma.course.delete({ where: { id: req.params.id } });
    await logAdminAction((req as any).user.id, 'DELETE_COURSE', 'Course', req.params.id, null, req);
    res.json({ success: true, data: { message: 'Course deleted successfully' } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const publishCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: { status: 'PUBLISHED', publishedAt: new Date() }
    });
    await logAdminAction((req as any).user.id, 'PUBLISH_COURSE', 'Course', course.id, null, req);
    sendNewCourseSuggestionEmail(course.id).catch(err => console.error('Failed to trigger course recommendation emails:', err));
    res.json({ success: true, data: course });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

export const unpublishCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: { status: 'DRAFT' }
    });
    await logAdminAction((req as any).user.id, 'UNPUBLISH_COURSE', 'Course', course.id, null, req);
    res.json({ success: true, data: course });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message || 'Server error' } });
  }
};

// --- Modules & Lessons ---
export const createModule = async (req: Request, res: Response) => {
  try {
    const module = await prisma.courseModule.create({ data: req.body });
    await logAdminAction((req as any).user.id, 'CREATE_MODULE', 'CourseModule', module.id, { courseId: module.courseId }, req);
    res.json({ success: true, data: module });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const module = await prisma.courseModule.update({ where: { id: req.params.id }, data: req.body });
    await logAdminAction((req as any).user.id, 'UPDATE_MODULE', 'CourseModule', module.id, null, req);
    res.json({ success: true, data: module });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const deleteModule = async (req: Request, res: Response) => {
  try {
    await prisma.courseModule.delete({ where: { id: req.params.id } });
    await logAdminAction((req as any).user.id, 'DELETE_MODULE', 'CourseModule', req.params.id, null, req);
    res.json({ success: true, data: { message: 'Deleted' } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

const extractYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match ? match[1] : url;
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (data.youtubeVideoId) data.youtubeVideoId = extractYouTubeId(data.youtubeVideoId);
    
    const lesson = await prisma.lesson.create({ data });
    await logAdminAction((req as any).user.id, 'CREATE_LESSON', 'Lesson', lesson.id, { moduleId: lesson.moduleId }, req);
    res.json({ success: true, data: lesson });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (data.youtubeVideoId) data.youtubeVideoId = extractYouTubeId(data.youtubeVideoId);
    
    const lesson = await prisma.lesson.update({ where: { id: req.params.id }, data });
    await logAdminAction((req as any).user.id, 'UPDATE_LESSON', 'Lesson', lesson.id, null, req);
    res.json({ success: true, data: lesson });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    await prisma.lesson.delete({ where: { id: req.params.id } });
    await logAdminAction((req as any).user.id, 'DELETE_LESSON', 'Lesson', req.params.id, null, req);
    res.json({ success: true, data: { message: 'Deleted' } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

// --- Enrollments ---
export const getEnrollments = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { status, courseId, userId } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (courseId) where.courseId = courseId;
    if (userId) where.userId = userId;

    const [items, total] = await Promise.all([
      prisma.enrollment.findMany({
        where, skip, take: limit,
        include: { 
          user: { select: { name: true, email: true } },
          course: { select: { title: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.enrollment.count({ where })
    ]);
    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const getEnrollmentById = async (req: Request, res: Response) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: req.params.id },
      include: { user: true, course: true, payment: true }
    });
    res.json({ success: true, data: enrollment });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

// --- Payments ---
export const getPayments = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const { status, merchantOrderId } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (merchantOrderId) where.merchantOrderId = { contains: merchantOrderId as string, mode: 'insensitive' };

    const [items, total] = await Promise.all([
      prisma.payment.findMany({
        where, skip, take: limit,
        include: { 
          user: { select: { name: true, email: true } },
          course: { select: { title: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.payment.count({ where })
    ]);
    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: { user: true, course: true }
    });
    res.json({ success: true, data: payment });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const refundPayment = async (req: Request, res: Response) => {
  try {
    // Basic refund implementation wrapper
    // In production, integrate with PhonePe refund API here
    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: { status: 'REFUNDED' }
    });
    await logAdminAction((req as any).user.id, 'REFUND_PAYMENT', 'Payment', payment.id, null, req);
    res.json({ success: true, data: payment });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

// --- Certificates ---
export const getCertificates = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const [items, total] = await Promise.all([
      prisma.certificate.findMany({
        skip, take: limit,
        include: { user: { select: { name: true, email: true } }, course: { select: { title: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.certificate.count()
    ]);
    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const getCertificateById = async (req: Request, res: Response) => {
  try {
    const cert = await prisma.certificate.findUnique({ where: { id: req.params.id }, include: { user: true, course: true } });
    res.json({ success: true, data: cert });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const revokeCertificate = async (req: Request, res: Response) => {
  try {
    const cert = await prisma.certificate.update({
      where: { id: req.params.id },
      data: { status: 'REVOKED' }
    });
    await logAdminAction((req as any).user.id, 'REVOKE_CERTIFICATE', 'Certificate', cert.id, null, req);
    res.json({ success: true, data: cert });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

// --- Enquiries ---
export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const [items, total] = await Promise.all([
      prisma.enquiry.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.enquiry.count()
    ]);
    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const getEnquiryById = async (req: Request, res: Response) => {
  try {
    const enquiry = await prisma.enquiry.findUnique({ where: { id: req.params.id } });
    res.json({ success: true, data: enquiry });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const enquiry = await prisma.enquiry.update({ where: { id: req.params.id }, data: { status: req.body.status } });
    res.json({ success: true, data: enquiry });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

// --- Administrators (Super Admin) ---
export const getAdministrators = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const where = { role: { in: ['ADMIN', 'SUPER_ADMIN'] as any } };
    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit, select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true }, orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where })
    ]);
    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const createAdministrator = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') throw new Error('Invalid role');
    const passwordHash = await bcrypt.hash(password || 'Admin@123', 10);
    const admin = await prisma.user.create({ data: { name, email, passwordHash, role } });
    await logAdminAction((req as any).user.id, 'CREATE_ADMIN', 'User', admin.id, { role }, req);
    res.json({ success: true, data: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const updateAdministrator = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') throw new Error('Invalid role');
    const admin = await prisma.user.update({ where: { id: req.params.id }, data: { role } });
    await logAdminAction((req as any).user.id, 'UPDATE_ADMIN_ROLE', 'User', admin.id, { role }, req);
    res.json({ success: true, data: { id: admin.id, role: admin.role } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const updateAdministratorStatus = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.user.update({ where: { id: req.params.id }, data: { isActive: req.body.isActive } });
    await logAdminAction((req as any).user.id, 'UPDATE_ADMIN_STATUS', 'User', admin.id, { isActive: req.body.isActive }, req);
    res.json({ success: true, data: { id: admin.id, isActive: admin.isActive } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({ skip, take: limit, include: { actor: { select: { email: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.auditLog.count()
    ]);
    res.json({ success: true, data: { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

// --- Settings ---
export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await prisma.systemSetting.findMany();
    res.json({ success: true, data: settings });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { key, value, description } = req.body;
    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description }
    });
    await logAdminAction((req as any).user.id, 'UPDATE_SETTING', 'SystemSetting', setting.id, { key }, req);
    res.json({ success: true, data: setting });
  } catch (err: any) { res.status(500).json({ success: false, error: { message: err.message } }); }
};
