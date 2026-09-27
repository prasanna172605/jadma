import sys

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

# 1. Add CountUp Import
if "import { CountUp }" not in c:
    c = c.replace(
        "import { reviewsApi, type Testimonial } from '../lib/api/reviewsApi';",
        "import { reviewsApi, type Testimonial } from '../lib/api/reviewsApi';\nimport { CountUp } from '../components/common/CountUp';"
    )

# 2. Replace numbers with CountUp
c = c.replace(
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]">1,000+</div>',
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]"><CountUp end={1000} suffix="+" /></div>'
)
c = c.replace(
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]">3</div>',
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]"><CountUp end={3} /></div>'
)
c = c.replace(
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]">7</div>',
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]"><CountUp end={7} /></div>'
)
c = c.replace(
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]">15+</div>',
    '<div className="font-heading font-bold text-2xl sm:text-3xl text-[#2B2521]"><CountUp end={15} suffix="+" /></div>'
)

# 3. Testimonials Marquee
pattern = """          <div className="relative group">
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

replacement = """          <div className="relative overflow-hidden group">
            {/* Fade effect at the edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF6F0] to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10"></div>
            
            <div className="flex animate-marquee min-w-max gap-6 pb-4 hover:[animation-play-state:paused]">
              {[...(testimonials.length > 0 ? testimonials : mockTestimonials as any), ...(testimonials.length > 0 ? testimonials : mockTestimonials as any)].map((t: any, idx: number) => (
                <div key={`${t.id}-${idx}`} className="w-[85vw] sm:w-[350px] shrink-0 bg-white rounded-lg border border-[#E8DDD0] p-5 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">"""

c = c.replace(pattern, replacement)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)

print("Final patch applied")
