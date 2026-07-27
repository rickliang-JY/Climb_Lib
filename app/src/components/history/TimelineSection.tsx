import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoldDot from '@/components/shared/HoldDot';
import TermChip from '@/components/shared/TermChip';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { ERAS } from './eraConfig';
import type { EraBlock } from './eraConfig';

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, '0');

/** Split a title into animatable tokens: words for EN, chars for CJK. */
function splitTitle(text: string, lang: 'zh' | 'en'): string[] {
  if (lang === 'en') return text.split(' ');
  return Array.from(text);
}

/**
 * History S1+S2 — pin-style scroll timeline (GSAP-only component tree).
 * Desktop: sticky left progress panel (year readout / era title / node rail).
 * Mobile: no pin — vertical chapter flow with a sticky top progress bar.
 */
export default function TimelineSection() {
  const { lang, t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const panelTitleRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const mobileFillRef = useRef<HTMLDivElement>(null);
  const prevYearRef = useRef(ERAS[0].startYear);
  const [active, setActive] = useState(0);

  const activeEra: EraBlock = ERAS[active];

  /* Chapter activation + scroll-driven reveal animations. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');
      chapters.forEach((ch, i) => {
        // Era activation -> drives the sticky panel
        ScrollTrigger.create({
          trigger: ch,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });

        // Kicker
        gsap.fromTo(
          ch.querySelector('.era-kicker'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: { trigger: ch, start: 'top 72%' },
          },
        );
        // Title word/char stagger (0.03)
        gsap.fromTo(
          ch.querySelectorAll('.era-word'),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.03,
            ease: 'expo.out',
            scrollTrigger: { trigger: ch, start: 'top 70%' },
          },
        );
        // Image: clip-path from bottom (inset 100% -> 0) + scale 1.05 -> 1
        ch.querySelectorAll('.era-fig').forEach((fig) => {
          gsap.fromTo(
            fig,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: { trigger: fig, start: 'top 78%' },
            },
          );
          gsap.fromTo(
            fig.querySelector('img'),
            { scale: 1.05 },
            {
              scale: 1,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: { trigger: fig, start: 'top 78%' },
            },
          );
        });
        // Key events: stagger 0.12, x 24 -> 0 + clay rule draw (scaleY)
        const list = ch.querySelector('.evt-list');
        if (list) {
          gsap.fromTo(
            list.querySelectorAll('.evt'),
            { x: 24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'expo.out',
              scrollTrigger: { trigger: list, start: 'top 78%' },
            },
          );
          gsap.fromTo(
            list.querySelectorAll('.evt-line'),
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'expo.out',
              transformOrigin: 'top',
              scrollTrigger: { trigger: list, start: 'top 78%' },
            },
          );
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, [lang]);

  /* Panel readouts when the active era changes (low-frequency state). */
  useEffect(() => {
    const from = prevYearRef.current;
    const to = activeEra.startYear;
    prevYearRef.current = to;
    const counter = { v: from };
    // Big year: number tween (0.5s)
    gsap.to(counter, {
      v: to,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (yearRef.current) yearRef.current.textContent = String(Math.round(counter.v));
      },
    });
    // Progress fills
    const ratio = (active + 1) / ERAS.length;
    if (fillRef.current) {
      gsap.to(fillRef.current, { scaleY: ratio, duration: 0.6, ease: 'expo.out' });
    }
    if (mobileFillRef.current) {
      gsap.to(mobileFillRef.current, { scaleX: ratio, duration: 0.6, ease: 'expo.out' });
    }
    // Era title swap
    if (panelTitleRef.current) {
      gsap.fromTo(
        panelTitleRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' },
      );
    }
  }, [active, activeEra]);

  return (
    <div ref={rootRef} className="relative">
      {/* Mobile sticky progress bar (pin fallback) */}
      <div className="sticky top-16 z-30 border-b border-stone bg-paper/95 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between px-6 py-2.5 md:px-10">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            ERA {pad(active + 1)}/{pad(ERAS.length)}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-clay-deep">
            {t(activeEra.intro.labelZh, activeEra.intro.labelEn)}
          </span>
        </div>
        <div className="h-[2px] bg-sand">
          <div
            ref={mobileFillRef}
            className="h-full origin-left bg-clay"
            style={{ transform: `scaleX(${1 / ERAS.length})` }}
          />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-0 lg:px-16">
        {/* Left sticky progress panel (desktop) */}
        <aside className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 flex min-h-[80vh] flex-col justify-center gap-7 pr-16">
            <span className="font-mono type-caption uppercase tracking-[0.2em] text-ink-faint">
              ERA {pad(active + 1)} / {pad(ERAS.length)}
            </span>

            <div className="flex items-end gap-3">
              <span
                ref={yearRef}
                className="font-display text-[6.5rem] font-bold leading-[0.9] tracking-tight text-ink"
              >
                {activeEra.startYear}
              </span>
              <span className="pb-2 font-mono text-sm text-ink-faint">
                — {activeEra.endYear}
              </span>
            </div>

            <div ref={panelTitleRef} key={`${active}-${lang}`}>
              <h2 className="type-h2 font-display text-ink">
                {t(activeEra.intro.labelZh, activeEra.intro.labelEn)}
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                {lang === 'zh' ? activeEra.intro.labelEn : activeEra.intro.labelZh}
              </p>
            </div>

            {/* Vertical progress rail with era nodes */}
            <div className="mt-4 flex items-center gap-6">
              <div className="relative h-56 w-[3px] bg-sand">
                <div
                  ref={fillRef}
                  className="absolute inset-0 origin-top bg-clay"
                  style={{ transform: `scaleY(${1 / ERAS.length})` }}
                />
                {ERAS.map((era, i) => (
                  <span
                    key={era.era}
                    aria-hidden="true"
                    className={cn(
                      'absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-paper transition-all duration-500',
                      i <= active ? 'scale-110 bg-clay' : 'bg-stone',
                      i === active && 'scale-[1.35]',
                    )}
                    style={{ top: `${(i / (ERAS.length - 1)) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex h-56 flex-col justify-between py-0">
                {ERAS.map((era, i) => (
                  <span
                    key={era.era}
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-widest transition-colors duration-500',
                      i === active ? 'text-clay-deep' : 'text-ink-faint/60',
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                ))}
              </div>
            </div>

            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              {t(
                `${activeEra.events.length} 个关键事件`,
                `${activeEra.events.length} key events`,
              )}
            </span>
          </div>
        </aside>

        {/* Right column: era chapters */}
        <div className="lg:col-span-7 lg:border-l lg:border-stone lg:pl-16">
          {ERAS.map((era, i) => (
            <EraChapter key={era.era} era={era} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EraChapter({ era, index }: { era: EraBlock; index: number }) {
  const { lang, t } = useLanguage();
  const dark = era.dark;
  const title = t(era.intro.labelZh, era.intro.labelEn);

  return (
    <article
      data-chapter
      className={cn(
        'py-20 lg:py-28',
        index > 0 && !dark && 'border-t border-stone',
        dark &&
          '-mx-6 border-t border-ink bg-ink px-6 text-chalk md:-mx-10 md:px-10 lg:mx-0 lg:px-14',
      )}
    >
      <p className="era-kicker font-mono type-caption uppercase tracking-[0.2em] text-clay">
        ERA {pad(index + 1)} · {era.startYear} — {era.endYear}
      </p>

      <h3
        className={cn('type-h2 mt-4 font-display', dark ? 'text-chalk' : 'text-ink')}
        key={lang}
      >
        {splitTitle(title, lang).map((w, i) => (
          <span key={`${lang}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span className="era-word inline-block will-change-transform">
              {w}
              {lang === 'en' && i < splitTitle(title, lang).length - 1 ? ' ' : ''}
            </span>
          </span>
        ))}
      </h3>

      <figure className="mt-10">
        <div className="era-fig overflow-hidden border border-stone will-change-[clip-path]">
          <img
            src={era.image}
            alt={t(era.intro.labelZh, era.intro.labelEn)}
            className="aspect-[3/2] w-full object-cover will-change-transform"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
        <figcaption
          className={cn(
            'mt-3 font-mono text-[11px] uppercase tracking-widest',
            dark ? 'text-chalk/50' : 'text-ink-faint',
          )}
        >
          FIG.{pad(index + 1)} — {era.intro.labelEn}
        </figcaption>
      </figure>

      {era.secondaryImage ? (
        <figure className="mt-8 lg:w-3/4">
          <div className="era-fig overflow-hidden border border-stone will-change-[clip-path]">
            <img
              src={era.secondaryImage}
              alt={t('多洛米蒂岩塔时代', 'The Dolomite towers')}
              className="aspect-[3/2] w-full object-cover will-change-transform"
              loading="lazy"
            />
          </div>
          <figcaption
            className={cn(
              'mt-3 font-mono text-[11px] uppercase tracking-widest',
              dark ? 'text-chalk/50' : 'text-ink-faint',
            )}
          >
            FIG.{pad(index + 1)}B — THE ROCK TOWERS
          </figcaption>
        </figure>
      ) : null}

      <p
        className={cn(
          'mt-10 max-w-[65ch] leading-[1.9]',
          dark ? 'text-chalk/80' : 'text-ink-soft',
        )}
      >
        {t(era.intro.summaryZh, era.intro.summaryEn)}
      </p>

      {era.terms.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {era.terms.map((term) => (
            <TermChip
              key={term.term}
              term={term.term}
              zh={term.zh}
              defZh={term.defZh}
              defEn={term.defEn}
            />
          ))}
        </div>
      ) : null}

      {/* Key events */}
      <ol className="evt-list mt-12">
        {era.events.map((ev) => (
          <li key={`${ev.year}-${ev.titleEn}`} className="evt relative pb-10 pl-8 last:pb-0">
            <span
              className={cn(
                'evt-line absolute left-0 top-1.5 h-[calc(100%-0.5rem)] w-[2px]',
                ev.highlight ? 'bg-clay' : dark ? 'bg-chalk/25' : 'bg-stone',
              )}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={cn(
                  'font-mono text-sm font-medium',
                  dark ? 'text-clay' : 'text-clay-deep',
                )}
              >
                {ev.year}
              </span>
              {ev.highlight ? <HoldDot color="clay" size="sm" /> : null}
              <h4 className={cn('font-bold', dark ? 'text-chalk' : 'text-ink')}>
                {t(ev.titleZh, ev.titleEn)}
              </h4>
            </div>
            <p
              className={cn(
                'mt-2 max-w-[65ch] text-[15px] leading-[1.85]',
                dark ? 'text-chalk/70' : 'text-ink-soft',
              )}
            >
              {t(ev.textZh, ev.textEn)}
            </p>
          </li>
        ))}
      </ol>
    </article>
  );
}
