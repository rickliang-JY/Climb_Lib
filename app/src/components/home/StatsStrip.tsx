import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 160, suffix: '+', zh: '年攀岩历史', en: 'Years of history' },
  { value: 10, suffix: '', zh: '大攀岩类型', en: 'Disciplines' },
  { value: 100, suffix: '+', zh: '专业术语', en: 'Glossary terms' },
  { value: 8, suffix: '', zh: '种 3D 岩点', en: '3D hold types' },
];

/** Home S2 — stats strip. GSAP-only component tree (number tweens). */
export default function StatsStrip() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>('.stat-number');
      numbers.forEach((el) => {
        const target = Number(el.dataset.value ?? '0');
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 60%' },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
        });
      });
      gsap.fromTo(
        '.stat-label',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 60%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-sand py-16">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-y-10 px-6 md:px-10 lg:grid-cols-4 lg:px-16">
        {STATS.map((s, i) => (
          <div
            key={s.en}
            className={
              'flex flex-col items-start gap-2 ' +
              (i > 0 ? 'lg:border-l lg:border-stone lg:pl-10' : '')
            }
          >
            <span className="display-lg font-mono text-ink">
              <span className="stat-number" data-value={s.value}>
                0
              </span>
              {s.suffix}
            </span>
            <span className="stat-label text-sm text-ink-faint">{t(s.zh, s.en)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
