import { cn } from '@/lib/utils';

export type HoldColor =
  | 'hold-orange'
  | 'hold-amber'
  | 'hold-sage'
  | 'hold-rose'
  | 'hold-plum'
  | 'hold-slate'
  | 'clay'
  | 'moss'
  | 'stone';

const colorMap: Record<HoldColor, string> = {
  'hold-orange': 'bg-hold-orange',
  'hold-amber': 'bg-hold-amber',
  'hold-sage': 'bg-hold-sage',
  'hold-rose': 'bg-hold-rose',
  'hold-plum': 'bg-hold-plum',
  'hold-slate': 'bg-hold-slate',
  clay: 'bg-clay',
  moss: 'bg-moss',
  stone: 'bg-stone',
};

const sizeMap = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

interface HoldDotProps {
  color?: HoldColor;
  size?: keyof typeof sizeMap;
  className?: string;
}

/** The site-wide climbing-hold visual mark: a functional-color dot with a chalk outline. */
export default function HoldDot({ color = 'hold-orange', size = 'md', className }: HoldDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block rounded-full ring-1 ring-chalk/80 shadow-[inset_0_-2px_3px_rgba(43,38,32,0.25)]',
        colorMap[color],
        sizeMap[size],
        className,
      )}
    />
  );
}
