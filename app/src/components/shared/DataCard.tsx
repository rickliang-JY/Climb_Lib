import type { ReactNode } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface DataCardProps {
  /** Mono archive number, e.g. "NO.01" */
  no?: string;
  titleZh: string;
  titleEn: string;
  descZh?: string;
  descEn?: string;
  /** Optional top media (img, canvas, icon) */
  media?: ReactNode;
  /** Optional footer row (tags, links, badges) */
  footer?: ReactNode;
  className?: string;
}

/** Museum specimen card: sand body, 1px stone border, mono number, bilingual title. */
export default function DataCard({
  no,
  titleZh,
  titleEn,
  descZh,
  descEn,
  media,
  footer,
  className,
}: DataCardProps) {
  const { t } = useLanguage();
  return (
    <article
      className={cn(
        'group flex h-full flex-col border border-stone bg-sand/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card',
        className,
      )}
    >
      {media ? <div className="overflow-hidden border-b border-stone">{media}</div> : null}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {no ? (
          <span className="font-mono type-caption uppercase text-ink-faint">{no}</span>
        ) : null}
        <h3 className="text-xl font-bold leading-snug text-ink">{t(titleZh, titleEn)}</h3>
        {descZh || descEn ? (
          <p className="text-sm leading-relaxed text-ink-soft">{t(descZh ?? '', descEn ?? '')}</p>
        ) : null}
        {footer ? <div className="mt-auto pt-3">{footer}</div> : null}
      </div>
    </article>
  );
}
