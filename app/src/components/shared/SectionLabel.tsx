import { cn } from '@/lib/utils';

interface SectionLabelProps {
  /** Archive number, e.g. "SEC.02" or "VOL.01" */
  index: string;
  /** Label text, e.g. "DISCIPLINES" or "术语 GLOSSARY" */
  label: string;
  /** Use light styling on dark (ink) backgrounds */
  tone?: 'dark' | 'light';
  className?: string;
}

/** Mono archive number + stone divider line, e.g. `SEC.02 / DISCIPLINES` */
export default function SectionLabel({ index, label, tone = 'dark', className }: SectionLabelProps) {
  const textColor = tone === 'dark' ? 'text-ink-faint' : 'text-stone';
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className={cn('font-mono type-caption uppercase whitespace-nowrap', textColor)}>
        {index}
      </span>
      <span className="h-px w-12 bg-stone" aria-hidden="true" />
      <span className={cn('font-mono type-caption uppercase', textColor)}>{label}</span>
    </div>
  );
}
