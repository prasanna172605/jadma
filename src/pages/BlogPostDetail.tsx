import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { blogApi } from "../lib/api/blogApi";
import type { BlogPost } from '../lib/api/blogApi';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(() => {
    if (!slug) return null;
    const cached = blogApi.getCachedBlogs();
    return cached.find(b => b.slug === slug || b.id === slug) || null;
  });
  const [loading, setLoading] = useState<boolean>(() => {
    if (!slug) return true;
    const cached = blogApi.getCachedBlogs();
    return !cached.some(b => b.slug === slug || b.id === slug);
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!slug) return;
        const data = await blogApi.getBlogBySlug(slug);
        if (data) {
          setBlog(data);
        }
      } catch (err: any) {
        if (!blog) {
          setError(err.message || 'Article not found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-jadmaa-textMuted">Loading article...</div>;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="text-2xl font-bold text-jadmaa-charcoal mb-4">{error || 'Article not found'}</h2>
        <Link to="/blog" className="text-jadmaa-red hover:underline text-sm font-semibold">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${blog.title} | JADMAA Blog`}
        description={blog.excerpt || `Read ${blog.title} on the JADMAA Varmakalai blog.`}
      />
      
      <article className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-jadmaa-cream py-16 md:py-24 border-b border-jadmaa-border text-center px-4">
          <div className="max-w-3xl mx-auto space-y-6 reveal-on-scroll">
            <Link to="/blog" className="inline-flex items-center text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider hover:underline mb-4">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Journal
            </Link>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-jadmaa-charcoal leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                {blog.author?.avatarUrl ? (
                  <img src={blog.author.avatarUrl} alt={blog.author.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-jadmaa-charcoal/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-jadmaa-charcoal/50" />
                  </div>
                )}
                <span className="text-sm font-semibold text-jadmaa-charcoal">{blog.author?.name}</span>
              </div>
              <div className="flex items-center text-base font-medium text-jadmaa-textMuted">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {blog.thumbnailUrl && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 -mt-10 relative z-10 reveal-on-scroll">
            <img 
              src={blog.thumbnailUrl} 
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl border border-jadmaa-border"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16">
          <div className="prose prose-lg prose-red max-w-none text-jadmaa-textMuted reveal-on-scroll">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  );
};
