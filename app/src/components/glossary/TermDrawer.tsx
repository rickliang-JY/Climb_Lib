import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Box } from 'lucide-react';
import ArchiveTag from '@/components/shared/ArchiveTag';
import HoldDot from '@/components/shared/HoldDot';
import { useLanguage } from '@/i18n/LanguageContext';
import { getLenis } from '@/lib/lenis';
import type { GlossaryTerm } from '@/data/glossary';
import { sortedTerms, CATEGORY_DOT, archiveNumber, categoryLabel, holdIdFor, relatedTerms } from './glossary-utils';

interface TermDrawerProps {
  /** Currently open term, or null when the drawer is closed. */
  term: GlossaryTerm | null;
  /** Navigation context for prev/next (current filtered list). */
  list: GlossaryTerm[];
  onClose: () => void;
  onNavigate: (term: GlossaryTerm) => void;
}

/**
 * Right-slide detail drawer (glossary.md S3). Opens via card click or the
 * ?term= deep link; supports prev/next, related-term jumps and 3D hold links.
 */
export default function TermDrawer({ term, list, onClose, onNavigate }: TermDrawerProps) {
  const { lang, t } = useLanguage();

  // Escape to close
  useEffect(() => {
    if (!term) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [term, onClose]);

  // Lock page scroll while open (native + Lenis)
  useEffect(() => {
    if (!term) return;
    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [term]);

  // Prev/next within the navigation context (fall back to the full library
  // when a deep-linked term is filtered out of the current list).
  const { prev, next } = useMemo(() => {
    if (!term) return { prev: null as GlossaryTerm | null, next: null as GlossaryTerm | null };
    const ctx = list.some((x) => x.term === term.term) ? list : sortedTerms;
    const i = ctx.findIndex((x) => x.term === term.term);
    return {
      prev: i > 0 ? ctx[i - 1] : null,
      next: i >= 0 && i < ctx.length - 1 ? ctx[i + 1] : null,
    };
  }, [term, list]);

  const related = term ? relatedTerms(term, 4) : [];
  const holdId = term ? holdIdFor(term) : null;

  return (
    <AnimatePresence>
      {term ? (
        <>
          {/* Overlay */}
          <motion.div
            key="glossary-drawer-overlay"
            className="fixed inset-0 z-[65] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Panel */}
          <motion.aside
            key="glossary-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={term.term}
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[min(480px,92vw)] flex-col border-l border-stone bg-paper shadow-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header: archive number + category + close */}
            <div className="flex items-center gap-3 border-b border-stone px-6 py-4">
              <span className="font-mono type-caption uppercase text-ink-faint">
                No.{String(archiveNumber(term)).padStart(3, '0')} / {sortedTerms.length}
              </span>
              <ArchiveTag className="pointer-events-none">
                <HoldDot color={CATEGORY_DOT[term.category]} size="sm" className="mr-1.5" />
                {categoryLabel(term.category, lang)}
              </ArchiveTag>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('关闭', 'Close')}
                className="ml-auto rounded-full border border-stone p-1.5 text-ink-soft transition-colors duration-300 hover:border-clay hover:text-clay"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable body, crossfades when switching terms */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={term.term}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-6"
                >
                  {/* English term — constant across languages */}
                  <h2 className="font-mono text-[2.2rem] font-bold leading-tight text-ink">
                    {term.term}
                  </h2>
                  {term.abbr ? (
                    <p className="mt-1 font-mono text-sm text-ink-faint">({term.abbr})</p>
                  ) : null}

                  {/* Chinese gloss */}
                  <p className="mt-3 text-xl font-semibold text-ink-soft">{term.zh}</p>

                  {/* Full definition (bilingual) */}
                  <div className="mt-6">
                    <p className="font-mono type-caption uppercase text-stone">
                      {t('释义', 'Definition')}
                    </p>
                    <p className="mt-2 leading-[1.85] text-ink-soft">
                      {t(term.defZh, term.defEn)}
                    </p>
                  </div>

                  {/* Example sentence */}
                  {term.example ? (
                    <div className="mt-6">
                      <p className="font-mono type-caption uppercase text-stone">
                        {t('例句', 'Example')}
                      </p>
                      <blockquote className="mt-2 border border-sand bg-sand/60 p-4 font-mono text-sm leading-relaxed text-ink-soft">
                        &ldquo;{term.example}&rdquo;
                      </blockquote>
                    </div>
                  ) : null}

                  {/* Related terms */}
                  {related.length > 0 ? (
                    <div className="mt-6">
                      <p className="font-mono type-caption uppercase text-stone">
                        {t('相关术语', 'Related terms')}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {related.map((r) => (
                          <button
                            key={r.term}
                            type="button"
                            onClick={() => onNavigate(r)}
                            className="inline-flex items-baseline gap-1.5 rounded-full border border-stone bg-paper-warm px-3 py-1 transition-colors duration-300 hover:border-clay hover:bg-clay/10"
                          >
                            <span className="font-mono text-sm font-medium text-clay-deep">
                              {r.term}
                            </span>
                            {lang === 'zh' ? (
                              <span className="text-sm text-ink-soft">{r.zh}</span>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* 3D hold model link (Holds category with a matching model) */}
                  {holdId ? (
                    <div className="mt-6">
                      <Link
                        to={`/holds?hold=${holdId}`}
                        className="inline-flex items-center gap-2 font-mono text-sm text-clay transition-colors duration-300 hover:text-clay-deep"
                      >
                        <Box className="h-4 w-4" />
                        {t('查看 3D 岩点模型', 'View 3D hold model')}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: prev / next within the current context list */}
            <div className="flex items-stretch border-t border-stone">
              <button
                type="button"
                disabled={!prev}
                onClick={() => prev && onNavigate(prev)}
                className="flex flex-1 items-center gap-2 px-4 py-4 text-left font-mono text-sm text-ink-soft transition-colors duration-300 enabled:hover:bg-paper-warm enabled:hover:text-clay disabled:opacity-30"
                aria-label={t('上一个术语', 'Previous term')}
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">{prev ? prev.term : t('上一个', 'Prev')}</span>
              </button>
              <span className="w-px bg-stone" aria-hidden="true" />
              <button
                type="button"
                disabled={!next}
                onClick={() => next && onNavigate(next)}
                className="flex flex-1 items-center justify-end gap-2 px-4 py-4 text-right font-mono text-sm text-ink-soft transition-colors duration-300 enabled:hover:bg-paper-warm enabled:hover:text-clay disabled:opacity-30"
                aria-label={t('下一个术语', 'Next term')}
              >
                <span className="truncate">{next ? next.term : t('下一个', 'Next')}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
