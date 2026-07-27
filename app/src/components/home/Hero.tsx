import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { scrollToSection } from '@/lib/lenis';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

/** Split a string into individual characters (CJK-safe). */
function splitChars(text: string): string[] {
  return Array.from(text);
}

/**
 * Home S0 — full-bleed hero. GSAP-only component tree (no Framer Motion here).
 * Opts out of Layout's nav offset with -mt-16 so the nav overlays the image.
 */
export default function Hero() {
  const { lang, t } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const line1 = t('从砂岩', 'FROM SANDSTONE');
  const line2 = t('到奥运。', 'TO THE OLYMPICS.');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Load-in: background settle + overlay fade
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: 'expo.out' },
      );
      gsap.fromTo('.hero-overlay', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });
      // Separate tween: the grain texture only ever reaches 6% opacity, unlike
      // the ink gradient above, so it can't share the `.hero-overlay` selector.
      gsap.fromTo('.hero-grain', { opacity: 0 }, { opacity: 0.06, duration: 1.2, ease: 'power2.out' });
      // Char-level title reveal (stagger 0.04, delay 0.3)
      gsap.fromTo(
        '.hero-char',
        { y: 40, rotate: 3, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1, delay: 0.3, stagger: 0.04, ease: 'expo.out' },
      );
      // Subtitle + CTAs
      gsap.fromTo(
        '.hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.9, ease: 'expo.out' },
      );
      gsap.fromTo(
        '.hero-cta',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, stagger: 0.12, ease: 'expo.out' },
      );
      // Scroll parallax: bg 0.3, content 0.15 + fade
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(contentRef.current, {
        yPercent: 15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom 30%', scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={rootRef} className="relative -mt-16 min-h-[100dvh] overflow-hidden bg-ink">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img src={asset('hero-wall.png')} alt="" className="h-full w-full object-cover" />
      </div>
      {/* Ink gradient overlay (bottom 60% -> transparent) + granite noise */}
      <div
        className="hero-overlay absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(43,38,32,0.92) 0%, rgba(43,38,32,0.55) 40%, rgba(43,38,32,0) 70%)' }}
      />
      <div className="hero-grain texture-granite absolute inset-0 opacity-0" />

      {/* Vertical deco text, bottom-right */}
      <div className="absolute bottom-24 right-2 hidden origin-bottom-right rotate-90 lg:block">
        <span className="font-mono type-caption uppercase tracking-[0.3em] text-chalk/60">
          EST. 1860s — VERTICAL ARCHIVE
        </span>
      </div>

      {/* Content, bottom-left */}
      <div ref={contentRef} className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-24 md:px-10 lg:px-16">
        <div className="w-full max-w-[1440px]">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono type-caption uppercase text-stone">VOL.01</span>
            <span className="h-px w-12 bg-stone" aria-hidden="true" />
            <span className="font-mono type-caption uppercase text-stone">
              A CLIMBING KNOWLEDGE LIBRARY / 攀岩知识图书馆
            </span>
          </div>

          <h1 className="display-xl font-display text-chalk" key={lang}>
            <span className="block overflow-hidden">
              {splitChars(line1).map((c, i) => (
                <span key={`l1-${i}`} className="hero-char inline-block will-change-transform">
                  {c === ' ' ? ' ' : c}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden text-clay">
              {splitChars(line2).map((c, i) => (
                <span key={`l2-${i}`} className="hero-char inline-block will-change-transform">
                  {c === ' ' ? ' ' : c}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-sub mt-8 max-w-[65ch] text-lg leading-[1.9] text-chalk/80">
            {t(
              '攀岩的完整百科 —— 历史、类型、比赛、术语、等级与装备，以及可旋转的 3D 岩墙。',
              'The complete encyclopedia of climbing — history, disciplines, competitions, glossary, grades & gear, plus an interactive 3D wall.',
            )}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('#manifesto')}
              className="hero-cta group inline-flex items-center gap-2 bg-clay px-7 py-3.5 text-sm font-semibold text-chalk transition-colors duration-300 hover:bg-clay-deep"
            >
              {t('开始探索 · 进入图书馆', 'Start exploring the library')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <Link
              to="/wall-3d"
              className="hero-cta group inline-flex items-center gap-2 border border-chalk/60 px-7 py-3.5 text-sm font-semibold text-chalk transition-colors duration-300 hover:border-chalk hover:bg-chalk/10"
            >
              {t('进入 3D 岩墙', 'Enter the 3D wall')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
