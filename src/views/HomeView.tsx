import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, PageView } from '../types';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectProduct: (product: Product) => void;
  onInquireProduct?: (product: Product) => void;
  products?: Product[];
}

interface SlideData {
  id: string;
  label: string;
  heading: string;
  supportingText: string;
  ctaText: string;
  ctaAction: () => void;
  image: string;
  imageAlt: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  // =========================================================================
  // 1. HERO SLIDESHOW DATA & STATE
  // =========================================================================
  const slides: SlideData[] = [
    {
      id: 'slide-pure-everyday',
      label: 'NUTRI NOVA',
      heading: 'Something Pure for Every Day',
      supportingText:
        'Thoughtfully curated foods and natural products selected for quality, taste, and everyday enjoyment.',
      ctaText: 'Explore Catalogue',
      ctaAction: () => onNavigate('products'),
      image:
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1920&q=85',
      imageAlt: 'Nutri Nova Mediterranean harvest with wholesome foods, olive oil, and fresh orchard produce',
    },
    {
      id: 'slide-juices-nectars',
      label: 'PURE JUICES & NECTARS',
      heading: 'Nature, Bottled at Its Best',
      supportingText:
        'Discover carefully selected juices and nectars made to bring natural goodness to the everyday table.',
      ctaText: 'Explore Juices',
      ctaAction: () => {
        onSelectCategory('juices');
        onNavigate('products');
      },
      image:
        'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1920&q=85',
      imageAlt: 'Sun-ripened pure orchard fruits and cold-pressed juices',
    },
    {
      id: 'slide-nuts-snacks',
      label: 'PREMIUM NUTS & SNACKS',
      heading: 'Simple Ingredients. Exceptional Taste.',
      supportingText:
        'Wholesome snacks and carefully selected ingredients for everyday moments.',
      ctaText: 'Explore Products',
      ctaAction: () => {
        onSelectCategory('nuts');
        onNavigate('products');
      },
      image:
        'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1920&q=85',
      imageAlt: 'Selected mountain terrace almonds, dried nuts, and wholesome seeds',
    },
    {
      id: 'slide-mediterranean-selection',
      label: 'MEDITERRANEAN SELECTION',
      heading: 'From Exceptional Origins',
      supportingText:
        'Discover carefully sourced foods inspired by the richness and heritage of Mediterranean producers.',
      ctaText: 'View Catalogue',
      ctaAction: () => onNavigate('products'),
      image:
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1920&q=85',
      imageAlt: 'Generational Mediterranean olive groves and pure cold-pressed extra virgin olive oil',
    },
    {
      id: 'slide-pantry-table',
      label: 'NUTRI NOVA',
      heading: 'From Pantry to Everyday Table',
      supportingText:
        'Discover simple ways to enjoy thoughtfully selected products in everyday life.',
      ctaText: 'Discover More',
      ctaAction: () => onNavigate('about'),
      image:
        'https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=1920&q=85',
      imageAlt: 'Warm kitchen culinary table with natural whole food ingredients',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Automatic slide rotation (every 5 seconds when not paused)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      if (diffX > 45) {
        nextSlide();
      } else if (diffX < -45) {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setIsPaused(false);
  };

  return (
    <div className="w-full overflow-hidden bg-[#FAF8F5] text-[#18261E]">
      {/* =========================================================================
          1. MODERN DYNAMIC SLIDESHOW / HERO CAROUSEL
          ========================================================================= */}
      <section
        id="hero-slideshow"
        aria-label="Nutri Nova Showcase Slideshow"
        className="relative w-full h-[70vh] min-h-[500px] max-h-[740px] sm:h-[75vh] lg:h-[80vh] overflow-hidden bg-[#12231A]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Stack */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              id={`slide-${index}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Photography */}
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover object-center"
              />

              {/* Natural Editorial Dark/Warm Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12231A]/90 via-[#12231A]/60 to-[#12231A]/35 sm:bg-gradient-to-r sm:from-[#12231A]/90 sm:via-[#12231A]/65 sm:to-transparent" />

              {/* Slide Content Layer */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl space-y-4 sm:space-y-6 text-left">
                    {/* Small Category / Brand Label */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5]/15 backdrop-blur-sm border border-[#FAF8F5]/25 text-[#E59E2B] text-xs font-bold tracking-[0.2em] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E59E2B]" />
                      <span>{slide.label}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF8F5] leading-[1.12] tracking-tight">
                      {slide.heading}
                    </h1>

                    {/* Supporting Editorial Paragraph */}
                    <p className="text-sm sm:text-base lg:text-lg text-[#E0ECE3] leading-relaxed font-normal max-w-xl">
                      {slide.supportingText}
                    </p>

                    {/* Primary CTA */}
                    <div className="pt-2 sm:pt-4">
                      <button
                        id={`slide-cta-${index}`}
                        onClick={slide.ctaAction}
                        className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-[#E59E2B] text-[#18261E] text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#F2B64B] transition-all shadow-md hover:shadow-lg cursor-pointer group"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous / Next Arrow Controls */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between pointer-events-none px-3 sm:px-6">
          <button
            id="hero-slideshow-prev"
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#12231A]/60 hover:bg-[#12231A]/90 text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            id="hero-slideshow-next"
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#12231A]/60 hover:bg-[#12231A]/90 text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20 flex items-center justify-center gap-2.5">
          {slides.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={index}
                id={`hero-slideshow-dot-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 bg-[#E59E2B]'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          2. SOMETHING PURE FOR EVERY ROUTINE (Clean Editorial Section)
          ========================================================================= */}
      <section
        id="categories-editorial-section"
        className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] border-b border-[#EAE3D6]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#66786C]">
            OUR CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18261E] tracking-tight">
            Something Pure for Every Routine
          </h2>
          <p className="text-base sm:text-lg text-[#4E5F54] max-w-2xl mx-auto leading-relaxed">
            From morning revitalization to evening cooking, explore thoughtful pantry staples curated for balance and joy.
          </p>
          <div className="pt-3">
            <button
              id="editorial-explore-cta"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A382B] hover:text-[#12261D] transition-colors group cursor-pointer border-b-2 border-[#1A382B] pb-1 hover:border-[#D68C2D]"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D68C2D]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EDITORIAL STORY SECTION: FROM ORIGIN TO TABLE (Our Story & Heritage)
          ========================================================================= */}
      <section
        id="why-nutri-nova-section"
        className="bg-[#1A382B] text-[#FAF8F5] py-20 md:py-28 border-b border-[#12261D]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Visual */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[#2E543F] bg-[#12261D]">
                <img
                  src="https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=1000&q=80"
                  alt="Wholesome Mediterranean table with fresh orchard ingredients and natural light"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quality Seal Note */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-6 sm:right-6 bg-[#FAF8F5] text-[#18261E] px-5 py-3.5 rounded-2xl shadow-xl border border-[#E3DACB] text-xs font-bold">
                <span className="text-[#1A382B] block">Precision, Pedigree &amp; Royalty</span>
                <span className="text-[11px] font-normal text-[#5B6D62]">SIMCC • Culina • Royal Heritage</span>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#E59E2B]">
                OUR STORY &amp; HERITAGE
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF8F5] leading-tight">
                Precision, Pedigree, and a Royal Promise.
              </h2>

              <p className="text-base sm:text-lg text-[#D0E2D6] leading-relaxed font-normal">
                What happens when global academic precision, elite culinary curation, and a royal-approved wellness legacy unite? Nutri Nova was born to prove that choosing a healthy lifestyle should never mean compromising on exceptional taste.
              </p>

              {/* 3 Story Points */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#E59E2B] text-[#18261E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F5]">The Blueprint of Precision</h4>
                    <p className="text-xs text-[#BED2C5] leading-relaxed mt-0.5">
                      Henry Ong (SIMCC founder) brings analytical rigor and quality standards governing science competitions in 50+ countries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#E59E2B] text-[#18261E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F5]">The Culinary Pedigree</h4>
                    <p className="text-xs text-[#BED2C5] leading-relaxed mt-0.5">
                      Charles Ng (Culina Pte Ltd pioneer) brings decades of fine gastronomy expertise and world-class ingredient curation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#E59E2B] text-[#18261E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF8F5]">The Royal Validation</h4>
                    <p className="text-xs text-[#BED2C5] leading-relaxed mt-0.5">
                      Partnered with 9-time Gourmand Award winner Ms Mohana Rose Gill, presenting the 90+ nutrient Moringa directly to the Malaysia Queen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Story CTA Button */}
              <div className="pt-3">
                <button
                  id="story-cta-btn"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E59E2B] text-[#18261E] text-xs font-bold uppercase tracking-wider hover:bg-[#F2B64B] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Read The Full Nutri Nova Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FOUNDERS SPOTLIGHT / OUR GENESIS (Academic Precision Meets Culinary Curation)
          ========================================================================= */}
      <section
        id="founders-preview-section"
        className="py-20 md:py-26 bg-[#F5EFEB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#66786C] block">
                OUR GENESIS
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18261E] leading-tight">
                Academic Precision Meets Culinary Curation.
              </h2>

              <p className="text-base sm:text-lg text-[#47574D] leading-relaxed font-normal">
                Nutri Nova represents an unexpected convergence between <strong>Henry Ong</strong> (visionary founder of SIMCC, establishing scientific quality standards across 50+ nations) and <strong>Charles Ng</strong> (esteemed gastronomy pioneer behind Culina Pte Ltd).
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  id="brand-story-cta-btn"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1A382B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider hover:bg-[#12261D] transition-all shadow-xs cursor-pointer group"
                >
                  <span>Read the Full Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E59E2B]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-7 border border-[#E3DACB] shadow-2xs space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A382B] bg-[#EDF3EF] px-2.5 py-1 rounded-full">
                    Scientific Precision
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#18261E]">
                    Henry Ong
                  </h3>
                  <p className="text-xs text-[#526458] leading-relaxed">
                    Founder of SIMCC, bringing analytical benchmarks and strict purity audits established across international competitions in over 50 countries.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-7 border border-[#E3DACB] shadow-2xs space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D68C2D] bg-[#FDF6EA] px-2.5 py-1 rounded-full">
                    Culinary Pedigree
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#18261E]">
                    Charles Ng
                  </h3>
                  <p className="text-xs text-[#526458] leading-relaxed">
                    Gastronomy pioneer (Culina Pte Ltd) with decades of experience sourcing fine ingredients and curating world-renowned gourmet provisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
