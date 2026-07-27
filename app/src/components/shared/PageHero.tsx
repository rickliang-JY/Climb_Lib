import type { ReactNode } from 'react';
import SectionLabel from './SectionLabel';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  /** e.g. "SEC.01" */
  index: string;
  /** e.g. "HISTORY / 发展历史" */
  label: string;
  titleZh: string;
  titleEn: string;
  introZh?: string;
  introEn?: string;
  /** Optional image shown to the right / below */
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
}

/** Unified page header: SectionLabel + display-lg bilingual title + intro + optional image. */
export default function PageHero({
  index,
  label,
  titleZh,
  titleEn,
  introZh,
  introEn,
  image,
  imageAlt = '',
  children,
  className,
}: PageHeroProps) {
  const { t } = useLanguage();
  return (
    <header className={cn('mx-auto w-full max-w-[1440px] px-6 pb-16 pt-20 md:px-10 md:pt-28 lg:px-16', className)}>
      <SectionLabel index={index} label={label} />
      <div className={cn('mt-8 grid gap-10', image && 'lg:grid-cols-12 lg:items-end')}>
        <div className={image ? 'lg:col-span-7' : 'max-w-[720px]'}>
          <h1 className="display-lg font-display text-ink">{t(titleZh, titleEn)}</h1>
          {introZh || introEn ? (
            <p className="mt-6 max-w-[65ch] text-lg leading-[1.9] text-ink-soft">
              {t(introZh ?? '', introEn ?? '')}
            </p>
          ) : null}
          {children}
        </div>
        {image ? (
          <div className="overflow-hidden border border-stone lg:col-span-5">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" loading="eager" />
          </div>
        ) : null}
      </div>
    </header>
  );
}
