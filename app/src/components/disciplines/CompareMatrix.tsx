import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import SectionLabel from '@/components/shared/SectionLabel';
import HoldDot from '@/components/shared/HoldDot';
import type { HoldColor } from '@/components/shared/HoldDot';
import { disciplines } from '@/data/disciplines';
import { useLanguage } from '@/i18n/LanguageContext';
import { scrollToSection } from '@/lib/lenis';
import { CATEGORY_META, DISCIPLINE_META, gearBarrier } from './meta';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: EASE },
  }),
};

/** Five-dot meter. Carries its value as text so the rating is readable, not just countable. */
function DotRating({ n, color, label }: { n: number; color: HoldColor; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" title={`${label} ${n}/5`}>
      <span className="inline-flex items-center gap-1" role="img" aria-label={`${label} ${n}/5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <HoldDot
            key={i}
            color={i <= n ? color : 'stone'}
            size="sm"
            className={i <= n ? undefined : 'opacity-30'}
          />
        ))}
      </span>
      <span aria-hidden="true" className="font-mono text-[10px] tabular-nums text-ink-faint">
        {n}
      </span>
    </span>
  );
}

/** SEC.03 — decision matrix comparing all disciplines side by side. */
export default function CompareMatrix() {
  const { t, lang } = useLanguage();

  const columns = [
    t('类型 / Discipline', 'Discipline / 类型'),
    t('高度 Height', 'Height 高度'),
    t('保护 Protection', 'Protection 保护'),
    t('装备门槛 Gear', 'Gear 装备门槛'),
    t('体能侧重 Focus', 'Focus 体能侧重'),
    t('风险 Risk', 'Risk 风险'),
    t('入门友好 Beginner', 'Beginner 入门友好'),
  ];

  return (
    <section id="compare" className="scroll-mt-16 border-t border-stone bg-sand/50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionLabel index="SEC.03" label={t('对比矩阵 COMPARE', 'COMPARE MATRIX 对比矩阵')} />
          <h2 className="type-h2 mt-8 max-w-[720px] font-display text-ink">
            {t('一张表，读懂整个攀岩家族。', 'The whole climbing family, at a glance.')}
          </h2>
          <p className="mt-4 max-w-[65ch] leading-[1.85] text-ink-soft">
            {t(
              '点击任意一行跳回对应章节。圆点评级基于馆内档案综合评估：装备门槛按装备清单长度折算，风险与入门友好度为编辑评级（1–5）。',
              'Click any row to jump back to its chapter. Dot ratings are assessed from the archive: gear barrier derives from the gear-list length; risk and beginner-friendliness are editorial ratings (1–5).',
            )}
          </p>
        </motion.div>

        <div className="mt-10 overflow-x-auto border border-stone bg-paper">
          <table className="w-full min-w-[1024px] border-collapse text-sm">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={
                      'sticky top-0 whitespace-nowrap border-b border-stone bg-paper-warm px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint' +
                      (i === 0 ? ' z-10' : '')
                    }
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {disciplines.map((d, i) => {
                const meta = DISCIPLINE_META[d.id];
                const cat = CATEGORY_META[d.category];
                return (
                  <motion.tr
                    key={d.id}
                    custom={i % 8}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    onClick={() => scrollToSection(`#disc-${d.id}`)}
                    className="cursor-pointer border-b border-stone/60 transition-colors last:border-b-0 hover:bg-paper-warm"
                  >
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-2.5">
                        <HoldDot color={cat.color} size="sm" />
                        <span>
                          <span className="block font-semibold text-ink">
                            {t(d.nameZh, d.nameEn)}
                          </span>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                            {lang === 'zh' ? d.nameEn : d.nameZh}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-ink-soft">
                      {d.height}
                    </td>
                    <td className="max-w-[220px] px-4 py-3.5 text-xs leading-snug text-ink-soft">
                      {d.protection}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-2">
                        <DotRating n={gearBarrier(d.gear.length)} color="hold-amber" label={t('装备门槛', 'Gear barrier')} />
                        <span className="font-mono text-[10px] text-ink-faint">×{d.gear.length}</span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-ink-soft">
                      {meta ? t(meta.focusZh, meta.focusEn) : '—'}
                    </td>
                    <td className="px-4 py-3.5">
                      <DotRating n={meta?.risk ?? 3} color="hold-rose" label={t('风险', 'Risk')} />
                    </td>
                    <td className="px-4 py-3.5">
                      <DotRating n={meta?.beginner ?? 3} color="hold-sage" label={t('入门友好度', 'Beginner-friendly')} />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          <span className="inline-flex items-center gap-1.5">
            <HoldDot color="hold-amber" size="sm" /> {t('装备门槛', 'Gear barrier')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HoldDot color="hold-rose" size="sm" /> {t('风险带', 'Risk')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HoldDot color="hold-sage" size="sm" /> {t('入门友好度', 'Beginner-friendly')}
          </span>
        </p>
      </div>
    </section>
  );
}
