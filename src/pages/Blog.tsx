import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { blogApi } from "../lib/api/blogApi";
import type { BlogPost } from '../lib/api/blogApi';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogApi.getBlogs();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEO 
        title="Blog | JADMAA Varmakalai"
        description="Read the latest news, training tips, and insights about traditional Varmakalai martial arts."
      />
      
      <section className="bg-jadmaa-cream py-12 md:py-16 border-b border-jadmaa-border text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-4 reveal-on-scroll">
          <span className="text-base md:text-lg font-bold text-jadmaa-red uppercase tracking-wider">
            Academy Journal
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-jadmaa-charcoal">
            The Varmakalai <span className="text-jadmaa-red">Blog</span>
          </h1>
          <p className="text-base md:text-lg text-jadmaa-textMuted max-w-2xl leading-relaxed">
            Latest news, techniques, student stories, and deep dives into the traditional Tamil martial science of Varmakalai.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          {loading ? (
            <div className="text-center py-16 text-jadmaa-textMuted">Loading articles...</div>
          ) : error ? (
            <div className="text-center py-16 text-jadmaa-red">Error: {error}</div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
              {blogs.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog.id} className="group bg-jadmaa-cream/50 rounded-2xl border border-jadmaa-border overflow-hidden hover-lift flex flex-col scroll-card-settle">
                  {blog.thumbnailUrl && (
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={blog.thumbnailUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="flex items-center text-xs uppercase font-bold tracking-wider text-jadmaa-red">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-jadmaa-charcoal mb-2 group-hover:text-jadmaa-red transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-base md:text-lg text-jadmaa-textMuted line-clamp-3 mb-6">
                      {blog.excerpt || 'Read the full article to learn more about this topic.'}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-jadmaa-border pt-4">
                      <div className="flex items-center space-x-2">
                        {blog.author?.avatarUrl ? (
                          <img src={blog.author.avatarUrl} alt={blog.author.name} className="w-6 h-6 rounded-full" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-jadmaa-charcoal/10 flex items-center justify-center">
                            <User className="w-3 h-3 text-jadmaa-charcoal/50" />
                          </div>
                        )}
                        <span className="text-xs font-semibold text-jadmaa-charcoal">{blog.author?.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-jadmaa-red group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-jadmaa-cream/40 rounded-2xl border border-dashed border-jadmaa-border">
              <h3 className="font-heading font-extrabold text-xl text-jadmaa-charcoal mb-2">No articles yet</h3>
              <p className="text-base md:text-lg text-jadmaa-textMuted">Check back soon for new insights and stories.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
