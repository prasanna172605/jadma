import { Request, Response } from 'express';
import { prisma } from '../../db.js';
import { mockBlogPosts } from '../../../src/data/blog.js';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.query.all === 'true';
    const blogs = await prisma.blogPost.findMany({
      where: isAdmin ? undefined : { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true, avatarUrl: true } } }
    });
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.warn('getBlogs error, falling back to mock data:', error);
    res.json({ success: true, data: mockBlogPosts });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { name: true, avatarUrl: true } } }
    });
    if (!blog) {
      const mockPost = mockBlogPosts.find(p => p.slug === req.params.slug || p.id === req.params.slug);
      if (mockPost) return res.json({ success: true, data: mockPost });
      return res.status(404).json({ success: false, error: { message: 'Blog not found' } });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.warn('getBlogBySlug error, falling back to mock data:', error);
    const mockPost = mockBlogPosts.find(p => p.slug === req.params.slug || p.id === req.params.slug);
    if (mockPost) {
      return res.json({ success: true, data: mockPost });
    }
    res.status(500).json({ success: false, error: { message: 'Server error fetching blog' } });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { title, slug, content, excerpt, thumbnailUrl, published } = req.body;
    
    const blog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        thumbnailUrl,
        published: published ?? false,
        authorId: userId
      }
    });
    res.status(201).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message || 'Error creating blog' } });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, excerpt, thumbnailUrl, published } = req.body;
    
    const blog = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        title,
        slug,
        content,
        excerpt,
        thumbnailUrl,
        published
      }
    });
    res.json({ success: true, data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message || 'Error updating blog' } });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await prisma.blogPost.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, data: null });
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message || 'Error deleting blog' } });
  }
};
