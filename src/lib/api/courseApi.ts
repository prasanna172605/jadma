import { fetchApi } from './apiClient';
import type { Course } from '../../types';

export const courseApi = {
  getCourses: async (): Promise<Course[]> => {
    const res = await fetchApi('/courses');
    return res.data;
  },
  getCourseBySlug: async (slug: string): Promise<Course> => {
    const res = await fetchApi(`/courses/${slug}`);
    return res.data;
  }
};
