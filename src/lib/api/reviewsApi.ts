import { fetchApi } from './apiClient';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const reviewsApi = {
  getReviews: async (): Promise<Testimonial[]> => {
    try {
      const response = await fetchApi('/reviews');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      return [];
    }
  }
};
