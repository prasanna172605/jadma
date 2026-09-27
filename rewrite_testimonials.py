import re

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

# We need to find the start of the Testimonials section and end of file.
pattern = r"\{/\*\ 9\.\ TESTIMONIALS SECTION \*/\}.*$"

replacement = """{/* 9. TESTIMONIALS SECTION */}
      <section className="py-16 bg-[#FAF6F0] border-b border-[#E8DDD0] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2" data-aos="fade-up">
            <span className="text-xs font-bold text-[#B12B2B] uppercase tracking-wider">
              STUDENT REVIEWS
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#2B2521]">
              What Our Students Say
            </h2>
          </div>

          <div className="relative group">
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
                <div key={t.id} className="w-[85vw] sm:w-[320px] shrink-0 snap-center bg-white rounded-lg border border-[#E8DDD0] p-5 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay={idx * 50}>
                  <div className="space-y-2">
                    <div className="flex text-amber-500">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#5C5148] italic leading-relaxed">"{t.content}"</p>
                  </div>
                  <div className="pt-2 border-t border-[#E8DDD0] flex items-center space-x-3">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#E8DDD0] flex items-center justify-center text-[#2B2521] font-bold text-xs">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-heading font-bold text-sm text-[#2B2521]">{t.name}</p>
                      <p className="text-[11px] text-[#5C5148]">{t.role}{t.location ? ` • ${t.location}` : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};"""

c = re.sub(pattern, replacement, c, flags=re.DOTALL)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(c)
