import { fetchApi } from './apiClient';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  thumbnailUrl: string | null;
  authorId: string;
  author?: {
    name: string;
    avatarUrl: string | null;
  };
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const blogApi = {
  getBlogs: async (all?: boolean): Promise<BlogPost[]> => {
    const res = await fetchApi(all ? '/blogs?all=true' : '/blogs');
    return res.data;
  },
  getBlogBySlug: async (slug: string): Promise<BlogPost> => {
    const res = await fetchApi(`/blogs/${slug}`);
    return res.data;
  },
  createBlog: async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await fetchApi('/blogs', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },
  updateBlog: async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await fetchApi(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  },
  deleteBlog: async (id: string): Promise<void> => {
    await fetchApi(`/blogs/${id}`, {
      method: 'DELETE'
    });
  }
};
