import React from 'react';
import { ArrowRight, Compass, ExternalLink } from 'lucide-react';
import { PageView } from '../types';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <article id="our-story-page" className="bg-[#FAF8F5] text-[#18261E] selection:bg-[#E59E2B]/25">
      {/* =========================================================================
          MASTHEAD / PROLOGUE
          ========================================================================= */}
      <header className="border-b border-[#EAE3D6] pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFE9DF] text-[#1A382B] text-xs font-semibold tracking-[0.2em] uppercase border border-[#E0D7C7]">
            <Compass className="w-3.5 h-3.5 text-[#C86A3E]" />
            <span>A Chronicle of Provenance &amp; Purpose</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#18261E] tracking-tight leading-[1.15]">
            The Nutri Nova Story: Precision, Pedigree, and a Royal Promise
          </h1>

          <div className="w-16 h-px bg-[#C86A3E] mx-auto my-6" />

          <p className="font-serif italic text-xl sm:text-2xl lg:text-[1.75rem] text-[#1A382B] leading-relaxed max-w-3xl mx-auto font-normal">
            “What happens when global academic precision, elite culinary curation, and a royal-approved wellness legacy unite?”
          </p>
        </div>
      </header>

      {/* Atmospheric Editorial Feature Visual */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-sm bg-[#F2EDE4] aspect-16/9 sm:aspect-21/9 relative">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1800&q=80"
            alt="Artisanal wholesome harvest arranged in natural morning sunlight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18261E]/80 via-[#18261E]/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.2em] text-[#F3C363] font-bold block mb-1">
                Global Curators of Optimal Health
              </span>
              <p className="text-sm sm:text-base text-[#E5EFE8] font-light leading-relaxed">
                Scouring the earth to meticulously select functional foods that represent the absolute “best of their kind.”
              </p>
            </div>
            <div className="hidden sm:block text-right text-xs text-[#BED2C5] uppercase tracking-widest font-mono">
              Provenance • Purity • Pedigree
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24 sm:space-y-32">
        {/* =========================================================================
            CHAPTER 1: OUR FOUNDATION: A CONVERGENCE OF MINDS
            ========================================================================= */}
        <section id="convergence-of-minds" className="space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7D8F83] block">
              Chapter I — Genesis
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#18261E] tracking-tight">
              Our Foundation: A Convergence of Minds
            </h2>
          </div>

          {/* Lead Narrative Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-[#2E3D34] leading-[1.8] font-normal">
            <p>
              Nutri Nova was born from a singular, vital mission: to prove that choosing a healthy lifestyle should never mean compromising on exceptional taste. The company is the strategic brainchild of <strong className="font-semibold text-[#18261E]">Henry Ong</strong> and <strong className="font-semibold text-[#18261E]">Charles Ng</strong>—two visionaries from vastly different worlds who joined forces to redefine the benchmarks of global wellness.
            </p>
          </div>

          {/* Editorial Spread: The Two Visionary Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-stretch">
            {/* Henry Ong */}
            <div className="p-8 rounded-2xl bg-[#F7F4EE] border border-[#E8E0D2] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A382B]">
                  <span className="w-2 h-2 rounded-full bg-[#1A382B]" />
                  <span>The Blueprint of Precision</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#18261E]">
                  Henry Ong
                </h3>
                <p className="text-xs font-medium text-[#718477]">
                  Visionary Founder of SIMCC
                </p>
                <div className="pt-2 text-sm sm:text-base text-[#3A4B40] leading-relaxed">
                  Henry brought the rigorous quality, strict standards, and analytical excellence that govern world-renowned science and mathematics competitions spanning over 50 countries.
                </div>
              </div>
              <div className="pt-4 border-t border-[#E3DACB] text-xs text-[#596E60] italic font-serif">
                “Analytical rigor governing global benchmarks across 50+ nations.”
              </div>
            </div>

            {/* Charles Ng */}
            <div className="p-8 rounded-2xl bg-[#F7F4EE] border border-[#E8E0D2] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C86A3E]">
                  <span className="w-2 h-2 rounded-full bg-[#C86A3E]" />
                  <span>The Culinary Pedigree</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#18261E]">
                  Charles Ng
                </h3>
                <p className="text-xs font-medium text-[#718477]">
                  Esteemed Gastronomy Pioneer (Culina Pte Ltd)
                </p>
                <div className="pt-2 text-sm sm:text-base text-[#3A4B40] leading-relaxed">
                  Charles brought decades of unmatched expertise in global ingredient sourcing and fine foods curation through Culina Pte Ltd, pioneering standards in premium gastronomy.
                </div>
              </div>
              <div className="pt-4 border-t border-[#E3DACB] text-xs text-[#596E60] italic font-serif">
                “Decades of fine food pedigree, epicurean sourcing, and taste mastery.”
              </div>
            </div>
          </div>

          {/* Editorial Takeaway / Mission */}
          <div className="p-8 rounded-2xl bg-white border border-[#EAE3D6] text-base sm:text-lg text-[#2E3D34] leading-[1.8]">
            <p>
              Together, they set out to treat wellness not as a chore, but as <strong className="text-[#18261E] font-semibold">life's ultimate mission</strong>. Their journey began with a commitment to act as global curators—scouring the earth to meticulously select functional foods that represent the absolute <em className="font-serif italic font-medium text-[#1A382B]">“best of their kind.”</em>
            </p>
          </div>
        </section>

        {/* Editorial Divider */}
        <div className="flex items-center justify-center gap-4 text-[#C86A3E]">
          <span className="w-12 h-px bg-[#E2D8C8]" />
          <span className="text-sm tracking-widest font-serif italic">§</span>
          <span className="w-12 h-px bg-[#E2D8C8]" />
        </div>

        {/* =========================================================================
            CHAPTER 2: THE MEDITERRANEAN GOLD STANDARD
            ========================================================================= */}
        <section id="mediterranean-gold-standard" className="space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7D8F83] block">
              Chapter II — Terroir &amp; Provenance
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#18261E] tracking-tight">
              The Mediterranean Gold Standard
            </h2>
          </div>

          <div className="text-base sm:text-lg text-[#2E3D34] leading-[1.8] space-y-6">
            <p>
              Our initial quest led us straight to the sun-drenched landscapes of the Mediterranean, a region celebrated globally for secrets to longevity and vibrant health. Nutri Nova proudly brought back its crown jewels:
            </p>
          </div>

          {/* Visual Showcase of the Mediterranean Crown Jewels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-[#F7F4EE] border border-[#E8E0D2] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block">
                Artisan Dairy
              </span>
              <h4 className="font-serif text-base font-bold text-[#18261E]">
                Authentic Greek Yogurt
              </h4>
              <p className="text-xs text-[#526458] leading-relaxed">
                Traditional strained craftsmanship, probiotic-dense culture, and velvety texture without thickeners.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F4EE] border border-[#E8E0D2] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C86A3E] block">
                Wild Harvest
              </span>
              <h4 className="font-serif text-base font-bold text-[#18261E]">
                Raw Greek Farm Honey
              </h4>
              <p className="text-xs text-[#526458] leading-relaxed">
                Unpasteurized, bioactive nectar from wild thyme, pine, and floral pastures preserving living enzymes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F4EE] border border-[#E8E0D2] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block">
                Deep Water
              </span>
              <h4 className="font-serif text-base font-bold text-[#18261E]">
                Mediterranean Seafood
              </h4>
              <p className="text-xs text-[#526458] leading-relaxed">
                Sustainably sourced from pristine Aegean waters, rich in natural omega-3 fatty acids and clean marine protein.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F4EE] border border-[#E8E0D2] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C86A3E] block">
                Cellular Defense
              </span>
              <h4 className="font-serif text-base font-bold text-[#18261E]">
                Pure Pomegranate &amp; Cherry
              </h4>
              <p className="text-xs text-[#526458] leading-relaxed">
                Organic, antioxidant-dense pure juices pressed from heirloom orchards with zero added sugar or preservatives.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F4EE] border border-[#E8E0D2] space-y-2 sm:col-span-2 lg:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A382B] block">
                Liquid Gold
              </span>
              <h4 className="font-serif text-base font-bold text-[#18261E]">
                Premium Extra Virgin Olive Oil
              </h4>
              <p className="text-xs text-[#526458] leading-relaxed">
                Cold-extracted single-estate oil packed with polyphenol antioxidants, celebrated for centuries as the cornerstone of vibrant longevity.
              </p>
            </div>
          </div>

          {/* The Narrative Turning Point */}
          <blockquote className="my-8 py-8 px-6 sm:px-10 border-l-2 border-[#1A382B] bg-[#F2EDE4] rounded-r-2xl space-y-3">
            <p className="font-serif italic text-lg sm:text-xl text-[#18261E] leading-relaxed">
              “But for Nutri Nova, a global search for optimal health is never complete. Precision and culinary pedigree were merely the foundation. To truly elevate our mission, we needed a heart—and a miracle.”
            </p>
          </blockquote>
        </section>

        {/* Editorial Divider */}
        <div className="flex items-center justify-center gap-4 text-[#C86A3E]">
          <span className="w-12 h-px bg-[#E2D8C8]" />
          <span className="text-sm tracking-widest font-serif italic">§</span>
          <span className="w-12 h-px bg-[#E2D8C8]" />
        </div>

        {/* =========================================================================
            CHAPTER 3: THE MIRACLE TREE & A ROYAL VALIDATION
            ========================================================================= */}
        <section id="miracle-tree-royal-validation" className="space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7D8F83] block">
              Chapter III — Legacy &amp; Royalty
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#18261E] tracking-tight">
              The Miracle Tree &amp; A Royal Validation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* Left Column: Flowing Narrative Text */}
            <div className="space-y-5 sm:space-y-6 text-base text-[#2E3D34] leading-[1.8] font-normal lg:pr-2">
              <p>
                To anchor our next frontier in superfood nutrition, Nutri Nova formed an exclusive partnership with <strong className="font-semibold text-[#18261E]">Ms Mohana Rose Gill</strong>, a monumental force in natural wellness. An internationally acclaimed, nine-time Gourmand World Award-winning culinary author, Mohana has dedicated her lifetime to unlocking the extraordinary powers of Moringa—fondly known as the <em className="font-serif italic font-medium text-[#1A382B]">“Miracle Tree.”</em>
              </p>

              <p>
                For Mohana, Moringa is not a passing trend; it is a living legacy that traces back eight decades to her childhood kitchen in Myanmar, where her mother cooked with its nutrient-dense leaves.
              </p>

              <p>
                Today, her lifelong devotion to sharing this 90+ nutrient powerhouse through her definitive masterwork, <em className="font-serif italic font-medium text-[#18261E]">Moringalicious</em>, has captured global attention—culminating in an official, historic audience at the Palace to discuss Moringa and present her products directly to the <strong className="font-semibold text-[#18261E]">Malaysia Queen</strong>.
              </p>

              <div className="pt-2">
                <a
                  href="https://mohanagill.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#18261E] hover:text-[#C86A3E] transition-colors border-b border-[#18261E]/25 hover:border-[#C86A3E] pb-0.5 group w-fit cursor-pointer"
                >
                  <span>Visit official website</span>
                  <span className="text-[#7D8F83] group-hover:text-[#C86A3E] font-normal transition-colors">→ mohanagill.com</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#7D8F83] group-hover:text-[#C86A3E] transition-transform group-hover:translate-x-0.5 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Ms. Mohana Rose Gill Portrait Photos */}
            <div className="space-y-8 sm:space-y-10">
              <figure className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm bg-[#F4EFE6]">
                  <img
                    src="/assets/mohana-rose-gill.jpg"
                    alt="Ms. Mohana Rose Gill presenting her published works and achievements"
                    className="w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <figcaption className="text-xs text-[#6E7F73] text-center font-serif italic leading-relaxed">
                  Ms. Mohana Rose Gill presenting her published works and achievements.
                </figcaption>
              </figure>

              <figure className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-[#E6DEC8] shadow-sm bg-[#F4EFE6]">
                  <img
                    src="/assets/mohana-rose-gill2.jpg"
                    alt="Ms. Mohana Rose Gill with her international awards and published works"
                    className="w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <figcaption className="text-xs text-[#6E7F73] text-center font-serif italic leading-relaxed">
                  Ms. Mohana Rose Gill showcasing her published works and international achievements.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Editorial Divider */}
        <div className="flex items-center justify-center gap-4 text-[#C86A3E]">
          <span className="w-12 h-px bg-[#E2D8C8]" />
          <span className="text-sm tracking-widest font-serif italic">§</span>
          <span className="w-12 h-px bg-[#E2D8C8]" />
        </div>

        {/* =========================================================================
            CHAPTER 4: BRIDGING HERITAGE WITH MODERN LONGEVITY
            ========================================================================= */}
        <section id="bridging-heritage-modern-longevity" className="space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7D8F83] block">
              Chapter IV — The Synthesis
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#18261E] tracking-tight">
              Bridging Heritage with Modern Longevity
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-[#2E3D34] leading-[1.8] font-normal">
            <p>
              Through this unparalleled synergy, Nutri Nova seamlessly bridges the structural credibility of its founders with the heritage, wisdom, and royal-approved prestige of Mohana’s culinary legacy.
            </p>
          </div>
      {/* Final Manifesto Statement */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF6F0] border border-[#E0D7C7] text-center space-y-6">
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#18261E] leading-snug max-w-3xl mx-auto">
              “We take nature’s finest wellness gifts—validated by analytical science, perfected by culinary pioneers, and celebrated by royalty—and deliver them straight to your table.”
            </p>

            <div className="w-12 h-px bg-[#C86A3E] mx-auto" />

            <p className="text-base sm:text-lg text-[#1A382B] font-semibold italic font-serif max-w-2xl mx-auto">
              “Because staying healthy is the most important mission in our life. And our passionate search continues.”
            </p>
          </div>
        </section>

        {/* =========================================================================
            INVITATION & CATALOGUE ACCESS
            ========================================================================= */}
        <section className="pt-8 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#18261E]">
              Experience the Curated Collection
            </h4>
            <p className="text-xs sm:text-sm text-[#5B6D62]">
              Explore our functional Mediterranean foods, mineral waters, pure nectars, and superfoods.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 rounded-full bg-[#1A382B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#254F3D] transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full border border-[#D5CABE] text-[#18261E] text-xs font-bold uppercase tracking-wider hover:bg-[#EFE9DF] transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
