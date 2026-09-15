import React, { useState } from 'react';
import {
  Info,
  BookOpen,
  Edit2,
  Database,
  Code,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface AboutChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  content: string;
  highlights: string[];
}

const DEFAULT_ABOUT_CHAPTERS: AboutChapter[] = [
  {
    id: 'chapter-1-genesis',
    chapterNumber: 'Chapter I',
    title: 'The Genesis & The Three Founders',
    subtitle: 'From Ancient Trade Routes to Modern Tables',
    content:
      'Nutri Nova was born out of a shared passion among three visionaries: Senthil, Saravana, and Ms. Mohana Rose Gill. Together, they recognized that modern industrial food systems had severed the bond between pure, unadulterated harvests and human vitality. Driven by a mission to bridge generational culinary wisdom with verifiable laboratory purity, they founded Nutri Nova.',
    highlights: [
      'Founded on single-estate direct sourcing agreements',
      'Zero synthetic additives, emulsifiers, or deodorizers',
      'Central Asian & Mediterranean historic farm partnerships',
    ],
  },
  {
    id: 'chapter-2-standards',
    chapterNumber: 'Chapter II',
    title: 'The Tripartite Standard',
    subtitle: 'Triple-Tiered Integrity Verification',
    content:
      'Every provision entering the Nutri Nova portfolio undergoes our rigorous Tripartite Standard: First, Single-Estate Geographical Origin Validation; Second, ISO-certified spectral purity and multi-residue screening; Third, Cold-Chain and UV-shielded packaging to preserve living enzyme structures.',
    highlights: [
      'Tier 1: Single-Estate Geographical Origin & Soil Health',
      'Tier 2: Comprehensive Laboratory Screenings',
      'Tier 3: Emerald UV-Shielded Glass & Cold Protection',
    ],
  },
  {
    id: 'chapter-3-royal-validation',
    chapterNumber: 'Chapter III',
    title: 'The Miracle Tree & A Royal Validation',
    subtitle: 'Ms. Mohana Rose Gill & Moringa Wisdom',
    content:
      'Ms. Mohana Rose Gill—celebrated international author, Gourmand World Cookbook Awards Hall of Fame inductee, and recipient of the Nobel Peace Prize recommendation for health literature—champions Nutri Nova’s commitment to Moringa oleifera and ancient curative botanicals. Her research and royal audience validations illuminate our product selection.',
    highlights: [
      'Gourmand World Cookbook Hall of Fame',
      'Published author of Moringa: The Miracle Tree',
      'Official website: mohanagill.com',
    ],
  },
  {
    id: 'chapter-4-governance',
    chapterNumber: 'Chapter IV',
    title: 'Founders Synergy & Governance',
    subtitle: 'Integrity Led by Experienced Stewards',
    content:
      'Our governance model ensures that every harvest decision remains independent of speculative commodity markets. Senthil oversees agricultural partnerships across Uzbekistan and Greece, Saravana directs global cold-chain logistics, and Ms. Mohana Rose Gill steers educational and nutritional standards.',
    highlights: [
      'Long-term family grower contracts',
      'Full provenance traceability from seed to shelf',
      'Direct consumer education through published literature',
    ],
  },
];

export const AdminAboutView: React.FC = () => {
  const [chapters] = useState<AboutChapter[]>(DEFAULT_ABOUT_CHAPTERS);
  const [selectedChapter, setSelectedChapter] = useState<AboutChapter | null>(null);
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlSchemaCode = `-- Supabase Table Definition for About Us Editorial Chapters
CREATE TABLE IF NOT EXISTS public.about_sections (
  id TEXT PRIMARY KEY,
  chapter_number TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.about_sections ENABLE ROW LEVEL SECURITY;

-- Public can read all editorial sections
CREATE POLICY "Public can read about sections"
  ON public.about_sections FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authorized admins can update about sections
CREATE POLICY "Admins can update about sections"
  ON public.about_sections FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.id = auth.uid()));`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
            About Us Editorial Chapters
          </h1>
          <p className="text-xs sm:text-sm text-[#67776B]">
            Company history, founding philosophy, and brand story management.
          </p>
        </div>

        <button
          onClick={() => setShowSqlSchema(!showSqlSchema)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D5CDBF] text-xs font-medium text-[#4D6053] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <Code className="w-3.5 h-3.5" />
          <span>{showSqlSchema ? 'Hide SQL Schema' : 'View SQL Schema'}</span>
        </button>
      </div>

      {/* SQL Schema Accordion */}
      {showSqlSchema && (
        <div className="p-5 rounded-2xl bg-[#14221A] text-[#FAF8F5] border border-[#2E4536] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8FD5AC]">
              <Database className="w-4 h-4" />
              <span>Expected Supabase SQL Schema for About Us</span>
            </div>
            <button
              onClick={copySqlToClipboard}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#233A2D] hover:bg-[#2F4D3C] text-[11px] font-mono text-[#D8EADB] transition-colors cursor-pointer"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-[#5AC282]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
            </button>
          </div>
          <pre className="text-[11px] font-mono text-[#C4D9CC] bg-[#0E1712] p-3.5 rounded-xl overflow-x-auto leading-relaxed border border-[#1F3327]">
            {sqlSchemaCode}
          </pre>
        </div>
      )}

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            className="bg-white p-6 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4 hover:border-[#CAD8CE] transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#FAF0E3] text-[#915B17] text-[10px] font-semibold uppercase tracking-wider">
                  {ch.chapterNumber}
                </span>
                <button
                  onClick={() => setSelectedChapter(ch)}
                  className="p-1.5 rounded-lg text-[#234A38] hover:bg-[#EAE3D5] transition-colors cursor-pointer"
                  title="Inspect Section"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#18261E]">
                {ch.title}
              </h3>
              <div className="text-xs font-medium text-[#738377]">
                {ch.subtitle}
              </div>

              <p className="text-xs text-[#4F6255] leading-relaxed pt-2">
                {ch.content}
              </p>
            </div>

            <div className="pt-3 border-t border-[#F0EBE0] space-y-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#738377]">
                Key Highlights
              </div>
              <ul className="space-y-1">
                {ch.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-[#2A3F33] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E543F]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect / Edit Chapter Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-[#E0D9C8]">
            <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#809184] uppercase">
                  {selectedChapter.chapterNumber}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#18261E]">
                  {selectedChapter.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChapter(null)}
                className="text-xs font-bold text-[#809184] hover:text-[#18261E] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4A5E50]">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D6] space-y-1">
                <div className="font-semibold text-[#18261E]">Chapter Subtitle:</div>
                <div>{selectedChapter.subtitle}</div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D6] space-y-1">
                <div className="font-semibold text-[#18261E]">Editorial Content:</div>
                <div className="leading-relaxed">{selectedChapter.content}</div>
              </div>

              <div className="p-3 bg-[#FFF9ED] rounded-xl border border-[#F0D59D] text-[#825316] text-[11px] leading-relaxed">
                When you create the <code className="font-mono bg-[#FAF0DB] px-1 py-0.5 rounded">about_sections</code> table in Supabase, this content will be dynamically editable directly from this dashboard.
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#4D6053] hover:bg-[#FAF8F5] border border-[#D5CDBF] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
