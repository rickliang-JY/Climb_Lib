import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HoldDot from '@/components/shared/HoldDot';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import type { GlossaryTerm } from '@/data/glossary';
import { CATEGORY_DOT, archiveNumber, categoryLabel } from './glossary-utils';

interface TermCardProps {
  term: GlossaryTerm;
  /** Animate entrance (only the first batch in the grid gets this, for perf). */
  animated: boolean;
  /** Stagger slot used for entrance delay. */
  staggerIndex: number;
  onOpen: (term: GlossaryTerm) => void;
  /** Present on the first card of each letter — used as the letter-index anchor. */
  anchorLetter?: string;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardClasses =
  'group flex h-full w-full flex-col border border-stone bg-paper-warm p-5 text-left ' +
  'transition-[transform,border-color,box-shadow] duration-300 ' +
  'hover:-translate-y-1.5 hover:border-clay hover:shadow-card focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-clay scroll-mt-40';

/** DataCard variant: category dot + mono English term + zh gloss + 2-line definition. */
function TermCard({ term, animated, staggerIndex, onOpen, anchorLetter }: TermCardProps) {
  const { lang, t } = useLanguage();

  const body = (
    <>
      {/* Top row: category dot + mono label + archive number */}
      <span className="flex items-center gap-2">
        <HoldDot color={CATEGORY_DOT[term.category]} size="sm" />
        <span className="font-mono type-caption uppercase text-ink-faint">
          {categoryLabel(term.category, lang)}
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-widest text-stone">
          {String(archiveNumber(term)).padStart(3, '0')}
        </span>
      </span>

      {/* English term — constant across languages (design.md §6) */}
      <span className="mt-3 block font-mono text-[1.3rem] font-bold leading-tight text-ink">
        {term.term}
        {term.abbr ? (
          <span className="ml-2 font-mono text-xs font-normal text-ink-faint">({term.abbr})</span>
        ) : null}
      </span>

      {/* Chinese gloss title */}
      <span className="mt-1 block text-base font-semibold text-ink-soft">{term.zh}</span>

      {/* One-liner definition, bilingual, 2-line clamp */}
      <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-ink-faint">
        {t(term.defZh, term.defEn)}
      </span>

      {/* Details link */}
      <span className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-xs uppercase tracking-widest text-ink-faint transition-colors duration-300 group-hover:text-clay">
        {t('详情', 'Details')}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </>
  );

  const anchorProps = anchorLetter
    ? { id: `glossary-letter-${anchorLetter}`, 'data-letter': anchorLetter }
    : {};

  if (!animated) {
    return (
      <button type="button" onClick={() => onOpen(term)} className={cardClasses} {...anchorProps}>
        {body}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(term)}
      className={cn(cardClasses)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.5, delay: staggerIndex * 0.05, ease: EASE }}
      {...anchorProps}
    >
      {body}
    </motion.button>
  );
}

export default memo(TermCard);
