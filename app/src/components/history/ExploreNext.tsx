import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const linkIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

const LINKS = [
  { to: '/disciplines', zh: '攀岩类型', en: 'Disciplines' },
  { to: '/competition', zh: '比赛体系', en: 'Competition' },
  { to: '/glossary', zh: '术语库', en: 'Glossary' },
] as const;

/** History S4 — closing "keep exploring" editorial links (Framer Motion tree). */
export default function ExploreNext() {
  const { t } = useLanguage();

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 text-center md:px-10 lg:px-16">
        <motion.span
          className="font-mono type-caption uppercase tracking-[0.2em] text-ink-faint"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {t('继续探索 KEEP EXPLORING', 'KEEP EXPLORING 继续探索')}
        </motion.span>

        <nav className="mt-10 flex flex-col items-center gap-6" aria-label={t('继续探索', 'Keep exploring')}>
          {LINKS.map((link, i) => (
            <motion.div
              key={link.to}
              custom={i}
              variants={linkIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <Link
                to={link.to}
                className="group relative inline-flex items-baseline gap-4 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-tight text-ink transition-colors duration-300 hover:text-clay"
              >
                <span className="relative">
                  {t(link.zh, link.en)}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-center scale-x-0 bg-clay transition-transform duration-300 group-hover:scale-x-100"
                  />
                </span>
                <ArrowRight className="h-7 w-7 self-center transition-transform duration-300 group-hover:translate-x-1 group-hover:text-clay" />
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </section>
  );
}
