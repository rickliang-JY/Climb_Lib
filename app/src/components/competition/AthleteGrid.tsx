import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mountain, MoveUp, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import HoldDot from '@/components/shared/HoldDot';
import type { HoldColor } from '@/components/shared/HoldDot';
import SectionLabel from '@/components/shared/SectionLabel';
import { athletes } from '@/data/comps';
import type { Athlete } from '@/data/comps';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (i % 4) * 0.1, duration: 0.7, ease: EASE },
  }),
};

/**
 * Card headers are typographic plates, not photographs. These are real named
 * people with real results; we have no licensed likeness of any of them, so a
 * stock climbing photo on the card would read as a portrait and misinform.
 */
const TINTS: { plate: string; ink: string; dot: HoldColor }[] = [
  { plate: '#D97B4F', ink: '#5A2E19', dot: 'hold-orange' },
  { plate: '#D9A441', ink: '#5C4210', dot: 'hold-amber' },
  { plate: '#8A9B6E', ink: '#33402A', dot: 'hold-sage' },
  { plate: '#C4786B', ink: '#5A2C25', dot: 'hold-rose' },
];

const DISCIPLINE_ICONS: { match: RegExp; Icon: LucideIcon }[] = [
  { match: /speed/i, Icon: Zap },
  { match: /boulder/i, Icon: Mountain },
  { match: /lead/i, Icon: MoveUp },
];

function disciplineIcon(discipline: string): LucideIcon {
  return DISCIPLINE_ICONS.find((d) => d.match.test(discipline))?.Icon ?? Mountain;
}

/** "Janja Garnbret" -> "JG"; falls back to the first two letters of one word. */
function initialsOf(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function AthleteCard({ athlete, index }: { athlete: Athlete; index: number }) {
  const { t } = useLanguage();
  const tint = TINTS[index % TINTS.length];
  const Icon = disciplineIcon(athlete.discipline);

  return (
    <motion.article
      variants={card}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="group flex h-full flex-col border border-stone bg-chalk transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
    >
      {/* 4:5 monogram plate with hover bio overlay */}
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ backgroundColor: tint.plate }}
      >
        <div className="texture-granite absolute inset-0 opacity-[0.16]" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, rgba(251,249,244,0.30) 0%, rgba(43,38,32,0.18) 100%)' }}
          aria-hidden="true"
        />

        {/* Monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden="true"
            className="select-none font-display text-[5.5rem] font-bold leading-none tracking-tight transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ color: tint.ink, opacity: 0.85 }}
          >
            {initialsOf(athlete.name)}
          </span>
        </div>

        {/* Index badge */}
        <span className="absolute left-3 top-3 border border-chalk/40 bg-ink/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-chalk backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Discipline glyph */}
        <span
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-chalk/40 bg-ink/45 text-chalk backdrop-blur-sm"
          title={athlete.discipline}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>

        {/* Plate footer: country + discipline */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/85">
            {t(athlete.countryZh, athlete.country)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk/65">
            {athlete.discipline}
          </span>
        </div>

        {/* Hover bio */}
        <div
          className="absolute inset-0 flex translate-y-full items-end bg-ink/92 p-5 transition-transform duration-500 group-hover:translate-y-0"
          style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          <p className="text-xs leading-[1.8] text-chalk/90">{t(athlete.bioZh, athlete.bioEn)}</p>
        </div>
      </div>

      {/* card body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <HoldDot color={tint.dot} size="sm" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {t(athlete.countryZh, athlete.country)} · {athlete.discipline}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-ink">
          {athlete.name}
        </h3>
        <ul className="mt-4 space-y-2 border-t border-stone/70 pt-4">
          {athlete.achievements.slice(0, 3).map((a) => (
            <li key={a} className="flex items-baseline gap-2 font-mono text-[10.5px] leading-relaxed text-ink-soft">
              <span className="shrink-0 text-clay">▸</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/** Competition S3 — legend athlete archive cards. */
export default function AthleteGrid() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-stone bg-paper py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          variants={card}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <SectionLabel index="SEC.03.3" label={t('LEGENDS 传奇', 'LEGENDS 传奇')} />
        </motion.div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            variants={card}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="type-h1 font-display text-ink"
          >
            {t('他们定义了比赛。', 'They defined the game.')}
          </motion.h2>
          <motion.p
            variants={card}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="font-mono text-xs uppercase tracking-widest text-ink-faint"
          >
            {t(`${athletes.length} 位运动员 · 悬停查看档案`, `${athletes.length} athletes · hover for the file`)}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {athletes.map((a, i) => (
            <AthleteCard key={a.name} athlete={a} index={i} />
          ))}
        </div>

        <p className="mt-10 max-w-[70ch] font-mono text-[11px] leading-relaxed text-ink-faint">
          {t(
            '说明：本站不持有运动员肖像授权，卡片以姓名缩写字牌代替照片；成绩数据整理自 IFSC 与奥运会公开记录。',
            'Note: we hold no likeness rights for these athletes, so each card uses a monogram plate rather than a photograph. Results are compiled from public IFSC and Olympic records.',
          )}
        </p>
      </div>
    </section>
  );
}
