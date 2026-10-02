import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Public Pages
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Courses } from '../pages/Courses';
import { CourseDetails } from '../pages/CourseDetails';
import { Contact } from '../pages/Contact';
import { Blog } from '../pages/Blog';
import { BlogPostDetail } from '../pages/BlogPostDetail';
import { Careers } from '../pages/Careers';

// Auth Pages
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ForgotPassword } from '../pages/Auth/ForgotPassword';
import { ResetPassword } from '../pages/Auth/ResetPassword';

// LMS Pages
import { StudentDashboard } from '../pages/Dashboard/StudentDashboard';
import { StudentProfile } from '../pages/Dashboard/StudentProfile';
import { MyCourses } from '../pages/Dashboard/MyCourses';
import { LearnCourse } from '../pages/Dashboard/LearnCourse';
import { CertificatesPage } from '../pages/Dashboard/CertificatesPage';
import { PaymentStatus } from '../pages/Dashboard/PaymentStatus';
import { AdminPanel } from '../pages/Admin/AdminPanel';
import { InstructorPanel } from '../pages/Instructor/InstructorPanel';
import { StudentPanel } from '../pages/Dashboard/StudentPanel';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* LMS Routes */}
        <Route path="/dashboard" element={<Navigate to="/student" />} />
        <Route path="/student" element={<StudentPanel />} />
        <Route path="/my-courses" element={<Navigate to="/student" />} />
        <Route path="/profile" element={<Navigate to="/student" />} />
        <Route path="/learn/:courseId" element={<LearnCourse />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/payment/status/:merchantOrderId" element={<PaymentStatus />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/instructor" element={<InstructorPanel />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
