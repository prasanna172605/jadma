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

let memoryBlogsCache: BlogPost[] | null = null;
const blogSlugCache = new Map<string, BlogPost>();

export const blogApi = {
  getCachedBlogs: (): BlogPost[] => {
    if (memoryBlogsCache && memoryBlogsCache.length > 0) {
      return memoryBlogsCache;
    }
    try {
      const cached = sessionStorage.getItem('jadmaa_blogs_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryBlogsCache = parsed;
          return parsed;
        }
      }
    } catch (_) {}
    return [];
  },

  getBlogs: async (all?: boolean): Promise<BlogPost[]> => {
    if (!all) {
      const cached = blogApi.getCachedBlogs();
      if (cached.length > 0) {
        // Background revalidation
        fetchApi('/blogs').then(res => {
          if (res?.data && Array.isArray(res.data)) {
            memoryBlogsCache = res.data;
            try {
              sessionStorage.setItem('jadmaa_blogs_cache', JSON.stringify(res.data));
            } catch (_) {}
          }
        }).catch(() => {});
        return cached;
      }
    }

    const res = await fetchApi(all ? '/blogs?all=true' : '/blogs');
    if (!all && res?.data) {
      memoryBlogsCache = res.data;
      try {
        sessionStorage.setItem('jadmaa_blogs_cache', JSON.stringify(res.data));
      } catch (_) {}
    }
    return res.data || [];
  },

  getBlogBySlug: async (slug: string): Promise<BlogPost> => {
    if (blogSlugCache.has(slug)) {
      return blogSlugCache.get(slug)!;
    }

    const cachedList = blogApi.getCachedBlogs();
    const existing = cachedList.find(b => b.slug === slug || b.id === slug);
    if (existing && existing.content) {
      blogSlugCache.set(slug, existing);
      fetchApi(`/blogs/${slug}`).then(res => {
        if (res?.data) blogSlugCache.set(slug, res.data);
      }).catch(() => {});
      return existing;
    }

    const res = await fetchApi(`/blogs/${slug}`);
    if (res?.data) {
      blogSlugCache.set(slug, res.data);
    }
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
