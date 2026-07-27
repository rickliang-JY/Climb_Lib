import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/asset';

const NAV_ITEMS = [
  { to: '/', zh: '首页', en: 'Home' },
  { to: '/history', zh: '历史', en: 'History' },
  { to: '/disciplines', zh: '类型', en: 'Disciplines' },
  { to: '/competition', zh: '比赛', en: 'Competition' },
  { to: '/glossary', zh: '术语', en: 'Glossary' },
  { to: '/grades', zh: '等级·装备', en: 'Grades & Gear' },
  { to: '/wall-3d', zh: '3D 岩墙', en: '3D Wall' },
  { to: '/holds', zh: '岩点库', en: 'Holds 3D' },
] as const;

function LanguageSwitch({ tone }: { tone: 'dark' | 'light' }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={cn(
        'flex items-center rounded-full border p-0.5 font-mono text-xs',
        tone === 'dark' ? 'border-chalk/40 text-chalk' : 'border-stone text-ink-soft',
      )}
      role="group"
      aria-label="Language / 语言"
    >
      {(['zh', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            'rounded-full px-2.5 py-1 transition-colors duration-200',
            lang === l ? 'bg-clay text-chalk' : 'hover:text-clay',
          )}
        >
          {l === 'zh' ? '中' : 'EN'}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Only the home page has a dark full-bleed hero behind the transparent nav
  // (it opts out of Layout's pt-16 offset with -mt-16). Every other page sits
  // on the light `bg-paper` background there, so it always needs dark text.
  const hasDarkHero = pathname === '/';

  // Transparent over dark hero (light text) -> paper/blur with dark text after 80px
  const tone: 'dark' | 'light' = hasDarkHero && !scrolled && !drawerOpen ? 'dark' : 'light';

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-16 transition-all duration-500',
          scrolled
            ? 'border-b border-stone bg-paper/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label="THE CRAG ARCHIVE home">
            <img
              src={asset('logo.svg')}
              alt=""
              className={cn('h-8 w-8 transition-all duration-500', tone === 'dark' && 'brightness-0 invert')}
            />
            <span className="leading-none">
              <span
                className={cn(
                  'block font-display text-base font-bold tracking-tight',
                  tone === 'dark' ? 'text-chalk' : 'text-ink',
                )}
              >
                {t('岩馆', 'THE CRAG ARCHIVE')}
              </span>
              <span
                className={cn(
                  'mt-0.5 block font-mono text-[9px] uppercase tracking-[0.2em]',
                  tone === 'dark' ? 'text-chalk/70' : 'text-ink-faint',
                )}
              >
                {t('THE CRAG ARCHIVE', 'Climbing Knowledge Library')}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'nav-underline text-sm font-medium transition-colors',
                    tone === 'dark' ? 'text-chalk/90 hover:text-chalk' : 'text-ink-soft hover:text-ink',
                    isActive && 'text-clay',
                  )
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive} className="nav-underline">
                    {t(item.zh, item.en)}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/glossary')}
              className={cn(
                'hidden items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors md:flex',
                tone === 'dark'
                  ? 'border-chalk/40 text-chalk/80 hover:border-chalk hover:text-chalk'
                  : 'border-stone text-ink-faint hover:border-clay hover:text-clay',
              )}
              aria-label={t('搜索术语', 'Search glossary')}
            >
              <Search className="h-3.5 w-3.5" />
              <span>{t('术语', 'Terms')}</span>
              <kbd className="rounded border border-current px-1 text-[9px]">⌘K</kbd>
            </button>
            <LanguageSwitch tone={tone} />
            <button
              className={cn('xl:hidden', tone === 'dark' ? 'text-chalk' : 'text-ink')}
              onClick={() => setDrawerOpen(true)}
              aria-label={t('打开菜单', 'Open menu')}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-display text-lg font-bold text-chalk">{t('岩馆', 'THE CRAG ARCHIVE')}</span>
              <button onClick={() => setDrawerOpen(false)} aria-label={t('关闭菜单', 'Close menu')}>
                <X className="h-6 w-6 text-chalk" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline gap-4 py-2 font-display text-3xl font-bold text-chalk transition-colors hover:text-clay',
                        isActive && 'text-clay',
                      )
                    }
                  >
                    <span className="font-mono text-xs text-stone">{String(i + 1).padStart(2, '0')}</span>
                    {t(item.zh, item.en)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between px-8 pb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-stone">EST. 1860s</span>
              <LanguageSwitch tone="dark" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
