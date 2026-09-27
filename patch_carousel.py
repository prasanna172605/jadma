import sys

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# 1. Add useRef
if "useRef" not in content[:200]:
    content = content.replace("import React, { useState, useEffect }", "import React, { useState, useEffect, useRef }")

# 2. Add Chevron icons
content = content.replace(
    "import { CheckCircle2, ArrowRight, Star, MapPin, HeartPulse, Shield, Award, Users } from 'lucide-react';",
    "import { CheckCircle2, ArrowRight, Star, MapPin, HeartPulse, Shield, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';"
)

# 3. Add scrollRef inside the component
if "const scrollRef = useRef" not in content:
    content = content.replace(
        "const [loading, setLoading] = useState(true);",
        "const [loading, setLoading] = useState(true);\n  const scrollRef = useRef<HTMLDivElement>(null);\n\n  const scroll = (direction: 'left' | 'right') => {\n    if (scrollRef.current) {\n      const { scrollLeft, clientWidth } = scrollRef.current;\n      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;\n      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });\n    }\n  };"
    )

# 4. Replace the grid and slice
old_grid_start = """          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(testimonials.length > 0 ? testimonials : mockTestimonials as any).slice(0,4).map((t: any, idx: number) => (
              <div key={t.id} className="bg-white rounded-lg border border-[#E8DDD0] p-5 space-y-3 flex flex-col justify-between shadow-sm hover-lift" data-aos="fade-up" data-aos-delay={idx * 80}>"""

new_grid_start = """          <div className="relative group">
            <button 
              onClick={() => scroll('left')} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white border border-[#E8DDD0] rounded-full p-2 shadow-md text-[#2B2521] hover:text-[#B12B2B] hover:border-[#B12B2B] transition-colors hidden md:block opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white border border-[#E8DDD0] rounded-full p-2 shadow-md text-[#2B2521] hover:text-[#B12B2B] hover:border-[#B12B2B] transition-colors hidden md:block opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div 
              ref={scrollRef} 
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {(testimonials.length > 0 ? testimonials : mockTestimonials as any).map((t: any, idx: number) => (
                <div key={t.id} className="w-[85vw] sm:w-[320px] shrink-0 snap-center bg-white rounded-lg border border-[#E8DDD0] p-5 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay={idx * 50}>"""

content = content.replace(old_grid_start, new_grid_start)

# 5. Make sure the closing divs are matched
# old grid end is just </div> but since we wrapped it in <div className="relative group"> it needs another </div>
# The original code has:
#               </div>
#             ))}
#           </div>
# Let's replace the ending part
old_grid_end = """              </div>
            ))}
          </div>"""

new_grid_end = """              </div>
              ))}
            </div>
          </div>"""

content = content.replace(old_grid_end, new_grid_end)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)

print("Home.tsx patched for carousel")
