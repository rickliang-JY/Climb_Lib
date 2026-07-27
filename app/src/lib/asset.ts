/**
 * Resolve a file that lives in /public against Vite's base path.
 *
 * Vite rewrites `/foo.png` inside index.html and CSS `url()` at build time, but
 * NOT inside JS/TS string literals — those ship verbatim. On GitHub Pages the
 * site is served from /<repo>/, so a bare "/hero-wall.png" would resolve to the
 * domain root and 404. Every reference to a public asset from code must go
 * through here.
 */
export function asset(file: string): string {
  return `${import.meta.env.BASE_URL}${file.replace(/^\/+/, '')}`;
}
