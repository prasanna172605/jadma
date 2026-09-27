import { fetchApi } from './apiClient';

export const enrollmentApi = {
  enrollFree: async (courseId: string) => {
    return fetchApi('/enrollments/free', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }
};
