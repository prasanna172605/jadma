import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, ChevronRight } from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  hidePrice?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, hidePrice = false }) => {
  return (
    <div className="jd-card overflow-hidden flex flex-col h-full group">
      
      {/* Thumbnail & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 img-interactive-frame">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold bg-[#2B2521] text-white rounded">
            {course.category}
          </span>
          {course.isPopular && (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-[#B12B2B] text-white rounded">
              Popular
            </span>
          )}
          {course.isFree && (
            <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded">
              FREE
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-[#2B2521] border border-[#E8DDD0]">
          {course.level}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
        <div className="space-y-2">
          
          {/* Metadata Bar */}
          <div className="flex items-center justify-between text-xs text-[#5C5148] font-medium">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B12B2B]" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-gray-400 font-normal">({course.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-extrabold text-lg text-[#2B2521] group-hover:text-[#B12B2B] transition-colors line-clamp-2 leading-snug">
            <Link to={`/courses/${course.slug}`}>
              {course.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#5C5148] line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Bottom Section: Price & Action */}
        <div className={`pt-3 border-t border-[#E8DDD0] mt-auto ${hidePrice ? '' : 'flex items-center justify-between'}`}>
          {!hidePrice && (
            <div>
              {course.isFree ? (
                <span className="font-heading font-extrabold text-base text-emerald-600">Free Course</span>
              ) : (
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-heading font-extrabold text-lg text-[#2B2521]">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{course.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          <Link
            to={`/courses/${course.slug}`}
            className={
              hidePrice
                ? 'flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-[#B12B2B] hover:bg-[#8C1E1E] text-white font-bold text-sm transition-all shadow-md'
                : 'inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-[#FAF6F0] hover:bg-[#B12B2B] text-[#2B2521] hover:text-white font-bold text-xs transition-all border border-[#E8DDD0]'
            }
          >
            <span>Enroll Now</span>
            <ChevronRight className={hidePrice ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
          </Link>
        </div>

      </div>

    </div>
  );
};
