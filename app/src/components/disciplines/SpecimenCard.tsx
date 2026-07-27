import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import HoldDot from '@/components/shared/HoldDot';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Discipline } from '@/data/disciplines';
import { DISCIPLINE_META } from './meta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.06 },
  },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const dotsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const dotVariants: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
};

interface SpecimenCardProps {
  d: Discipline;
  /** Archive number, e.g. "01" */
  no: string;
}

/**
 * "标本参数卡" — museum specimen card with a 2×3 mono data grid:
 * Height / Protection / Grading / Key Gear / Risk (HoldDots) / Icon.
 */
export default function SpecimenCard({ d, no }: SpecimenCardProps) {
  const { t } = useLanguage();
  const meta = DISCIPLINE_META[d.id];
  const risk = meta?.risk ?? 3;
  const icon = d.iconicClimbers?.[0] ?? d.famousSpots[0] ?? '—';

  const cells: { label: string; value: ReactNode }[] = [
    {
      label: t('典型高度 / Height', 'Height / 典型高度'),
      value: d.height,
    },
    {
      label: t('保护方式 / Protection', 'Protection / 保护方式'),
      value: d.protection,
    },
    {
      label: t('等级体系 / Grading', 'Grading / 等级体系'),
      value: d.grading,
    },
    {
      label: t('装备核心 / Key Gear', 'Key Gear / 装备核心'),
      value: d.gear.slice(0, 3).join(' · '),
    },
    {
      label: t('风险带 / Risk', 'Risk / 风险带'),
      value: (
        <motion.span className="flex items-center gap-1.5" variants={dotsVariants}>
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.span key={i} variants={dotVariants} className="inline-flex">
              <HoldDot
                color={i <= risk ? 'hold-rose' : 'stone'}
                size="md"
                className={i <= risk ? undefined : 'opacity-35'}
              />
            </motion.span>
          ))}
          <span className="ml-1 font-mono text-xs text-ink-faint">{risk}/5</span>
        </motion.span>
      ),
    },
    {
      label: t('代表 / Icon', 'Icon / 代表'),
      value: icon,
    },
  ];

  return (
    <motion.aside
      className="mt-8 border border-stone bg-sand/40"
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="flex items-center justify-between gap-4 border-b border-stone px-4 py-2.5">
        <span className="font-mono type-caption uppercase text-ink-faint">
          {t('标本参数卡', 'SPECIMEN CARD')}
        </span>
        <span className="font-mono type-caption text-clay-deep">NO.{no}</span>
      </header>
      <dl className="grid grid-cols-1 sm:grid-cols-2">
        {cells.map((cell, i) => (
          <motion.div
            key={cell.label}
            variants={cellVariants}
            className={
              'border-stone p-4' +
              (i % 2 === 0 ? ' sm:border-r' : '') +
              (i < cells.length - 2 ? ' border-b' : i === cells.length - 2 ? ' border-b sm:border-b-0' : '')
            }
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
              {cell.label}
            </dt>
            <dd className="mt-1.5 text-sm font-medium leading-snug text-ink">{cell.value}</dd>
          </motion.div>
        ))}
      </dl>
    </motion.aside>
  );
}
