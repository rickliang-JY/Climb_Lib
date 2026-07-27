import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/shared/SectionLabel';
import { olympicTimeline } from '@/data/comps';
import { useLanguage } from '@/i18n/LanguageContext';
import { getLenis } from '@/lib/lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Competition S2 — the Olympic road.
 * GSAP-only component tree (no Framer Motion here).
 * Desktop (lg+): pinned section, vertical scroll drives the 5-stop track
 * horizontally. Mobile: plain vertical stack with a fade-up entrance.
 */
export default function OlympicTimeline() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Must be a layout effect, not useEffect. ScrollTrigger's `pin: true` wraps
  // this <section> in a .pin-spacer div that React does not know about, so on
  // unmount React tries to remove the section from a parent that no longer owns
  // it and the whole app dies with "removeChild: node is not a child of this
  // node". Layout-effect cleanups run during the mutation phase, before React
  // detaches host nodes, so ctx.revert() unwraps the spacer in time; passive
  // (useEffect) cleanups run after the removal has already thrown.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return undefined;

        const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        // cards enter: x 60 -> 0, stagger 0.15
        const intro = gsap.fromTo(
          '.ol-card',
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out', delay: 0.1 },
        );
        // year digits settle 0.9 -> 1
        const years = gsap.fromTo(
          '.ol-year',
          { scale: 0.9 },
          { scale: 1, duration: 0.9, stagger: 0.15, ease: 'expo.out', delay: 0.1, transformOrigin: 'left bottom' },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          intro.kill();
          years.kill();
        };
      });

      mm.add('(max-width: 1023px)', () => {
        const intro = gsap.fromTo(
          '.ol-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: trackRef.current, start: 'top 80%' },
          },
        );
        return () => {
          intro.scrollTrigger?.kill();
          intro.kill();
        };
      });
    }, sectionRef);

    // Keep ScrollTrigger in sync with the Lenis smooth scroller
    const lenis = getLenis();
    const update = () => ScrollTrigger.update();
    lenis?.on('scroll', update);

    return () => {
      lenis?.off('scroll', update);
      ctx.revert();
    };
  }, [lang]);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-ink lg:flex lg:h-screen lg:flex-col lg:justify-center">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 md:px-10 lg:px-16 lg:pt-0">
        <SectionLabel index="SEC.03.2" label={t('THE OLYMPICS 奥运', 'THE OLYMPICS 奥运')} tone="light" />
        <h2 className="type-h1 mt-8 max-w-[20ch] font-display text-chalk">
          {t('四年，从东京到洛杉矶。', 'Four years, from Tokyo to Los Angeles.')}
        </h2>
      </div>

      <div className="mt-12 pb-24 lg:mt-14 lg:pb-0">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 md:px-10 lg:w-max lg:flex-row lg:gap-8 lg:pl-16 lg:pr-24"
        >
          {olympicTimeline.map((e, i) => (
            <article
              key={e.year}
              className="ol-card shrink-0 border border-chalk/15 bg-chalk/[0.08] p-6 md:p-8 lg:w-[420px]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
                  {String(i + 1).padStart(2, '0')} / {String(olympicTimeline.length).padStart(2, '0')}
                </span>
                <span className="h-px w-16 bg-stone/50" aria-hidden="true" />
              </div>
              <div className="ol-year mt-6 font-display text-6xl font-bold leading-none text-clay md:text-7xl">
                {e.year}
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-chalk">
                {t(e.nameZh, e.nameEn)}
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-chalk/70">{t(e.textZh, e.textEn)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
