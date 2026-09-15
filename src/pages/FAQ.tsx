import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { mockFAQs } from '../data/faqs';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [mockFAQs[0]?.id || '']: true
  });
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'General', 'Courses', 'Training', 'Healing & Therapy', 'Branches'];

  const toggle = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = selectedCat === 'All' 
    ? mockFAQs 
    : mockFAQs.filter(f => f.category === selectedCat);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | JADMAA Varmakalai"
        description="Find answers to common questions about Varmakalai martial arts, age requirements, course enrollment, certificates, and branch locations."
      />

      <section className="bg-jadmaa-cream py-12 border-b border-jadmaa-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 reveal-on-scroll">
          <span className="text-xs font-bold text-jadmaa-red uppercase tracking-wider">
            Help Center
          </span>
          <h1 className="font-heading font-extrabold text-4xl text-jadmaa-charcoal">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-jadmaa-textMuted max-w-2xl">
            Everything you need to know about traditional Varmakalai training, admissions, healing therapies, and branch operations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-jadmaa-border text-left min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 reveal-on-scroll">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedCat === cat 
                    ? 'bg-jadmaa-red text-white shadow' 
                    : 'bg-jadmaa-cream text-jadmaa-charcoal hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion list */}
          <div className="space-y-4 reveal-stagger">
            {filtered.map(faq => {
              const isOpen = !!openItems[faq.id];
              return (
                <div 
                  key={faq.id}
                  className="reveal-child border border-jadmaa-border rounded-2xl bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between bg-jadmaa-cream/40 hover:bg-jadmaa-cream transition-colors space-x-4"
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-jadmaa-red flex-shrink-0" />
                      <h3 className="font-heading font-extrabold text-base text-jadmaa-charcoal">
                        {faq.question}
                      </h3>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-3 text-xs text-jadmaa-textMuted leading-relaxed border-t border-gray-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};
