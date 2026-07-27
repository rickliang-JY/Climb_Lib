import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import DataCard from '@/components/shared/DataCard';
import FormatDiagram from '@/components/competition/FormatDiagram';
import { compFormats, speedRecords } from '@/data/comps';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const panel: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: EASE } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE },
  }),
};

/** Key rule bullets per format (consistent with comps.ts data). */
const HIGHLIGHTS: Record<string, { zh: string; en: string }[]> = {
  boulder: [
    { zh: '决赛 4 条线路，每条限时 4 分钟', en: '4 problems in finals, 4 minutes each' },
    { zh: 'TOP 25 分 / ZONE 10 分，每次尝试 −0.1 分', en: 'TOP 25 pts / ZONE 10 pts, −0.1 per attempt' },
    { zh: '裁判确认双手控制顶点才算完攀', en: 'A top counts only with both hands controlled' },
    { zh: '隔离制 + 每条约 2 分钟集体观察', en: 'Isolation + ~2 min observation per problem' },
  ],
  lead: [
    { zh: '一条约 15 米线路，6 分钟，一次机会', en: 'One ~15 m route, 6 minutes, one attempt' },
    { zh: '先锋攀爬：绳子从下方扣入沿途快挂', en: 'Lead climbing: clip quickdraws on the way up' },
    { zh: '按通过手点计分，满分 100，记为 43+ 等形式', en: 'Scored per hold reached, 100 max, written like 43+' },
    { zh: '赛前集体观察约 6 分钟，不允许触碰支点', en: '~6 min collective observation, no touching holds' },
  ],
  speed: [
    { zh: '15 米 / 5° 仰角，赛道支点全球统一', en: '15 m at 5°, hold positions standardized worldwide' },
    { zh: '排位赛定种子 → 两两对决单败淘汰', en: 'Seeding round → head-to-head elimination' },
    { zh: '反应时 <0.1 秒判抢跑，直接输掉该轮', en: 'Reaction <0.1 s is a false start — instant loss' },
    { zh: '拍击顶端计时器定胜负，自动保护器保护', en: 'Slap the top pad to win; auto belays for safety' },
  ],
  combined: [
    { zh: '巴黎 2024：抱石 4 条 + 难度 1 条，得分相加', en: 'Paris 2024: 4 boulders + 1 lead route, scores added' },
    { zh: '各满分 100 分，总分 200 排定名次', en: '100 pts each, ranked on a 200-pt total' },
    { zh: '东京 2020：抱石×难度×速度名次相乘', en: 'Tokyo 2020: placements multiplied across 3 disciplines' },
    { zh: '洛杉矶 2028 起三项各自独立设金', en: 'From LA 2028: standalone medals per discipline' },
  ],
};

function splitTimeLimit(timeLimit: string): [string, string] {
  const parts = timeLimit.split(' | ');
  return [parts[0] ?? timeLimit, parts[1] ?? parts[0] ?? timeLimit];
}

/** WR chip row for the speed panel (data: speedRecords, verified mid-2026). */
function SpeedRecordCard() {
  const { t } = useLanguage();
  return (
    <div className="border border-stone bg-ink p-5">
      <span className="font-mono type-caption uppercase text-stone">
        {t('速度世界纪录 WORLD RECORDS', 'SPEED WORLD RECORDS')}
      </span>
      <ul className="mt-4 space-y-4">
        {speedRecords.map((r) => (
          <li key={r.gender} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-[11px] uppercase tracking-widest text-clay">
              {r.gender === 'Men' ? t('男子 ♂', 'MEN ♂') : t('女子 ♀', 'WOMEN ♀')}
            </span>
            <span className="font-mono text-2xl font-bold text-chalk">{r.time}</span>
            <span className="font-mono text-xs text-chalk/80">
              {r.athlete} ({r.country})
            </span>
            <span className="w-full font-mono text-[10px] text-chalk/50">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FormatTabs() {
  const { t } = useLanguage();
  const [active, setActive] = useState(compFormats[0].id);
  const format = compFormats.find((f) => f.id === active) ?? compFormats[0];
  const [tlZh, tlEn] = splitTimeLimit(format.timeLimit);
  const highlights = HIGHLIGHTS[format.id] ?? [];

  return (
    <div>
      {/* Tab bar with layoutId underline indicator */}
      <div
        role="tablist"
        aria-label={t('赛制选择', 'Choose a format')}
        className="flex flex-wrap gap-x-8 gap-y-2 border-b border-stone"
      >
        {compFormats.map((f, i) => {
          const isActive = f.id === active;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.id)}
              className={cn(
                'relative pb-3 text-left transition-colors duration-300',
                isActive ? 'text-clay' : 'text-ink-faint hover:text-ink',
              )}
            >
              <span className="mr-2 font-mono text-[10px] uppercase tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-bold uppercase tracking-wide md:text-base">
                {t(f.nameZh, f.nameEn)}
              </span>
              {isActive ? (
                <motion.span
                  layoutId="format-tab-underline"
                  className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-clay"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Panel: 5-col SVG diagram + 7-col rules */}
      <AnimatePresence mode="wait">
        <motion.div
          key={format.id}
          role="tabpanel"
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
          className="mt-10 grid gap-8 lg:grid-cols-12"
        >
          {/* Left: rule diagram */}
          <motion.figure variants={item} custom={0} className="lg:col-span-5">
            <div className="border border-stone bg-sand/40 p-4 md:p-6">
              <FormatDiagram key={format.id} id={format.id} />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              <span>{t('规则图解 RULE DIAGRAM', 'RULE DIAGRAM')}</span>
              <span>{t(format.nameZh, format.nameEn)}</span>
            </figcaption>
          </motion.figure>

          {/* Right: rules text */}
          <div className="lg:col-span-7">
            <motion.div variants={item} custom={0} className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
                {t(format.nameZh, format.nameEn)}
              </h3>
              <span className="rounded-full border border-stone px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {t(tlZh, tlEn)}
              </span>
            </motion.div>

            <ul className="mt-6 space-y-3">
              {highlights.map((h, i) => (
                <motion.li key={h.en} variants={item} custom={i + 1} className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] tracking-widest text-clay">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] font-medium text-ink">{t(h.zh, h.en)}</span>
                </motion.li>
              ))}
            </ul>

            <motion.p variants={item} custom={highlights.length + 1} className="mt-6 max-w-[65ch] text-sm leading-[1.9] text-ink-soft">
              {t(format.rulesZh, format.rulesEn)}
            </motion.p>

            <motion.div variants={item} custom={highlights.length + 2} className="mt-8 grid gap-4 md:grid-cols-2">
              <DataCard
                no={t('计分 SCORING', 'SCORING')}
                titleZh={`${format.nameZh} · 怎么算分`}
                titleEn={`${format.nameEn} · how scoring works`}
                descZh={format.scoringZh}
                descEn={format.scoringEn}
              />
              {format.id === 'speed' ? <SpeedRecordCard /> : null}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
