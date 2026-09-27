import { fetchApi } from './apiClient';

export const paymentApi = {
  createOrder: async (courseId: string) => {
    return fetchApi('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },
  checkStatus: async (merchantOrderId: string) => {
    return fetchApi(`/payments/${merchantOrderId}/status`);
  }
};
