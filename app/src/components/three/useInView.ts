import { useEffect, useRef, useState } from 'react';

/**
 * One-shot IntersectionObserver: flips to true the first time the element
 * approaches the viewport. Used to lazy-mount R3F canvases (perf budget).
 */
export function useInView<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, inView]);

  return { ref, inView };
}
