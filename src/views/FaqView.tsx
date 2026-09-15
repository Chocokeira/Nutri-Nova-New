import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Search,
  ArrowRight,
} from 'lucide-react';
import { FAQS, FAQ_CATEGORIES } from '../data/faq';
import { PageView, FaqCategory } from '../types';

interface FaqViewProps {
  onNavigate: (page: PageView) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | FaqCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0]?.id || 'faq-prod-1']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchCat = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="faq-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F3ECE1] text-[#1A382B] text-xs font-semibold tracking-wider uppercase border border-[#E3DACB]">
          <span>KNOWLEDGE &amp; SOURCING FAQ</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#18261E] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-[#47574D] max-w-xl mx-auto leading-relaxed font-normal">
          Clear answers regarding Nutri Nova single-estate harvests, mineral preservation, storage care, and corporate sourcing.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-[#718477] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions, provenance, or ingredients..."
          className="w-full bg-white border border-[#E0D7C8] rounded-full pl-10 pr-4 py-3 text-xs sm:text-sm text-[#18261E] placeholder-[#7E8E82] focus:outline-hidden focus:border-[#1A382B] shadow-2xs transition-colors"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {FAQ_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                active
                  ? 'bg-[#1A382B] text-[#FAF8F5] shadow-xs'
                  : 'bg-white border border-[#E0D7C8] text-[#425046] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordions List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#EBE4D8] p-8 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#18261E]">
              No questions found
            </h3>
            <p className="text-xs sm:text-sm text-[#6C7E72]">
              We couldn't find any questions matching "{searchQuery}". Try another keyword or reset the filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-[#1A382B] text-[#FAF8F5] text-xs font-bold hover:bg-[#12261D] transition-colors shadow-2xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-2xl border border-[#EBE4D8] overflow-hidden transition-all duration-200 shadow-xs hover:border-[#1A382B]/30"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#EDF3EF] text-[#1A382B] w-fit">
                      {faq.category}
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#18261E]">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="p-1 rounded-full bg-[#FAF8F5] text-[#1A382B] shrink-0 border border-[#EAE3D6]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#47574D] leading-relaxed border-t border-[#F2EDE4] whitespace-pre-line animate-in fade-in duration-200 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Card */}
      <div className="bg-[#F5EFEB] rounded-3xl p-8 sm:p-10 border border-[#E5DDD0] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-[#1A382B] font-serif font-bold text-lg">
            <span>Still Have Questions?</span>
          </div>
          <p className="text-xs sm:text-sm text-[#47574D] font-normal">
            Our corporate sourcing team is delighted to assist with any questions regarding product specifications or wholesale terms.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-7 py-3.5 rounded-full bg-[#1A382B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider hover:bg-[#12261D] transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4 text-[#E59E2B]" />
        </button>
      </div>
    </div>
  );
};
