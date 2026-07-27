import { motion } from 'framer-motion';
import { knots } from '@/data/grades-gear';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Grid of the 8 essential knots. English knot names stay verbatim (design.md §6). */
export default function KnotsGrid() {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {knots.map((knot, i) => (
        <motion.article
          key={knot.nameEn}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
          className="group flex h-full flex-col border border-stone bg-sand/40 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
        >
          <span className="font-mono type-caption uppercase text-ink-faint">
            KNOT.{String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-mono text-base font-bold leading-snug text-clay-deep transition-colors group-hover:text-clay">
            {knot.nameEn}
          </h3>
          <span className="mt-0.5 text-sm font-medium text-ink">{knot.nameZh}</span>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(knot.useZh, knot.useEn)}</p>
          <div className="mt-auto pt-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              {t('使用场景', 'When to use')}
            </span>
            <p className="mt-1 border-l-2 border-clay pl-3 text-xs leading-relaxed text-ink-soft">
              {t(knot.whenZh, knot.when)}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
