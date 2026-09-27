import { fetchApi } from './apiClient';

export const dbApi = {
  getTables: () => fetchApi('/db-admin/tables'),
  getTableData: (table: string, page = 1, limit = 50) => fetchApi(`/db-admin/tables/${table}/data?page=${page}&limit=${limit}`),
  createTableRow: (table: string, data: any) => fetchApi(`/db-admin/tables/${table}/data`, { method: 'POST', body: JSON.stringify(data) }),
  updateTableRow: (table: string, id: string, data: any) => fetchApi(`/db-admin/tables/${table}/data/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTableRow: (table: string, id: string) => fetchApi(`/db-admin/tables/${table}/data/${id}`, { method: 'DELETE' }),
};
