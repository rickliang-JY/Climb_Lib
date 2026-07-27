import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import HoldDot from '@/components/shared/HoldDot';
import type { HoldColor } from '@/components/shared/HoldDot';
import TermChip from '@/components/shared/TermChip';
import { glossaryTerms } from '@/data/glossary';
import type { Discipline } from '@/data/disciplines';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import SpecimenCard from './SpecimenCard';
import { CATEGORY_META, DISCIPLINE_META } from './meta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const nameContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const nameWord: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const chipsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const chipItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Deterministic pseudo-random hold scatter for disciplines without a photo. */
function holdScatter(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rand = () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };
  return Array.from({ length: 9 }, (_, i) => ({
    x: 10 + rand() * 78,
    y: 10 + rand() * 72,
    size: (i % 3) as 0 | 1 | 2,
    accent: rand() > 0.45,
  }));
}

function HoldField({
  seed,
  color,
  label,
}: {
  seed: string;
  color: HoldColor;
  label: string;
}) {
  const dots = useMemo(() => holdScatter(seed), [seed]);

  const sizes = ['lg', 'md', 'sm'] as const;

  return (
    <div className="texture-granite relative aspect-[3/2] overflow-hidden border border-stone bg-paper-warm">
      <div
        className="absolute inset-6 border border-dashed border-stone/70"
        aria-hidden="true"
      />
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        >
          <HoldDot
            color={dot.accent ? color : 'stone'}
            size={sizes[dot.size]}
            className={dot.accent ? undefined : 'opacity-50'}
          />
        </span>
      ))}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono type-caption uppercase text-ink-faint">
        <span>{label}</span>
        <span aria-hidden="true">△ △ △</span>
      </div>
    </div>
  );
}

interface DisciplineChapterProps {
  d: Discipline;
  index: number;
}

/** One encyclopedia chapter: image/color-block + bilingual text + specimen card. */
export default function DisciplineChapter({ d, index }: DisciplineChapterProps) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const meta = DISCIPLINE_META[d.id];
  const cat = CATEGORY_META[d.category];
  const no = String(index + 1).padStart(2, '0');
  const imageLeft = index % 2 === 0;

  const name = t(d.nameZh, d.nameEn);
  const altName = lang === 'zh' ? d.nameEn : d.nameZh;

  const chips = (meta?.terms ?? [])
    .map((name2) => glossaryTerms.find((g) => g.term.toLowerCase() === name2.toLowerCase()))
    .filter((x): x is (typeof glossaryTerms)[number] => Boolean(x));

  return (
    <section id={`disc-${d.id}`} className="scroll-mt-16 border-t border-stone/70">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-14 lg:px-16">
        {/* Media — clip-path reveal, direction alternates with layout */}
        <motion.div
          className={cn('lg:col-span-7', !imageLeft && 'lg:order-2')}
          initial={{ clipPath: imageLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0%)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {meta?.image ? (
            <div className="group aspect-[3/2] overflow-hidden border border-stone">
              <motion.img
                src={meta.image}
                alt={`${d.nameEn} — ${d.nameZh}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </div>
          ) : (
            <HoldField
              seed={d.id}
              color={cat.color}
              label={t(`NO.${no} · 野外图像待补 FIELD SKETCH`, `NO.${no} · FIELD SKETCH`)}
            />
          )}
          {/* Caption strip */}
          <div className="mt-3 flex items-center justify-between font-mono type-caption uppercase text-ink-faint">
            <span className="flex items-center gap-2">
              <HoldDot color={cat.color} size="sm" />
              {t(cat.zh, cat.en)}
            </span>
            <span>{d.famousSpots[0]}</span>
          </div>
        </motion.div>

        {/* Text column */}
        <div className={cn('lg:col-span-5', !imageLeft && 'lg:order-1')}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionLabel index={`TYPE.${no}`} label={t(cat.zh, cat.en)} />
          </motion.div>

          <motion.h2
            className="type-h2 mt-5 font-display text-ink"
            variants={nameContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {name.split(' ').map((word, i, arr) => (
              <motion.span key={i} variants={nameWord} className="inline-block">
                {word}
                {i < arr.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
            <motion.span
              variants={nameWord}
              className="ml-3 align-baseline font-display text-lg font-medium italic text-ink-faint"
            >
              {altName}
            </motion.span>
          </motion.h2>

          <motion.p
            className="mt-3 font-mono text-sm tracking-wide text-clay-deep"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {t(d.taglineZh, d.taglineEn)}
          </motion.p>

          <motion.p
            className="mt-5 max-w-[65ch] leading-[1.85] text-ink-soft"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t(d.descZh, d.descEn)}
          </motion.p>

          <SpecimenCard d={d} no={no} />

          {/* Related glossary terms + onward link */}
          <motion.div
            className="mt-6"
            variants={chipsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="mb-3 font-mono type-caption uppercase text-ink-faint">
              {t('相关术语 / Terms', 'Related terms / 相关术语')}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {chips.map((g) => (
                <motion.span key={g.term} variants={chipItem} className="inline-flex">
                  <button
                    onClick={() => navigate('/glossary')}
                    aria-label={t(`在术语库查看 ${g.term}`, `Look up ${g.term} in the glossary`)}
                    className="inline-block"
                  >
                    <TermChip term={g.term} zh={g.zh} defZh={g.defZh} defEn={g.defEn} />
                  </button>
                </motion.span>
              ))}
            </div>
          </motion.div>

          {meta ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <Link
                to={meta.linkTo}
                className="group mt-6 inline-flex items-center gap-2 border-b border-clay/50 pb-1 text-sm font-semibold text-clay-deep transition-colors hover:border-clay hover:text-clay"
              >
                {t(meta.linkZh, meta.linkEn)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
