import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Box, Shapes } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ArchiveTag from '@/components/shared/ArchiveTag';
import SectionLabel from '@/components/shared/SectionLabel';
import HoldDot from '@/components/shared/HoldDot';
import { disciplines } from '@/data/disciplines';
import { useLanguage } from '@/i18n/LanguageContext';
import { scrollToSection } from '@/lib/lenis';
import DisciplineChapter from '@/components/disciplines/DisciplineChapter';
import CompareMatrix from '@/components/disciplines/CompareMatrix';
import { CATEGORY_META } from '@/components/disciplines/meta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tagStrip: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
};

const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
};

/** S3 — ink footer block linking onward to the 3D modules. */
function OutroTo3D() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-stone bg-ink py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionLabel index="SEC.04" label={t('下一步 NEXT', 'NEXT STEP 下一步')} tone="light" />
        </motion.div>
        <motion.h2
          className="display-lg mt-8 max-w-[900px] font-display text-chalk"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          {t(
            '理解了类型，现在亲手摸一摸岩点。',
            "You've read about the disciplines — now feel the holds.",
          )}
        </motion.h2>
        <motion.p
          className="mt-6 max-w-[65ch] leading-[1.85] text-stone"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          {t(
            '知识库的两座 3D 展厅：一座可旋转的攀岩墙，一座可逐件拿起的岩点标本库。',
            'Two 3D galleries in this library: a rotatable climbing wall, and a specimen cabinet of holds you can pick up one by one.',
          )}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.3 }}
        >
          <Link
            to="/wall-3d"
            className="group inline-flex items-center gap-2.5 border border-clay bg-clay px-6 py-3.5 font-semibold text-chalk transition-colors duration-300 hover:bg-clay-deep hover:border-clay-deep"
          >
            <Box className="h-5 w-5" />
            {t('3D 攀岩墙', '3D Climbing Wall')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/holds"
            className="group inline-flex items-center gap-2.5 border border-stone px-6 py-3.5 font-semibold text-chalk transition-colors duration-300 hover:border-clay hover:text-clay"
          >
            <Shapes className="h-5 w-5" />
            {t('3D 岩点库', '3D Holds Library')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function DisciplinesPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* S0 — Hero + anchor tag strip */}
      <PageHero
        index="SEC.02"
        label="DISCIPLINES / 类型全解"
        titleZh="一面岩壁，十六种读法。"
        titleEn="One wall, sixteen ways to climb it."
        introZh="从 4 米高的抱石垫到 900 米的优胜美地大墙；从 15 秒的速度冲刺到数周的大墙远征 —— 攀岩不是一项运动，而是一个家族。先用一张对比矩阵纵览 16 种类型，再逐卷翻阅它们各自的标本参数卡。"
        introEn="From four-meter boulder pads to 900-meter Yosemite big walls; from 15-second speed sprints to week-long vertical expeditions — climbing is not one sport but a family. Start with the comparison matrix for the whole family at a glance, then read the sixteen disciplines chapter by chapter, each with its own specimen card."
      >
        <motion.ul
          className="mt-10 flex max-w-[900px] flex-wrap gap-2.5"
          variants={tagStrip}
          initial="hidden"
          animate="show"
          aria-label={t('类型速览锚点', 'Discipline quick links')}
        >
          {disciplines.map((d, i) => (
            <motion.li key={d.id} variants={tagPop}>
              <ArchiveTag onClick={() => scrollToSection(`#disc-${d.id}`)}>
                <span className="mr-1.5 inline-flex align-middle">
                  <HoldDot color={CATEGORY_META[d.category].color} size="sm" />
                </span>
                {t(d.nameZh, d.nameEn)}
                <span className="ml-1.5 opacity-60">{String(i + 1).padStart(2, '0')}</span>
              </ArchiveTag>
            </motion.li>
          ))}
        </motion.ul>
      </PageHero>

      {/* S1 — Comparison matrix. Sits before the chapters so the overview is
          reachable without scrolling past 16 full-length entries; each row
          links down into its chapter. */}
      <CompareMatrix />

      {/* S2 — 16 encyclopedia chapters, alternating editorial layout */}
      <div>
        {disciplines.map((d, i) => (
          <DisciplineChapter key={d.id} d={d} index={i} />
        ))}
      </div>

      {/* S3 — Onward to 3D */}
      <OutroTo3D />
    </>
  );
}
