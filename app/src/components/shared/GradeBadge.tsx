import HoldDot from './HoldDot';
import type { HoldColor } from './HoldDot';
import { cn } from '@/lib/utils';

export type GradeBand = 'beginner' | 'intermediate' | 'advanced' | 'elite';

const bandColor: Record<GradeBand, HoldColor> = {
  beginner: 'hold-sage',
  intermediate: 'hold-amber',
  advanced: 'hold-orange',
  elite: 'hold-rose',
};

interface GradeBadgeProps {
  /** Grade string, e.g. "5.12a" / "V7" / "7a+" */
  grade: string;
  band?: GradeBand;
  className?: string;
}

/** Mono grade badge with a colored dot marking the difficulty band. */
export default function GradeBadge({ grade, band = 'intermediate', className }: GradeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-sm border border-stone bg-paper-warm px-2.5 py-1 font-mono text-sm font-medium text-ink',
        className,
      )}
    >
      <HoldDot color={bandColor[band]} size="sm" />
      {grade}
    </span>
  );
}
