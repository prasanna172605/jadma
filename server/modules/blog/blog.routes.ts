import { Router } from 'express';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from './blog.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', authenticate, authorize(['admin', 'super_admin']), createBlog);
router.put('/:id', authenticate, authorize(['admin', 'super_admin']), updateBlog);
router.delete('/:id', authenticate, authorize(['admin', 'super_admin']), deleteBlog);

export default router;
