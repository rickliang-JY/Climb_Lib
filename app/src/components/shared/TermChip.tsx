import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface TermChipProps {
  /** English term, always displayed verbatim regardless of language */
  term: string;
  /** Chinese gloss (short), shown next to the term in zh mode */
  zh?: string;
  /** Chinese definition for the tooltip */
  defZh: string;
  /** English definition for the tooltip */
  defEn: string;
  className?: string;
}

/**
 * Inline glossary chip: mono English term + definition tooltip on hover.
 * The English term itself never translates (design.md §6).
 */
export default function TermChip({ term, zh, defZh, defEn, className }: TermChipProps) {
  const { lang, t } = useLanguage();
  return (
    <span className={cn('group relative inline-block', className)}>
      <span className="inline-flex cursor-help items-baseline gap-1.5 rounded-full border border-stone bg-paper-warm px-3 py-1 transition-colors duration-300 group-hover:border-clay group-hover:bg-clay/10">
        <span className="font-mono text-sm font-medium text-clay-deep group-hover:text-clay">{term}</span>
        {lang === 'zh' && zh ? <span className="text-sm text-ink-soft">{zh}</span> : null}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 translate-y-1 rounded-md border border-stone bg-ink p-3 text-left text-xs leading-relaxed text-chalk opacity-0 shadow-card transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-stone">
          {t('术语 TERM', 'TERM')} · {term}
        </span>
        {t(defZh, defEn)}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-ink" aria-hidden="true" />
      </span>
    </span>
  );
}
