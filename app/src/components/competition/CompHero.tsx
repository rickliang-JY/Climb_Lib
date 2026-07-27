import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionLabel from '@/components/shared/SectionLabel';
import { useLanguage } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';

/** Split a string into individual characters (CJK-safe). */
function splitChars(text: string): string[] {
  return Array.from(text);
}

/**
 * Competition S0 — full-bleed 80vh hero over /comp-ifsc-wall.png.
 * GSAP-only component tree (no Framer Motion here).
 * Opts out of Layout's nav offset with -mt-16 so the nav overlays the image.
 */
export default function CompHero() {
  const { lang, t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const title = t('从岩壁到赛场。', 'From the crag to the arena.');
  const chars = splitChars(title);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background settle 1.06 -> 1 + overlay fade
      gsap.fromTo(
        bgRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.6, ease: 'expo.out' },
      );
      gsap.fromTo(
        '.comp-hero-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
      );
      gsap.fromTo(
        '.comp-hero-label',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'expo.out' },
      );
      // Char-level title reveal, stagger 0.04s
      gsap.fromTo(
        '.comp-hero-char',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.35, stagger: 0.04, ease: 'expo.out' },
      );
      // Intro y 20 -> 0, delay 0.5s after title
      gsap.fromTo(
        '.comp-hero-intro',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.85, ease: 'expo.out' },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={rootRef}
      className="relative -mt-16 flex h-[80vh] min-h-[540px] items-end overflow-hidden bg-ink"
    >
      <img
        ref={bgRef}
        src={asset('comp-ifsc-wall.png')}
        alt={t('IFSC 世界杯比赛墙全景', 'IFSC World Cup competition wall panorama')}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="comp-hero-overlay absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="comp-hero-label">
          <SectionLabel index="SEC.03" label={t('COMPETITION 比赛', 'COMPETITION 比赛')} tone="light" />
        </div>
        <h1 className="display-lg mt-6 font-display text-chalk" aria-label={title}>
          {chars.map((c, i) => (
            <span key={`${c}-${i}`} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
              <span className="comp-hero-char inline-block">{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
        </h1>
        <p className="comp-hero-intro mt-6 max-w-[65ch] text-lg leading-[1.9] text-chalk/85">
          {t(
            '抱石、难度、速度 —— 三种赛制，一个奥运舞台。读懂规则，你就看懂了每一届 IFSC 世界杯。',
            'Boulder, Lead, Speed — three formats, one Olympic stage. Understand the rules, and every IFSC World Cup makes sense.',
          )}
        </p>
      </div>
    </section>
  );
}
