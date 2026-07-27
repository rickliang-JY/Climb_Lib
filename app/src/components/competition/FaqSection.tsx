import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SectionLabel from '@/components/shared/SectionLabel';
import { compTerms } from '@/data/comps';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: EASE },
  }),
};

/** Competition S4 — competition terminology FAQ accordion (data: compTerms). */
export default function FaqSection() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-stone bg-paper-warm py-24 md:py-32">
      <div className="mx-auto w-full max-w-[720px] px-6">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <SectionLabel index="SEC.03.4" label={t('竞技术语 COMP TERMS', 'COMP TERMS 竞技术语')} />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="type-h2 mt-8 font-display text-ink"
        >
          {t('看懂比赛，先懂这些词。', 'Learn the words, read the game.')}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="border-t border-stone">
            {compTerms.map((term, i) => (
              <AccordionItem key={term.term} value={`term-${i}`} className="border-stone">
                <AccordionTrigger className="gap-4 py-5 hover:no-underline">
                  <span className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1 text-left">
                    <span className="font-mono text-[10px] tracking-widest text-ink-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm font-bold text-clay">{term.term}</span>
                    <span className="text-sm font-medium text-ink">{term.zh}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="max-w-[65ch] pl-8 text-sm leading-[1.9] text-ink-soft"
                  >
                    {t(term.defZh, term.defEn)}
                  </motion.p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
