import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ArchiveTagProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Category capsule tag: stone border, hover/active fills clay */
export default function ArchiveTag({ children, active = false, onClick, className }: ArchiveTagProps) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide transition-colors duration-300',
        active
          ? 'border-clay bg-clay text-chalk'
          : 'border-stone bg-transparent text-ink-soft hover:border-clay hover:bg-clay hover:text-chalk',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
