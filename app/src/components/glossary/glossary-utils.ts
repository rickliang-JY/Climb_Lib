import { glossaryTerms, glossaryCategories } from '@/data/glossary';
import type { GlossaryTerm, GlossaryCategory } from '@/data/glossary';
import { holdTypes } from '@/data/holds';
import type { HoldColor } from '@/components/shared/HoldDot';

/** Functional hold-color per glossary category (design.md §2.2 — small badges only). */
export const CATEGORY_DOT: Record<GlossaryCategory, HoldColor> = {
  movement: 'hold-orange',
  holds: 'hold-amber',
  equipment: 'hold-slate',
  safety: 'moss',
  grading: 'hold-rose',
  style: 'hold-plum',
  route: 'hold-sage',
  culture: 'clay',
};

/** All terms sorted alphabetically by the English term (case-insensitive). */
export const sortedTerms: GlossaryTerm[] = [...glossaryTerms].sort((a, b) =>
  a.term.toLowerCase().localeCompare(b.term.toLowerCase()),
);

export function categoryLabel(category: GlossaryCategory, lang: 'zh' | 'en'): string {
  const c = glossaryCategories.find((g) => g.id === category);
  if (!c) return category;
  return lang === 'zh' ? c.labelZh : c.labelEn.toUpperCase();
}

/**
 * Full-text fuzzy match: every whitespace-separated query word must appear
 * (case-insensitive substring) in the English term, abbr, Chinese gloss or
 * either definition.
 */
export function matchesQuery(term: GlossaryTerm, query: string): boolean {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack =
    `${term.term} ${term.abbr ?? ''} ${term.zh} ${term.defZh} ${term.defEn}`.toLowerCase();
  return words.every((w) => haystack.includes(w));
}

/** Case-insensitive exact lookup by English term (used for ?term= deep links). */
export function findTerm(name: string | null): GlossaryTerm | undefined {
  if (!name) return undefined;
  const needle = name.trim().toLowerCase();
  if (!needle) return undefined;
  return glossaryTerms.find((t) => t.term.toLowerCase() === needle);
}

/**
 * Related terms: nearest alphabetical neighbours inside the same category.
 * The data file has no explicit `related` field, so we derive it.
 */
export function relatedTerms(term: GlossaryTerm, count = 4): GlossaryTerm[] {
  const pool = sortedTerms.filter((t) => t.category === term.category);
  const i = pool.findIndex((t) => t.term === term.term);
  const result: GlossaryTerm[] = [];
  let l = i - 1;
  let r = i + 1;
  while (result.length < count && (l >= 0 || r < pool.length)) {
    if (r < pool.length) {
      result.push(pool[r]);
      r += 1;
    }
    if (result.length < count && l >= 0) {
      result.push(pool[l]);
      l -= 1;
    }
  }
  return result;
}

const HOLD_IDS = new Set(holdTypes.map((h) => h.id));

/** 3D hold-model id for Holds-category terms, when a matching model exists. */
export function holdIdFor(term: GlossaryTerm): string | null {
  if (term.category !== 'holds') return null;
  const id = term.term.toLowerCase().replace(/\s+/g, '-');
  return HOLD_IDS.has(id) ? id : null;
}

/** 1-based archive number of a term within the full sorted library. */
export function archiveNumber(term: GlossaryTerm): number {
  return sortedTerms.findIndex((t) => t.term === term.term) + 1;
}
