import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { gradeSystems } from '@/data/grades-gear';
import { useLanguage } from '@/i18n/LanguageContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Accordion of the five grade-system origin stories (gradeSystems data). */
export default function GradeSystems() {
  const { lang, t } = useLanguage();
  return (
    <Accordion type="single" collapsible defaultValue={gradeSystems[0].id} className="border-t border-stone">
      {gradeSystems.map((sys, i) => (
        <AccordionItem key={sys.id} value={sys.id} className="border-b border-stone">
          <AccordionTrigger className="group py-5 hover:no-underline">
            <span className="flex items-baseline gap-4 text-left">
              <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="block font-display text-xl font-bold text-ink transition-colors group-hover:text-clay md:text-2xl">
                  {sys.name}
                </span>
                <span className="mt-1 block text-sm text-ink-faint">{sys.nameZh}</span>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid gap-6 pb-2 pl-8 md:grid-cols-12 md:pl-12"
            >
              <p className="max-w-[65ch] text-sm leading-[1.9] text-ink-soft md:col-span-8">
                {lang === 'zh' ? sys.originZh : sys.originEn}
              </p>
              <div className="md:col-span-4">
                <span className="font-mono type-caption uppercase text-ink-faint">
                  {t('适用范围', 'Used for')}
                </span>
                <p className="mt-2 border-l-2 border-clay pl-3 font-mono text-xs leading-relaxed text-ink">
                  {sys.usedFor}
                </p>
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
