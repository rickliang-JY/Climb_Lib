import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CompHero from '@/components/competition/CompHero';
import FormatTabs from '@/components/competition/FormatTabs';
import OlympicTimeline from '@/components/competition/OlympicTimeline';
import AthleteGrid from '@/components/competition/AthleteGrid';
import FaqSection from '@/components/competition/FaqSection';
import SectionLabel from '@/components/shared/SectionLabel';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE },
  }),
};

/* ---------------- S1 — The formats (core interactive tabs) ---------------- */
function FormatsSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <SectionLabel index="SEC.03.1" label={t('赛制规则 THE FORMATS', '赛制规则 THE FORMATS')} />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="type-h1 mt-8 max-w-[24ch] font-display text-ink"
        >
          {t('三种完全不同的游戏，外加一个全能舞台。', 'Three completely different games — plus one combined stage.')}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-6 max-w-[65ch] text-lg leading-[1.9] text-ink-soft"
        >
          {t(
            '同一面墙，三套规则：抱石比的是解题，难度比的是高度，速度比的是纯粹的时间。点击切换，看清每一种赛制怎么玩、怎么算分。',
            'One wall, three rulebooks: bouldering is problem-solving, lead is about height, speed is pure time. Switch tabs to see how each format is played and scored.',
          )}
        </motion.p>

        <div className="mt-14">
          <FormatTabs />
        </div>
      </div>
    </section>
  );
}

/* ---------------- S5 — Footer guide ---------------- */
function NextSection() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-stone bg-paper py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="type-h2 max-w-[22ch] font-display text-ink">
            {t('想知道选手们在抓什么样的岩点？', 'Curious what kind of holds they are grabbing?')}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/holds"
              className="group inline-flex items-center gap-2 border border-clay bg-clay px-6 py-3 text-sm font-bold text-chalk transition-colors duration-300 hover:bg-clay-deep"
            >
              {t('进入 3D 岩点库', 'Enter the 3D Holds Library')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/glossary"
              className="group inline-flex items-center gap-2 border border-stone px-6 py-3 text-sm font-bold text-ink transition-colors duration-300 hover:border-clay hover:text-clay"
            >
              {t('翻阅术语库', 'Browse the Glossary')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CompetitionPage() {
  return (
    <>
      <CompHero />
      <FormatsSection />
      <OlympicTimeline />
      <AthleteGrid />
      <FaqSection />
      <NextSection />
    </>
  );
}
