import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ArchiveTag from '@/components/shared/ArchiveTag';
import HoldDot from '@/components/shared/HoldDot';
import { useLanguage } from '@/i18n/LanguageContext';
import { getLenis } from '@/lib/lenis';
import { cn } from '@/lib/utils';
import { glossaryTerms, glossaryCategories } from '@/data/glossary';
import type { GlossaryTerm, GlossaryCategory } from '@/data/glossary';
import TermCard from '@/components/glossary/TermCard';
import TermDrawer from '@/components/glossary/TermDrawer';
import { sortedTerms, findTerm, matchesQuery } from '@/components/glossary/glossary-utils';

type CategoryFilter = GlossaryCategory | 'all';

/** Only the first batch of cards gets entrance animations — never 141 at once. */
const ANIMATED_BATCH = 16;

export default function GlossaryPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  /** True when the current ?term= entry was pushed by us (so close = history back). */
  const pushedRef = useRef(false);

  // ---- Derived data -------------------------------------------------------

  const filtered = useMemo(() => {
    const byCategory =
      category === 'all' ? sortedTerms : sortedTerms.filter((x) => x.category === category);
    if (!query.trim()) return byCategory;
    return byCategory.filter((x) => matchesQuery(x, query));
  }, [category, query]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<GlossaryCategory, number>();
    for (const x of glossaryTerms) counts.set(x.category, (counts.get(x.category) ?? 0) + 1);
    return counts;
  }, []);

  /** First card index of each letter within the filtered list. */
  const letterAnchors = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((x, i) => {
      const l = x.term.charAt(0).toUpperCase();
      if (!map.has(l)) map.set(l, i);
    });
    return map;
  }, [filtered]);

  const letters = useMemo(() => [...letterAnchors.keys()], [letterAnchors]);
  const lettersKey = letters.join('');

  // ---- Deep link: ?term=Heel%20Hook opens the drawer -----------------------

  const activeTerm = useMemo(() => findTerm(searchParams.get('term')), [searchParams]);

  const openTerm = useCallback(
    (term: GlossaryTerm) => {
      pushedRef.current = true;
      setSearchParams({ term: term.term });
    },
    [setSearchParams],
  );

  const closeDrawer = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      navigate(-1);
    } else {
      const next = new URLSearchParams(searchParams);
      next.delete('term');
      setSearchParams(next, { replace: true });
    }
  }, [navigate, searchParams, setSearchParams]);

  // Browser back/forward consumed our pushed entry — reset the flag.
  useEffect(() => {
    if (!searchParams.get('term')) pushedRef.current = false;
  }, [searchParams]);

  // ---- Keyboard: Cmd/Ctrl+K focuses search --------------------------------

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ---- Letter index: active-letter highlight via IntersectionObserver ------

  useEffect(() => {
    setActiveLetter(null);
    const anchors = letters
      .map((l) => document.getElementById(`glossary-letter-${l}`))
      .filter((el): el is HTMLElement => el !== null);
    if (anchors.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const l = (entry.target as HTMLElement).dataset.letter ?? null;
            setActiveLetter(l);
          }
        }
      },
      { rootMargin: '-170px 0px -70% 0px' },
    );
    anchors.forEach((a) => observer.observe(a));
    return () => observer.disconnect();
    // Re-bind whenever the filtered list re-renders (grid remounts anchors).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, lettersKey]);

  const scrollToLetter = useCallback((letter: string) => {
    const el = document.getElementById(`glossary-letter-${letter}`);
    if (!el) return;
    setActiveLetter(letter);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -170 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const clearFilters = useCallback(() => {
    setQuery('');
    setCategory('all');
  }, []);

  // ---- Render --------------------------------------------------------------

  return (
    <div>
      <PageHero
        index="SEC.04"
        label="GLOSSARY / 术语库"
        titleZh="说攀岩的语言。"
        titleEn="Speak the language of climbing."
        introZh={`${glossaryTerms.length} 条英文原词攀岩术语，附中英双语释义与例句 —— 从 aid climbing 到 z-clip。`}
        introEn={`${glossaryTerms.length} English climbing terms with bilingual definitions and examples — from aid climbing to z-clip.`}
      />

      {/* S0: sticky search console + S1: category filter */}
      <div className="sticky top-16 z-40 border-y border-stone bg-paper/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-4 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 lg:flex-row lg:items-center"
          >
            {/* Search input */}
            <div className="flex flex-1 items-center gap-3 border border-stone bg-chalk/60 px-4 py-3 transition-colors duration-300 focus-within:border-clay">
              <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(
                  '搜索术语… 如 crux / 难点 / 动态',
                  'Search terms… e.g. crux / dyno / heel hook',
                )}
                aria-label={t('搜索术语', 'Search terms')}
                className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-ink-faint/70 focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={t('清除搜索', 'Clear search')}
                  className="shrink-0 text-ink-faint transition-colors hover:text-clay"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            {/* Stats + shortcut hint */}
            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <span className="whitespace-nowrap font-mono text-xs text-ink-faint">
                {t(
                  `共 ${glossaryTerms.length} 条 · 显示 ${filtered.length} 条`,
                  `${glossaryTerms.length} terms · showing ${filtered.length}`,
                )}
              </span>
              <kbd className="hidden items-center gap-1 rounded border border-stone bg-paper-warm px-2 py-1 font-mono text-[10px] text-ink-faint sm:inline-flex">
                ⌘K
              </kbd>
            </div>
          </motion.div>

          {/* Category tags */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t('分类筛选', 'Filter by category')}>
            <ArchiveTag active={category === 'all'} onClick={() => setCategory('all')} className="shrink-0">
              {t('全部', 'All')}
              <span className="ml-1.5 opacity-70">{glossaryTerms.length}</span>
            </ArchiveTag>
            {glossaryCategories.map((c) => (
              <ArchiveTag
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(category === c.id ? 'all' : c.id)}
                className="shrink-0"
              >
                {t(c.labelZh, c.labelEn)}
                <span className="ml-1.5 opacity-70">{categoryCounts.get(c.id) ?? 0}</span>
              </ArchiveTag>
            ))}
          </div>
        </div>
      </div>

      {/* S4: letter index */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-8 md:px-10 lg:px-16">
        <nav
          className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1"
          aria-label={t('字母索引', 'Alphabetical index')}
        >
          <span className="mr-2 font-mono type-caption uppercase text-stone">A&ndash;Z</span>
          {letters.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => scrollToLetter(l)}
              className={cn(
                'px-1.5 py-0.5 font-mono text-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-clay',
                activeLetter === l ? 'font-bold text-clay' : 'text-ink-faint',
              )}
              aria-label={t(`跳转到字母 ${l}`, `Jump to letter ${l}`)}
            >
              {l}
            </button>
          ))}
        </nav>
      </div>

      {/* S2: term card grid */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-8 md:px-10 lg:px-16">
        {filtered.length > 0 ? (
          <div
            key={`${category}|${query.trim().toLowerCase()}`}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((term, i) => {
              const letter = term.term.charAt(0).toUpperCase();
              return (
                <TermCard
                  key={term.term}
                  term={term}
                  animated={i < ANIMATED_BATCH}
                  staggerIndex={i % ANIMATED_BATCH}
                  onOpen={openTerm}
                  anchorLetter={letterAnchors.get(letter) === i ? letter : undefined}
                />
              );
            })}
          </div>
        ) : (
          /* S5: empty state */
          <div className="flex flex-col items-center py-24 text-center">
            <div className="flex items-center gap-3" aria-hidden="true">
              <HoldDot color="stone" size="lg" />
              <HoldDot color="stone" size="lg" className="opacity-60" />
              <HoldDot color="stone" size="lg" className="opacity-30" />
            </div>
            <p className="mt-6 text-lg text-ink-soft">
              {t('没有找到相关术语 — 试试英文原词？', 'No terms found — try the original English word?')}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full border border-stone px-5 py-2 font-mono text-sm text-ink-soft transition-colors duration-300 hover:border-clay hover:bg-clay hover:text-chalk"
            >
              {t('清除搜索', 'Clear search')}
            </button>
          </div>
        )}
      </section>

      {/* S3: detail drawer (deep-linkable via ?term=) */}
      <TermDrawer term={activeTerm ?? null} list={filtered} onClose={closeDrawer} onNavigate={openTerm} />
    </div>
  );
}
