import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Public Pages
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Courses } from '../pages/Courses';
import { CourseDetails } from '../pages/CourseDetails';
import { Contact } from '../pages/Contact';
import { FAQ } from '../pages/FAQ';
import { Careers } from '../pages/Careers';

// Auth Pages
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ForgotPassword } from '../pages/Auth/ForgotPassword';

// LMS Pages
import { StudentDashboard } from '../pages/Dashboard/StudentDashboard';
import { MyCourses } from '../pages/Dashboard/MyCourses';
import { LearnCourse } from '../pages/Dashboard/LearnCourse';
import { CertificatesPage } from '../pages/Dashboard/CertificatesPage';
import { AdminPanel } from '../pages/Admin/AdminPanel';
import { InstructorPanel } from '../pages/Instructor/InstructorPanel';

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
        <Route path="/faq" element={<FAQ />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* LMS Routes */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/learn/:courseId" element={<LearnCourse />} />
        <Route path="/profile" element={<StudentDashboard />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/instructor" element={<InstructorPanel />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
