const fs = require('fs');

let homeContent = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// Add import
homeContent = homeContent.replace(
  "import type { Course } from '../types';",
  "import type { Course } from '../types';\nimport { reviewsApi, type Testimonial } from '../lib/api/reviewsApi';"
);

// Add state and fetch logic
homeContent = homeContent.replace(
  "const [loading, setLoading] = useState(true);",
  "const [loading, setLoading] = useState(true);\n  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);"
);

homeContent = homeContent.replace(
  "fetchCourses();",
  "fetchCourses();\n    const fetchTestimonials = async () => {\n      try {\n        const data = await reviewsApi.getReviews();\n        if (data && data.length > 0) {\n          setTestimonials(data);\n        } else {\n          setTestimonials(mockTestimonials as any);\n        }\n      } catch (err) {\n        console.error('Failed to fetch testimonials', err);\n        setTestimonials(mockTestimonials as any);\n      }\n    };\n    fetchTestimonials();"
);

// Update map
homeContent = homeContent.replace(
  "{mockTestimonials.map((t, idx) => (",
  "{(testimonials.length > 0 ? testimonials : mockTestimonials as any).map((t: any, idx: number) => ("
);

// Replace avatar mapping if it exists, or handle role & location mapping
// The old mock structure had t.location. Google doesn't have it.
homeContent = homeContent.replace(
  "<p className=\"text-[11px] text-[#5C5148]\">{t.role} • {t.location}</p>",
  "<p className=\"text-[11px] text-[#5C5148]\">{t.role}{t.location ? ` • ${t.location}` : ''}</p>"
);

fs.writeFileSync('src/pages/Home.tsx', homeContent);
console.log('Home.tsx patched');
