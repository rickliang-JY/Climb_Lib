import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import SectionLabel from '@/components/shared/SectionLabel';
import { useLanguage } from '@/i18n/LanguageContext';

/** Split a string into individual characters (CJK-safe). */
function splitChars(text: string): string[] {
  return Array.from(text);
}

/**
 * History S0 — page hero (GSAP-only component tree).
 * Char-staggered title, drawn year scale (1860 — 2025), floating scroll cue.
 */
export default function HistoryHero() {
  const { lang, t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);

  const title = t('垂直的进化史', 'The Vertical Evolution');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Char-level title reveal (stagger 0.04)
      gsap.fromTo(
        '.hh-char',
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, stagger: 0.04, ease: 'expo.out' },
      );
      gsap.fromTo(
        '.hh-intro',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.9, ease: 'expo.out' },
      );
      // Year scale: draw lines 0 -> 1 (1.4s)
      gsap.fromTo(
        '.hh-scale-line-v',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.4, delay: 0.5, ease: 'expo.out', transformOrigin: 'top' },
      );
      gsap.fromTo(
        '.hh-scale-line-h',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, delay: 0.5, ease: 'expo.out', transformOrigin: 'left' },
      );
      gsap.fromTo(
        '.hh-scale-label',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' },
      );
      // Scroll cue: floating arrow (8px, 1.2s, infinite)
      gsap.to('.hh-arrow', {
        y: 8,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.fromTo(
        '.hh-scroll-hint',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.5, ease: 'power2.out' },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={rootRef} className="relative overflow-hidden border-b border-stone bg-paper">
      <div className="texture-granite pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-20 md:px-10 md:pb-24 md:pt-28 lg:px-16">
        <SectionLabel index="SEC.01" label={t('HISTORY 历史', 'HISTORY 历史')} />

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="display-lg font-display text-ink" key={lang}>
              {splitChars(title).map((c, i) => (
                <span key={`${lang}-${i}`} className="inline-block overflow-hidden align-bottom">
                  <span className="hh-char inline-block will-change-transform">
                    {c === ' ' ? ' ' : c}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hh-intro mt-8 max-w-[65ch] text-lg leading-[1.9] text-ink-soft">
              {t(
                '从 1860 年代阿尔卑斯山的绳索，到 2020 年东京的奥运赛场 —— 攀岩用 160 年完成了一场从登山分支到独立运动的进化。向下滚动，穿越六个时代。',
                'From the ropes of the 1860s Alps to the Olympic arena of Tokyo 2020, climbing spent 160 years evolving from a branch of mountaineering into a sport of its own. Scroll down through six eras.',
              )}
            </p>

            {/* Horizontal year scale (mobile / below text on desktop) */}
            <div className="mt-14 lg:hidden">
              <div className="flex items-center gap-4">
                <span className="hh-scale-label font-mono type-caption text-ink-faint">1860</span>
                <span className="hh-scale-line-h h-px flex-1 bg-stone" aria-hidden="true" />
                <span className="hh-scale-label font-mono type-caption text-ink-faint">2025</span>
              </div>
            </div>
          </div>

          {/* Vertical year scale (desktop, right rail) */}
          <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
            <div className="flex flex-col items-center gap-3">
              <span className="hh-scale-label font-mono type-caption text-ink-faint">1860</span>
              <span className="hh-scale-line-v w-px flex-1 bg-stone" aria-hidden="true" />
              <span
                className="hh-scale-label origin-center -rotate-90 font-mono type-caption uppercase tracking-[0.3em] text-ink-faint"
                aria-hidden="true"
              >
                {t('年 ARCHIVE', 'YEARS')}
              </span>
              <span className="hh-scale-line-v w-px flex-1 bg-stone" aria-hidden="true" />
              <span className="hh-scale-label font-mono type-caption text-ink-faint">2025</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hh-scroll-hint mt-16 flex items-center gap-3 text-ink-faint">
          <span className="hh-arrow inline-block will-change-transform">
            <ArrowDown className="h-4 w-4" />
          </span>
          <span className="font-mono type-caption uppercase tracking-[0.2em]">
            {t('向下滚动 · 进入时间线', 'Scroll · Enter the timeline')}
          </span>
        </div>
      </div>
    </section>
  );
}
