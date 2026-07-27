import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import SectionLabel from '@/components/shared/SectionLabel';
import { pioneers } from '@/data/history';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardIn: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: Math.min(i, 8) * 0.08, ease: EASE },
  }),
};

/** achievement field is bilingual "English / 中文" — split for the current language. */
function splitAchievement(achievement: string): { zh: string; en: string } {
  const parts = achievement.split(' / ');
  if (parts.length < 2) return { zh: achievement, en: achievement };
  return { en: parts[0], zh: parts[parts.length - 1] };
}

/**
 * History S3 — pioneers horizontal strip (Framer Motion tree).
 * Snap-scrolling archive cards; hover flips the card to clay/chalk.
 */
export default function PioneersStrip() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-stone bg-sand py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionLabel index="SEC.02" label={t('岩壁上的名字 NAMES ON THE ROCK', 'NAMES ON THE ROCK 岩壁上的名字')} />
          <h2 className="type-h2 mt-8 max-w-[720px] font-display text-ink">
            {t('岩壁上的名字', 'Names on the Rock')}
          </h2>
          <p className="mt-4 max-w-[65ch] leading-[1.85] text-ink-soft">
            {t(
              '从湖区的律师到奥运金牌得主 —— 这项运动由这些人一次次重新定义。',
              'From a Lake District barrister to Olympic champions — these people redefined the sport, again and again.',
            )}
          </p>
        </motion.div>
      </div>

      <div className="mt-12">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-10 lg:px-16">
          {pioneers.map((p, i) => {
            const ach = splitAchievement(p.achievement);
            return (
              <motion.article
                key={p.name}
                custom={i}
                variants={cardIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group flex w-[270px] shrink-0 snap-start flex-col border border-stone bg-paper p-6 transition-colors duration-300 hover:border-clay hover:bg-clay"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand font-display text-2xl font-bold text-ink transition-all duration-300 group-hover:rotate-[5deg] group-hover:bg-chalk group-hover:text-clay-deep">
                    {p.name.charAt(0)}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint transition-colors duration-300 group-hover:text-chalk/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-chalk">
                  {p.name}
                </h3>
                {p.nameZh ? (
                  <p className="mt-1 text-sm text-ink-soft transition-colors duration-300 group-hover:text-chalk/80">
                    {p.nameZh}
                  </p>
                ) : null}
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-clay-deep transition-colors duration-300 group-hover:text-chalk">
                  {p.era}
                </p>

                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-ink-soft transition-colors duration-300 group-hover:text-chalk/85">
                  {t(p.bioZh, p.bioEn)}
                </p>

                <p className="mt-auto border-t border-stone pt-4 text-xs leading-relaxed text-ink-faint transition-colors duration-300 group-hover:border-chalk/30 group-hover:text-chalk/75">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest">
                    {t('成就 ACHIEVEMENT', 'ACHIEVEMENT')}
                  </span>
                  {t(ach.zh, ach.en)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
