import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MousePointerClick, Move3d, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import type { SceneApi } from '@/components/three/WallScene';
import { useInView } from '@/components/three/useInView';
import HoldGlyph from '@/components/three/HoldGlyph';
import { metaFor } from '@/components/three/holdMeta';
import { holdTypes, wallHolds, wallRoutes } from '@/data/holds';
import type { HoldType, WallRoute } from '@/data/holds';
import { glossaryTerms } from '@/data/glossary';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionLabel } from '@/components/shared';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/asset';

// Code-split the WebGL scene (three.js) out of the initial bundle.
const WallScene = lazy(() => import('@/components/three/WallScene'));

const glossaryTermSet = new Set(glossaryTerms.map((g) => g.term));

const TEACHING = [
  { term: 'Route', zh: '线路', defZh: '同色胶带标记的攀爬路径', defEn: 'A climbing path marked by same-colored tape' },
  { term: 'Overhang', zh: '仰角', defZh: '前倾的墙面让难度陡增', defEn: 'A wall leaning past vertical raises the grade' },
  { term: 'Setting', zh: '定线', defZh: '岩馆设计师布置岩点的艺术', defEn: 'The art of arranging holds on a wall' },
  { term: 'Reading', zh: '读线', defZh: '上墙之前，先用眼睛爬一遍', defEn: 'Climb the route with your eyes before your hands' },
];

function StagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 opacity-60">
        <img src={asset('logo.svg')} alt="" className="h-10 w-10 brightness-0 invert" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-chalk/60">{label}</span>
      </div>
    </div>
  );
}

/** Capsule link to the glossary (TermChip styling, but navigable). */
function GlossaryLink({ term }: { term: string }) {
  return (
    <Link
      to={`/glossary?term=${encodeURIComponent(term)}`}
      className="inline-flex items-center rounded-full border border-stone bg-paper-warm px-3 py-1 font-mono text-sm font-medium text-clay-deep transition-colors duration-300 hover:border-clay hover:bg-clay/10 hover:text-clay"
    >
      {term}
    </Link>
  );
}

interface PanelProps {
  selected: { type: HoldType; route: WallRoute; holdId: number; position: [number, number, number] } | null;
  onBack: () => void;
  onPickType: (typeId: string) => void;
  typeFocus: string | null;
}

