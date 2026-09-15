import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  Database,
  CheckCircle2,
  AlertCircle,
  Save,
  Code,
  Copy,
  Check,
} from 'lucide-react';
import { FaqItem, FaqCategory } from '../../types';
import { faqService } from '../../services/faqService';
import { isSupabaseConfigured } from '../../services/supabase';

const FAQ_CATEGORIES: FaqCategory[] = [
  'Products',
  'Ingredients',
  'Nutrition',
  'Ordering',
  'Shipping',
  'Storage',
  'General',
];

export const AdminFaqView: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [feedback, setFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  // Edit / Add modal or drawer
  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const res = await faqService.getFaqs();
      setFaqs(res.faqs);
      setIsFromSupabase(res.isFromSupabase);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const filteredFaqs = faqs.filter((f) => {
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      setFeedback({ text: 'Question and answer are required.', isError: true });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      const res = await faqService.saveFaq(editingFaq);
      if (res.error) {
        setFeedback({ text: res.error, isError: true });
      } else {
        setFeedback({ text: 'FAQ item saved successfully!' });
        setEditingFaq(null);
        loadFaqs();
      }
    } catch (err) {
      setFeedback({ text: err instanceof Error ? err.message : 'Save failed', isError: true });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await faqService.deleteFaq(id);
      if (res.error) {
        setFeedback({ text: res.error, isError: true });
      } else {
        setFeedback({ text: 'FAQ deleted successfully!' });
        loadFaqs();
      }
    } catch (err) {
      setFeedback({ text: err instanceof Error ? err.message : 'Delete failed', isError: true });
    }
  };

  const handleSeedFaqs = async () => {
    if (!window.confirm('Sync default FAQ questions into your Supabase faqs table?')) return;
    setSaving(true);
    try {
      const res = await faqService.seedFaqs();
      if (res.error) {
        setFeedback({ text: res.error, isError: true });
      } else {
        setFeedback({ text: `Successfully synced ${res.count} FAQs to Supabase!` });
        loadFaqs();
      }
    } catch (err) {
      setFeedback({ text: err instanceof Error ? err.message : 'Seed failed', isError: true });
    } finally {
      setSaving(false);
    }
  };

  const sqlSchemaCode = `-- Supabase Table Definition for FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public can read all published FAQs
CREATE POLICY "Public can read published faqs"
  ON public.faqs FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Authorized admins in admin_users can manage FAQs
CREATE POLICY "Admins can manage faqs"
  ON public.faqs FOR ALL
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
            FAQ Content Management
          </h1>
          <p className="text-xs sm:text-sm text-[#67776B]">
            Manage frequently asked questions, answers, and consumer guidance categories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSqlSchema(!showSqlSchema)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D5CDBF] text-xs font-medium text-[#4D6053] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showSqlSchema ? 'Hide SQL Schema' : 'View SQL Schema'}</span>
          </button>

          {isSupabaseConfigured && (
            <button
              onClick={handleSeedFaqs}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#234A38] hover:bg-[#2F614B] text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sync Defaults to Supabase</span>
            </button>
          )}

          <button
            onClick={() =>
              setEditingFaq({
                id: `faq-${Date.now()}`,
                category: 'General',
                question: '',
                answer: '',
              })
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14221A] hover:bg-[#20382B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Item</span>
          </button>
        </div>
      </div>

      {/* SQL Schema Accordion */}
      {showSqlSchema && (
        <div className="p-5 rounded-2xl bg-[#14221A] text-[#FAF8F5] border border-[#2E4536] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8FD5AC]">
              <Database className="w-4 h-4" />
              <span>Expected Supabase SQL Schema for FAQs</span>
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

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between gap-3 ${
            feedback.isError
              ? 'bg-[#FDF2F0] border border-[#F5C2BA] text-[#A62C1E]'
              : 'bg-[#EDF8F1] border border-[#C6EBD3] text-[#1E6838]'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E0D9C8] shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#809184]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by question or answer keywords..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] placeholder-[#9CA99E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] cursor-pointer"
        >
          <option value="all">All Categories ({faqs.length})</option>
          {FAQ_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat} ({faqs.filter((f) => f.category === cat).length})
            </option>
          ))}
        </select>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white p-5 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-2 hover:border-[#CAD8CE] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#FAF0E3] text-[#915B17] text-[10px] font-semibold uppercase tracking-wider">
                  {faq.category}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#18261E]">
                  {faq.question}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setEditingFaq(faq)}
                  className="p-1.5 rounded-lg text-[#234A38] hover:bg-[#EAE3D5] transition-colors cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="p-1.5 rounded-lg text-[#B83E31] hover:bg-[#FBEBE8] transition-colors cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[#526458] leading-relaxed pt-1">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingFaq && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-[#E0D9C8]">
            <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#18261E]">
                {editingFaq.id?.startsWith('faq-') ? 'Edit FAQ Item' : 'Add FAQ Item'}
              </h3>
              <button
                onClick={() => setEditingFaq(null)}
                className="text-xs font-bold text-[#809184] hover:text-[#18261E] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Category
                </label>
                <select
                  value={editingFaq.category || 'General'}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, category: e.target.value as FaqCategory })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] cursor-pointer"
                >
                  {FAQ_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="e.g. Are product ingredients listed on packaging?"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  placeholder="Comprehensive response providing wholesome clarity..."
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#4D6053] hover:bg-[#FAF8F5] border border-[#D5CDBF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-[#14221A] hover:bg-[#20382B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
