import { supabase, isSupabaseConfigured } from './supabase';
import { FaqItem, FaqCategory } from '../types';
import { FAQS } from '../data/faq';

export const faqService = {
  async getFaqs(): Promise<{ faqs: FaqItem[]; isFromSupabase: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { faqs: FAQS, isFromSupabase: false };
    }

    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return { faqs: FAQS, isFromSupabase: false, error: error?.message };
      }

      const faqs: FaqItem[] = data.map((row) => ({
        id: String(row.id),
        category: row.category as FaqCategory,
        question: row.question,
        answer: row.answer,
      }));

      return { faqs, isFromSupabase: true };
    } catch {
      return { faqs: FAQS, isFromSupabase: false };
    }
  },

  async saveFaq(faq: Partial<FaqItem>): Promise<{ success: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured' };
    }

    try {
      const id = faq.id || `faq-${Date.now()}`;
      const { error } = await supabase.from('faqs').upsert({
        id,
        category: faq.category || 'General',
        question: faq.question || '',
        answer: faq.answer || '',
        updated_at: new Date().toISOString(),
      });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Save FAQ failed' };
    }
  },

  async deleteFaq(id: string): Promise<{ success: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured' };
    }

    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Delete FAQ failed' };
    }
  },

  async seedFaqs(): Promise<{ count: number; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { count: 0, error: 'Supabase is not configured' };
    }

    try {
      const rows = FAQS.map((f, idx) => ({
        id: f.id,
        category: f.category,
        question: f.question,
        answer: f.answer,
        sort_order: idx + 1,
        published: true,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('faqs').upsert(rows, { onConflict: 'id' });
      if (error) return { count: 0, error: error.message };
      return { count: rows.length };
    } catch (err) {
      return { count: 0, error: err instanceof Error ? err.message : 'Seeding FAQs failed' };
    }
  },
};
