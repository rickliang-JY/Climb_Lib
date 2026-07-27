import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import GradeConverter from '@/components/grades/GradeConverter';
import GradeSystems from '@/components/grades/GradeSystems';
import GearGallery from '@/components/grades/GearGallery';
import KnotsGrid from '@/components/grades/KnotsGrid';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GradesPage() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* S0. Page hero */}
      <PageHero
        index="SEC.05"
        label="GRADES & GEAR / 等级与装备"
        titleZh="5.12 有多难？"
        titleEn="How hard is 5.12?"
        introZh="YDS、French、UIAA、V、Font —— 全球五大等级体系对照表，滑一滑换算；再翻翻攀岩者的工具箱。"
        introEn="YDS, French, UIAA, V and Font — the world's five grading systems side by side. Slide to convert, then open the climber's toolkit."
      />

      {/* S1. Interactive grade converter */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1000px]">
          <SectionLabel index="SEC.05.1" label={t('等级换算器 GRADE CONVERTER', 'GRADE CONVERTER')} className="mb-8" />
          <GradeConverter />
        </div>
      </section>

      {/* S2. Origins of the five systems */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1000px]">
          <SectionLabel index="SEC.05.2" label={t('体系渊源 ORIGINS', 'ORIGINS OF THE SYSTEMS')} className="mb-8" />
          <h2 className="type-h2 font-display text-ink">{t('五种体系，一部等级史。', 'Five systems, one history of difficulty.')}</h2>
          <p className="mt-4 max-w-[65ch] text-base leading-[1.9] text-ink-soft">
            {t(
              '每一套等级体系都诞生于一片具体的岩场与时代 —— 从优胜美地的十进制到枫丹白露的森林环线。',
              'Every grading scale was born on a specific crag in a specific era — from Yosemite decimals to the painted circuits of Fontainebleau.',
            )}
          </p>
          <div className="mt-10">
            <GradeSystems />
          </div>
        </div>
      </section>

      {/* S3. Gear gallery */}
      <section className="border-y border-stone bg-paper-warm py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
          <SectionLabel index="SEC.05.3" label={t('装备图鉴 THE KIT', 'THE KIT')} className="mb-8" />
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="type-h2 font-display text-ink">{t('攀岩者的工具箱。', "The climber's toolkit.")}</h2>
            <p className="max-w-[48ch] text-sm leading-[1.9] text-ink-soft">
              {t(
                '19 件核心装备，按六大分类归档。点开任意一件，查看规格、选购要点与安全提示。',
                'Nineteen essential pieces of kit, filed into six categories. Open any card for specs, buying notes and safety tips.',
              )}
            </p>
          </div>
          <GearGallery />
        </div>
      </section>

      {/* S4. Knots */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <SectionLabel index="SEC.05.4" label={t('绳结 KNOTS', 'KNOTS')} className="mb-8" />
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="type-h2 font-display text-ink">{t('八种必会绳结。', 'Eight knots to know.')}</h2>
          <p className="max-w-[48ch] text-sm leading-[1.9] text-ink-soft">
            {t(
              '从每次上墙必打的八字结，到应急保护与自救的抓结 —— 绳结是攀岩者的基础语言。',
              'From the figure-8 you tie every session to the friction hitches of self-rescue — knots are the climber’s basic vocabulary.',
            )}
          </p>
        </div>
        <KnotsGrid />
      </section>

      {/* S5. Safety banner */}
      <section className="border-y border-stone bg-sand/60">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-5 px-6 py-8 md:px-10 lg:px-16">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-moss bg-paper"
          >
            <ShieldCheck className="h-6 w-6 text-moss" aria-hidden="true" />
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-sm leading-[1.9] text-ink md:text-base"
          >
            {t(
              '装备知识不能替代专业指导 —— 第一次上墙请去正规岩馆，跟着教练学保护。',
              'Gear knowledge never replaces professional instruction — start at a certified gym with a coach.',
            )}
          </motion.p>
        </div>
      </section>

      {/* S6. Footer CTA */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 lg:px-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[20ch] font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            {t(
              '知道了等级与装备 —— 去 3D 墙上找到你的第一个岩点。',
              'Grades and gear sorted — now find your first hold on the 3D wall.',
            )}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/wall-3d"
              className="group inline-flex items-center gap-2 border border-clay bg-clay px-6 py-3 font-medium text-chalk transition-colors duration-300 hover:bg-clay-deep"
            >
              {t('进入 3D 攀岩墙', 'Enter the 3D Wall')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/glossary"
              className="group inline-flex items-center gap-2 border border-stone px-6 py-3 font-medium text-ink transition-colors duration-300 hover:border-clay hover:text-clay"
            >
              {t('查术语', 'Browse Glossary')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