function InfoPanel({ selected, onBack, onPickType, typeFocus }: PanelProps) {
  const { t } = useLanguage();

  const typesOnWall = useMemo(() => {
    const counts = new Map<string, number>();
    for (const h of wallHolds) counts.set(h.holdTypeId, (counts.get(h.holdTypeId) ?? 0) + 1);
    return holdTypes.filter((ht) => counts.has(ht.id)).map((ht) => ({ type: ht, count: counts.get(ht.id) ?? 0 }));
  }, []);

  if (selected) {
    const { type, route, holdId, position } = selected;
    const meta = metaFor(type.id);
    const related = [meta.glossaryTerm, ...meta.related].filter(
      (term, i, arr) => glossaryTermSet.has(term) && arr.indexOf(term) === i,
    );
    return (
      <div className="p-6 md:p-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-faint transition-colors hover:text-clay"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('返回墙面总览', 'Back to wall overview')}
        </button>

        <div className="mt-6 flex items-center gap-4">
          <HoldGlyph
            id={type.id}
            category={type.category}
            color={route.color}
            className="h-12 w-12 shrink-0 text-ink"
          />
          <div className="min-w-0">
            <div className="font-mono text-2xl font-bold uppercase tracking-wide text-ink">{type.nameEn}</div>
            <div className="font-display text-lg font-bold text-ink-soft">{type.nameZh}</div>
          </div>
          <span
            className="ml-auto inline-flex shrink-0 items-center rounded-full px-3 py-1 font-mono text-sm font-bold text-chalk"
            style={{ backgroundColor: route.color }}
          >
            {route.grade}
          </span>
        </div>

        <p className="mt-4 font-mono type-caption uppercase text-ink-faint">
          HOLD #{String(holdId).padStart(2, '0')} ·{' '}
          {t(`离地 ${position[1].toFixed(1)} 米`, `${position[1].toFixed(1)} m off the ground`)} ·{' '}
          {t(route.nameZh, route.nameEn)}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{t(type.descZh, type.descEn)}</p>

        <div className="mt-5 rounded-md border border-stone/60 bg-sand p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            {t('手法 Grip beta', 'Grip beta')}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(type.techniqueZh, type.techniqueEn)}</p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink-faint">{t(route.descZh, route.descEn)}</p>

        {related.length > 0 && (
          <div className="mt-5">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {t('相关术语 Related terms', 'Related terms')}
            </div>
            <div className="flex flex-wrap gap-2">
              {related.map((term) => (
                <GlossaryLink key={term} term={term} />
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/holds?hold=${type.id}`}
          className="group mt-6 inline-flex items-center gap-2 font-mono text-sm font-medium text-clay transition-colors hover:text-clay-deep"
        >
          {t('在岩点库中查看独立 3D 模型', 'View the standalone 3D specimen')}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <SectionLabel index="SEC.06" label={t('INTERACTIVE WALL 交互岩墙', 'INTERACTIVE WALL')} />
      <h3 className="mt-5 font-display type-h2 text-ink">{t('这是一面可以摸的墙。', 'A wall you can touch.')}</h3>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
        {t(
          '38 个程序化生成的岩点按 5 条真实定线布置。旋转、缩放、点击任何岩点，查看它的类型、手法与所属线路。',
          '38 procedural holds are set across 5 routes. Orbit, zoom and click any hold to inspect its type, grip beta and route.',
        )}
      </p>

      <ul className="mt-6 space-y-2.5">
        {[
          { icon: Move3d, zh: '拖拽 Drag — 旋转视角', en: 'Drag — orbit the wall' },
          { icon: ZoomIn, zh: '滚动 Scroll — 缩放距离', en: 'Scroll — zoom in & out' },
          { icon: MousePointerClick, zh: '点击岩点 Click — 查看术语', en: 'Click a hold — inspect its beta' },
        ].map((row, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-ink-soft">
            <row.icon className="h-4 w-4 shrink-0 text-clay" />
            {t(row.zh, row.en)}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-y border-stone/60 py-3 font-mono type-caption uppercase text-ink-faint">
        {wallHolds.length} {t('个岩点 Holds', 'holds')} · {typesOnWall.length} {t('种类型 Types', 'types')} ·{' '}
        {wallRoutes.length} {t('条线路 Routes', 'routes')}
      </p>

      <div className="mt-6">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          {t('岩点类型图例 Hold legend（点击巡视该类岩点）', 'Hold legend (click to tour a type)')}
        </div>
        <p className="mb-3 text-xs leading-relaxed text-ink-faint">
          {t(
            '墙上岩点的颜色代表所属线路，形状代表类型 —— 下面是形状对照。',
            'On the wall, a hold’s color is its route and its shape is its type. These are the shapes.',
          )}
        </p>
        <ul>
          {typesOnWall.map(({ type, count }) => (
            <li key={type.id}>
              <button
                onClick={() => onPickType(type.id)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded px-2 py-2 text-left transition-all duration-300 hover:translate-x-1 hover:bg-paper-warm',
                  typeFocus === type.id && 'bg-paper-warm',
                )}
              >
                <HoldGlyph
                  id={type.id}
                  category={type.category}
                  className="h-7 w-7 shrink-0 text-ink"
                />
                <span className="font-mono text-sm font-medium uppercase text-ink">{type.nameEn}</span>
                <span className="text-sm text-ink-soft">{type.nameZh}</span>
                <span className="ml-auto font-mono text-xs text-ink-faint">×{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Wall3DPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  // ?focus=<holdTypeId> deep link (e.g. from /holds)
  const focusParam = searchParams.get('focus');
  const validFocus = focusParam && holdTypes.some((ht) => ht.id === focusParam) ? focusParam : null;

  const [typeFocus, setTypeFocus] = useState<string | null>(validFocus);
  const [routeFilter, setRouteFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(() =>
    validFocus ? (wallHolds.find((h) => h.holdTypeId === validFocus)?.id ?? null) : null,
  );
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tour, setTour] = useState<{ ids: number[]; idx: number } | null>(null);

  const { ref: hostRef, inView } = useInView<HTMLDivElement>();
  const apiRef = useRef<SceneApi | null>(null);
  const [coarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  );

  // Legend tour: hop the camera between holds of one type, 2s per stop.
  useEffect(() => {
    if (!tour) return;
    const iv = window.setInterval(() => {
      setTour((prev) => (prev ? { ...prev, idx: (prev.idx + 1) % prev.ids.length } : null));
    }, 2000);
    return () => window.clearInterval(iv);
  }, [tour]);

  // ESC returns to the overview.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
        setTour(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSelect = useCallback((id: number | null) => {
    setSelectedId(id);
    setTour(null);
  }, []);

  const handlePickType = useCallback(
    (typeId: string) => {
      if (typeFocus === typeId) {
        setTypeFocus(null);
        setTour(null);
        return;
      }
      setTypeFocus(typeId);
      setRouteFilter(null);
      setSelectedId(null);
      const ids = wallHolds.filter((h) => h.holdTypeId === typeId).map((h) => h.id);
      setTour(ids.length > 0 ? { ids, idx: 0 } : null);
    },
    [typeFocus],
  );

  const handlePickRoute = useCallback((routeId: string | null) => {
    setRouteFilter(routeId);
    setTypeFocus(null);
    setTour(null);
    // Drop the open hold panel when the filter would hide that hold, otherwise
    // the panel and camera stay locked onto a hold the wall no longer shows.
    setSelectedId((prev) => {
      if (prev === null || routeId === null) return prev;
      return wallHolds.find((h) => h.id === prev)?.routeTag === routeId ? prev : null;
    });
  }, []);

  const resetView = useCallback(() => {
    setSelectedId(null);
    setTour(null);
  }, []);

  const focusHoldId = selectedId ?? (tour ? tour.ids[tour.idx] : null);

  const selected = useMemo(() => {
    if (selectedId === null) return null;
    const hold = wallHolds.find((h) => h.id === selectedId);
    if (!hold) return null;
    const type = holdTypes.find((ht) => ht.id === hold.holdTypeId);
    const route = wallRoutes.find((r) => r.id === hold.routeTag);
    if (!type || !route) return null;
    return { type, route, holdId: hold.id, position: hold.position };
  }, [selectedId]);

  return (
    <div className="bg-ink text-chalk">
      <div className="lg:grid lg:grid-cols-[65%_35%]">
        {/* 3D stage */}
        <div
          ref={hostRef}
          data-lenis-prevent
          className="texture-granite relative h-[60vh] min-h-[420px] bg-ink lg:h-[calc(100dvh-4rem)]"
        >
          {inView ? (
            <Suspense fallback={<StagePlaceholder label={t('正在装载 3D 岩墙…', 'Loading 3D wall…')} />}>
              <WallScene
                selectedId={selectedId}
                hoveredId={hoveredId}
                routeFilter={routeFilter}
                typeFocus={typeFocus}
                focusHoldId={focusHoldId}
                enableZoom={!coarse}
                rotateSpeed={coarse ? 0.8 : 1}
                dpr={coarse ? [1, 1.5] : [1, 2]}
                apiRef={apiRef}
                onSelect={handleSelect}
                onHover={setHoveredId}
              />
            </Suspense>
          ) : (
            <StagePlaceholder label={t('正在装载 3D 岩墙…', 'Loading 3D wall…')} />
          )}

          {/* Route selector */}
          <div className="absolute inset-x-4 top-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <button
              onClick={() => handlePickRoute(null)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider backdrop-blur transition-colors',
                routeFilter === null
                  ? 'border-clay bg-clay text-chalk'
                  : 'border-chalk/25 bg-ink/60 text-chalk/85 hover:border-chalk/60',
              )}
            >
              {t('全部 All', 'All')}
            </button>
            {wallRoutes.map((route) => (
              <button
                key={route.id}
                onClick={() => handlePickRoute(routeFilter === route.id ? null : route.id)}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wider backdrop-blur transition-colors',
                  routeFilter === route.id
                    ? 'border-clay bg-clay text-chalk'
                    : 'border-chalk/25 bg-ink/60 text-chalk/85 hover:border-chalk/60',
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full ring-1 ring-chalk/70"
                  style={{ backgroundColor: route.color }}
                />
                {route.grade} {t(route.nameZh, route.nameEn)}
              </button>
            ))}
          </div>

          {/* Bottom-left hint */}
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-chalk/15 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/85 backdrop-blur-sm">
            LIVE 3D — {t('拖拽旋转 · 点击岩点', 'DRAG TO ORBIT · CLICK A HOLD')}
          </span>

          {/* Bottom-right: reset + (mobile) zoom buttons */}
          <div className="absolute bottom-3 right-4 flex gap-2">
            {coarse && (
              <>
                <button
                  onClick={() => apiRef.current?.zoomBy(0.8)}
                  aria-label={t('放大', 'Zoom in')}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/25 bg-ink/60 text-chalk/85 backdrop-blur transition-colors hover:border-chalk/60"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={() => apiRef.current?.zoomBy(1.25)}
                  aria-label={t('缩小', 'Zoom out')}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/25 bg-ink/60 text-chalk/85 backdrop-blur transition-colors hover:border-chalk/60"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
              </>
            )}
            <button
              onClick={resetView}
              aria-label={t('复位视角', 'Reset view')}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/25 bg-ink/60 text-chalk/85 backdrop-blur transition-colors hover:border-chalk/60"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Info panel */}
        <aside className="border-t border-chalk/10 bg-paper text-ink lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId ?? 'overview'}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <InfoPanel
                selected={selected}
                onBack={() => setSelectedId(null)}
                onPickType={handlePickType}
                typeFocus={typeFocus}
              />
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      {/* Teaching strip */}
      <section className="border-t border-chalk/10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-x-8 gap-y-6 px-6 py-10 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-16">
          {TEACHING.map((item, i) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border-l border-stone/40 pl-4"
            >
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-chalk/70">
                {item.term} <span className="text-stone">/ {item.zh}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-chalk/60">{t(item.defZh, item.defEn)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-24 text-center text-ink">
        <div className="mx-auto max-w-[720px] px-6">
          <SectionLabel index="NEXT" label={t('HOLDS 3D 岩点库', 'HOLDS 3D LIBRARY')} className="justify-center" />
          <h2 className="mt-6 font-display type-h1">{t('想逐个研究岩点？', 'Want to study each hold?')}</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-ink-soft">
            {t(
              '16 种岩点类型，每一种都有独立的可旋转 3D 标本与双语手法说明。',
              '16 hold types, each with its own rotatable 3D specimen and bilingual grip beta.',
            )}
          </p>
          <Link
            to="/holds"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-clay px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider text-chalk transition-colors duration-300 hover:bg-clay-deep"
          >
            {t('进入 3D 岩点库', 'Enter the Holds 3D library')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
