import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Create the site-wide Lenis smooth-scroll instance (call once in App). */
export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.09 });
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Smooth-scroll to a selector, falling back to native behavior. */
export function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -64 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
