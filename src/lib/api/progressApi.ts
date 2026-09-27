import { fetchApi } from './apiClient';

export const progressApi = {
  getDashboard: async () => {
    return fetchApi('/me/dashboard');
  },
  getCertificates: async () => {
    return fetchApi('/me/certificates');
  },
  getMyEnrollments: async () => {
    return fetchApi('/me/enrollments');
  },
  getCourseProgress: async (courseId: string) => {
    return fetchApi(`/me/courses/${courseId}/progress`);
  },
  updateLessonProgress: async (lessonId: string, watchedSeconds: number, completed: boolean) => {
    return fetchApi(`/me/lessons/${lessonId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ watchedSeconds, completed }),
    });
  }
};
