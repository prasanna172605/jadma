import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Users } from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  hidePrice?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, hidePrice = false }) => {
  return (
    <div className="jd-card scroll-card-settle overflow-hidden flex flex-col group w-full">

      {/* Thumbnail — 16:9 aspect ratio, cover, matches jadmaa.com */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Floating badges top-left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-xs font-bold bg-[#2B2521] text-white rounded-md">
            {course.category}
          </span>
          {course.isPopular && (
            <span className="px-2.5 py-1 text-xs font-bold bg-[#B12B2B] text-white rounded-md">
              Popular
            </span>
          )}
          {course.isFree && (
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-md">
              FREE
            </span>
          )}
        </div>
        {/* Level badge bottom-right */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-[#2B2521] border border-[#E8DDD0]">
          {course.level}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">

        {/* Meta row — duration + rating (matches jadmaa.com meta bar) */}
        <div className="flex items-center justify-between text-xs text-[#B12B2B] font-semibold uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold">{course.rating.toFixed(1)}</span>
            <span className="text-[#5C5148] font-normal">({course.reviewCount})</span>
          </div>
        </div>

        {/* Title — Roboto, 20px, weight 600 — exact jadmaa.com */}
        <h3
          className="font-heading font-semibold text-[#2B2521] group-hover:text-[#B12B2B] transition-colors line-clamp-2 leading-snug text-[20px]"
          style={{ lineHeight: '1.3' }}
        >
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#5C5148] line-clamp-2 leading-relaxed flex-1">
          {course.description}
        </p>

        {/* Instructor row */}
        {(() => {
          const rawName = typeof course.instructor === 'object' && course.instructor !== null
            ? (course.instructor as any).name || (course.instructor as any).displayName || 'Mr. Bojagarajan'
            : (typeof course.instructor === 'string' && course.instructor)
              ? course.instructor
              : 'Mr. Bojagarajan';
          const instructorName = rawName.toLowerCase().startsWith('aasan')
            ? rawName
            : `Aasan - ${rawName}`;
          const initial = rawName.replace(/^(aasan\s*[-–—:]*\s*)/i, '').charAt(0).toUpperCase() || 'B';

          return (
            <div className="flex items-center gap-2.5 text-sm text-[#5C5148]">
              <div className="w-7 h-7 rounded-full bg-[#B12B2B] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {initial}
              </div>
              <span className="font-medium truncate">{instructorName}</span>
              {course.studentsCount !== undefined && (
                <span className="ml-auto flex items-center gap-1 text-xs text-[#5C5148]">
                  <Users className="w-3.5 h-3.5" />
                  {course.studentsCount}
                </span>
              )}
            </div>
          );
        })()}

        {/* Divider */}
        <div className="border-t border-[#E8DDD0]" />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between gap-3">
          {!hidePrice && (
            <div className="shrink-0">
              {course.isFree ? (
                <span className="font-heading font-bold text-base text-emerald-600">Free</span>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading font-bold text-lg text-[#2B2521]">
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

          {/* "Enroll Course" button — exact jadmaa.com: outline, full-width when hidePrice, rounded-md, border-jadmaa-red */}
          <Link
            to={`/courses/${course.slug}`}
            className={`jd-enroll-btn ${hidePrice ? 'w-full' : ''}`}
          >
            {hidePrice ? 'Enroll Course' : 'View Details'}
          </Link>
        </div>

      </div>
    </div>
  );
};
