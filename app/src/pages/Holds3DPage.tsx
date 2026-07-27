import { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mountain, ZoomIn, ZoomOut } from 'lucide-react';
import type { SceneApi } from '@/components/three/WallScene';
import { useInView } from '@/components/three/useInView';
import HoldGlyph from '@/components/three/HoldGlyph';
import {
  categoryLabels,
  gripLabels,
  metaFor,
  realSizeOf,
  textureLabels,
} from '@/components/three/holdMeta';
import { holdTypes } from '@/data/holds';
import type { HoldType } from '@/data/holds';
import { glossaryTerms } from '@/data/glossary';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArchiveTag, SectionLabel } from '@/components/shared';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/asset';

// Code-split the WebGL scene (three.js) out of the initial bundle.
const SpecimenScene = lazy(() => import('@/components/three/SpecimenScene'));

const glossaryTermSet = new Set(glossaryTerms.map((g) => g.term));

const gripNotes: Record<string, { zh: string; en: string }> = {
  'open-hand': {
    zh: '五指自然张开搭握，肌腱负荷最小，适合长时间悬挂。',
    en: 'Relaxed open grip; lowest tendon load, best for long hangs.',
  },
  crimp: {
    zh: '指节屈曲扣压棱边，力量大但需警惕滑车与屈肌腱负荷。',
    en: 'Flexed fingers on small edges; powerful but watch the pulleys.',
  },
  pinch: {
    zh: '拇指与四指对向夹捏，力量源自拇指根部的鱼际肌群。',
    en: 'Thumb opposes the fingers; power comes from the thenar muscles.',
  },
  pocket: {
    zh: '一到三根手指插入洞中承重，力量集中、稳定性高。',
    en: 'One to three fingers slotted in; focused but very stable.',
  },
  friction: {
    zh: '依靠掌面摩擦与精确的身体位置，重心必须保持在点的正下方。',
    en: 'Palm friction plus precise position; keep your center below the hold.',
  },
  foot: {
    zh: '鞋尖内侧精准放置，重量垂直压过支点，脚踝保持刚性。',
    en: 'Precise inside-toe placement, weight stacked vertically, stiff ankle.',
  },
};

/**
 * Five hold types share the `open-hand` grip, but the generic note ("relaxed
 * open grip, best for long hangs") contradicts what undercling, sidepull and
 * horn actually ask of the hand. Override the note per hold type where the
 * grip label alone is too coarse.
 */
const gripNoteByHold: Record<string, { zh: string; en: string }> = {
  undercling: {
    zh: '掌心朝上从下方扣住反向唇边，靠身体持续上移制造张力，站得越高越稳。',
    en: 'Palm up under the lip; tension comes from moving your hips up, so the higher you stand the better it holds.',
  },
  sidepull: {
    zh: '侧向勾住竖直棱边，像横拉门把一样发力，必须用对侧脚外沿或摆腿制造反向力偶。',
    en: 'Pull sideways on the vertical edge like a door handle; oppose it with an outside edge or a flag or you swing off.',
  },
  horn: {
    zh: '整只手从上方或侧方环握角状凸起，手指绕到背面勾牢。受力面大、方向明确，适合作为动态落点。',
    en: 'Wrap the whole hand over or around the horn with the fingers hooking behind it. Big surface and an obvious direction, so it makes a safe dyno target.',
  },
  edge: {
    zh: '四指并拢搭在棱边上，深棱用开放手长时间挂住，浅棱则切换为半扣增加咬合。',
    en: 'Four fingers along the rail: open-hand it when deep, switch to a half crimp when the edge gets thin.',
  },
};

function gripNoteFor(type: HoldType): { zh: string; en: string } {
  return gripNoteByHold[type.id] ?? gripNotes[type.grip];
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-chalk/60">{label}</span>
      <span className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.4, opacity: 0.25 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.3 }}
            className={cn('h-2 w-2 rounded-full', i <= value ? 'bg-clay' : 'bg-chalk/15')}
          />
        ))}
      </span>
      <span className="font-mono text-[11px] text-chalk/40">{value}/5</span>
    </div>
  );
}

export default function Holds3DPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();

  // ?hold=<holdTypeId> deep link (from Glossary / Wall 3D); default jug.
  const holdParam = searchParams.get('hold');
  const initialId = holdParam && holdTypes.some((ht) => ht.id === holdParam) ? holdParam : 'jug';

  const [selectedId, setSelectedId] = useState(initialId);
  const [catFilter, setCatFilter] = useState<'all' | HoldType['category']>('all');

  const { ref: stageRef, inView } = useInView<HTMLDivElement>();
  const apiRef = useRef<SceneApi | null>(null);
  const [coarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  );

  const type = holdTypes.find((ht) => ht.id === selectedId) ?? holdTypes[0];
  const meta = metaFor(type.id);

  const filtered = useMemo(
    () => (catFilter === 'all' ? holdTypes : holdTypes.filter((ht) => ht.category === catFilter)),
    [catFilter],
  );

  /**
   * Switching specimen is pointless if the stage has scrolled off screen, so
   * bring it back into view. The stage is deliberately not `sticky`: it sets
   * `data-lenis-prevent` to capture the wheel for zoom, which would trap the
   * page scroll if it were pinned to the top of the viewport.
   */
  const selectType = (id: string) => {
    setSelectedId(id);
    const el = stageRef.current;
    if (!el) return;
    const { top, bottom } = el.getBoundingClientRect();
    const offscreen = bottom < 140 || top > window.innerHeight - 120;
    if (offscreen) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const stepSelection = (dir: 1 | -1) => {
    const list = filtered.length > 0 ? filtered : holdTypes;
    const idx = list.findIndex((ht) => ht.id === type.id);
    const next = list[(idx + dir + list.length) % list.length];
    selectType(next.id);
  };

  const related = [meta.glossaryTerm, ...meta.related].filter(
    (term, i, arr) => glossaryTermSet.has(term) && arr.indexOf(term) === i,
  );

  const categories: Array<'all' | HoldType['category']> = ['all', 'positive', 'neutral', 'negative', 'foot', 'feature'];

  return (
    <div className="bg-ink text-chalk">
      {/* Page header */}
      <header className="mx-auto w-full max-w-[1440px] px-6 pb-8 pt-14 md:px-10 lg:px-16">
        <SectionLabel index="SEC.07" label={t('HOLDS 3D 岩点标本室', 'HOLDS 3D SPECIMEN ROOM')} tone="light" />
        <h1 className="mt-6 font-display display-lg text-chalk">{t('3D 岩点库', 'Holds 3D Library')}</h1>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-chalk/70">
          {t(
            '一座岩点标本陈列室：16 种程序化生成的岩点类型，每一种都可以旋转端详，并附上双语手法说明。点击左侧标本签切换。',
            'A specimen room of climbing holds: 16 procedurally generated types, each rotatable, each with bilingual grip beta. Pick a label on the left.',
          )}
        </p>
      </header>

      <div className="border-t border-chalk/10 lg:flex">
        {/* Type selector: sidebar on desktop, horizontal snap strip on mobile */}
        <aside className="shrink-0 border-b border-chalk/10 lg:w-[300px] lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap gap-2 px-4 py-4 md:px-6 lg:px-5">
            {categories.map((cat) => (
              <ArchiveTag
                key={cat}
                active={catFilter === cat}
                onClick={() => setCatFilter(cat)}
                className="border-chalk/30 text-chalk/75"
              >
                {cat === 'all' ? t('全部 All', 'All') : t(categoryLabels[cat].zh, categoryLabels[cat].en)}
              </ArchiveTag>
            ))}
          </div>
          <div className="flex snap-x snap-mandatory overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none]">
            {filtered.map((ht) => {
              const m = metaFor(ht.id);
              const active = ht.id === type.id;
              return (
                <button
                  key={ht.id}
                  onClick={() => selectType(ht.id)}
                  className={cn(
                    'group flex w-44 shrink-0 snap-start items-center gap-3 border-l-[3px] px-4 py-3 text-left transition-all duration-300 lg:w-full lg:hover:pl-5',
                    active ? 'border-clay bg-chalk/10' : 'border-transparent hover:bg-chalk/5',
                  )}
                >
                  <HoldGlyph
                    id={ht.id}
                    category={ht.category}
                    className="h-6 w-6 shrink-0 text-chalk"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                      {ht.nameEn}
                    </span>
                    <span className="block truncate text-xs text-chalk/60">{ht.nameZh}</span>
                  </span>
                  <span
                    className={cn(
                      'ml-auto shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px]',
                      active ? 'border-clay text-clay' : 'border-chalk/25 text-chalk/50',
                    )}
                  >
                    {t(m.bandZh, m.bandEn)}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main: stage + info */}
        <div className="min-w-0 flex-1">
          {/* 3D stage */}
          <div
            ref={stageRef}
            data-lenis-prevent
            className="texture-granite relative h-[50vh] min-h-[360px] lg:h-[58vh]"
          >
            {inView ? (
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-chalk/60">
                      {t('正在装载 3D 标本…', 'Loading specimen…')}
                    </span>
                  </div>
                }
              >
                <SpecimenScene
                  type={type}
                  enableZoom={!coarse}
                  rotateSpeed={coarse ? 0.8 : 1}
                  dpr={coarse ? [1, 1.5] : [1, 2]}
                  apiRef={apiRef}
                />
              </Suspense>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-3 opacity-60">
                  <img src={asset('logo.svg')} alt="" className="h-10 w-10 brightness-0 invert" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-chalk/60">
                    {t('正在装载 3D 标本…', 'Loading specimen…')}
                  </span>
                </div>
              </div>
            )}

            {/* HUD readout */}
            <div className="pointer-events-none absolute right-3 top-3 rounded-md border border-chalk/15 bg-ink/70 px-3 py-2 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/85 backdrop-blur-sm">
              <div className="text-clay">
                {t('标本', 'Specimen')} {type.nameEn.toUpperCase()}
              </div>
              <div className="mt-0.5 normal-case tracking-normal text-chalk/70">
                {t(realSizeOf(type.id).zh, realSizeOf(type.id).en)}
              </div>
              <div className="mt-0.5 text-chalk/55">
                {t(categoryLabels[type.category].zh, categoryLabels[type.category].en)} ·{' '}
                {t(textureLabels[type.texture].zh, textureLabels[type.texture].en)}
              </div>
            </div>
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-chalk/15 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/85 backdrop-blur-sm">
              LIVE 3D — {t('拖拽旋转 · 滚轮缩放', 'DRAG TO ORBIT · SCROLL TO ZOOM')}
            </span>
            {coarse && (
              <div className="absolute bottom-3 right-4 flex gap-2">
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
              </div>
            )}
          </div>

          {/* Info panel */}
          <AnimatePresence mode="wait">
            <motion.section
              key={type.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-chalk/10 px-6 py-10 md:px-10"
            >
              {/* Title */}
              <div className="flex flex-wrap items-center gap-4">
                <HoldGlyph
                  id={type.id}
                  category={type.category}
                  className="h-12 w-12 shrink-0 text-chalk"
                />
                <div>
                  <div className="font-mono text-3xl font-bold uppercase tracking-wide text-chalk">
                    {type.nameEn}
                  </div>
                  <div className="font-display text-xl font-bold text-chalk/80">{type.nameZh}</div>
                </div>
                <span className="ml-auto flex items-center gap-2">
                  <ArchiveTag className="border-clay text-clay">{t(meta.bandZh, meta.bandEn)}</ArchiveTag>
                  <ArchiveTag className="border-chalk/30 text-chalk/75">
                    {t(categoryLabels[type.category].zh, categoryLabels[type.category].en)}
                  </ArchiveTag>
                </span>
              </div>

              <p className="mt-5 max-w-[65ch] leading-relaxed text-chalk/80">{t(type.descZh, type.descEn)}</p>

              {/* Technique cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.4 }}
                  className="rounded-md border border-chalk/10 bg-chalk/[0.06] p-5 sm:col-span-2"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    {t('使用手法 Technique', 'Technique')}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-chalk/80">
                    {t(type.techniqueZh, type.techniqueEn)}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.13, duration: 0.4 }}
                  className="rounded-md border border-chalk/10 bg-chalk/[0.06] p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    {t('抓握类型 Grip', 'Grip type')}
                  </div>
                  <div className="mt-2 font-mono text-sm font-bold uppercase text-chalk">
                    {t(gripLabels[type.grip].zh, gripLabels[type.grip].en)}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-chalk/70">
                    {t(gripNoteFor(type).zh, gripNoteFor(type).en)}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.21, duration: 0.4 }}
                  className="rounded-md border border-chalk/10 bg-chalk/[0.06] p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    {t('质感与结构 Build', 'Texture & build')}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-chalk/70">
                    {t(textureLabels[type.texture].zh, textureLabels[type.texture].en)} ·{' '}
                    {t('背面螺栓平面安装', 'flat bolt-on back face')}
                  </p>
                  <p className="mt-2 font-mono text-[11px] leading-relaxed tracking-wide text-chalk/50">
                    {t(realSizeOf(type.id).zh, realSizeOf(type.id).en)}
                  </p>
                </motion.div>
              </div>

              {/* Stat bars */}
              <div className="mt-8 space-y-2.5 rounded-md border border-chalk/10 bg-chalk/[0.04] p-5">
                <StatBar label={t('指力需求 Finger', 'Finger load')} value={meta.finger} />
                <StatBar label={t('技巧需求 Skill', 'Technique')} value={meta.technique} />
                <StatBar label={t('出现频率 Freq.', 'Frequency')} value={meta.frequency} />
              </div>

              {/* Links + prev/next */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {related.map((term) => (
                  <Link
                    key={term}
                    to={`/glossary?term=${encodeURIComponent(term)}`}
                    className="inline-flex items-center rounded-full border border-chalk/25 px-3 py-1 font-mono text-sm font-medium text-clay transition-colors duration-300 hover:border-clay hover:bg-clay/10"
                  >
                    {term}
                  </Link>
                ))}
                <Link
                  to={`/wall-3d?focus=${type.id}`}
                  className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-clay transition-colors hover:text-chalk"
                >
                  <Mountain className="h-4 w-4" />
                  {t('在 3D 岩墙上找它', 'Find it on the 3D wall')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <span className="ml-auto flex gap-2">
                  <button
                    onClick={() => stepSelection(-1)}
                    className="flex items-center gap-1.5 rounded-full border border-chalk/25 px-3 py-1.5 font-mono text-xs text-chalk/75 transition-colors hover:border-clay hover:text-clay"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {t('上一个', 'Prev')}
                  </button>
                  <button
                    onClick={() => stepSelection(1)}
                    className="flex items-center gap-1.5 rounded-full border border-chalk/25 px-3 py-1.5 font-mono text-xs text-chalk/75 transition-colors hover:border-clay hover:text-clay"
                  >
                    {t('下一个', 'Next')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </span>
              </div>
            </motion.section>
          </AnimatePresence>

          {/* Bottom comparison strip: all 16 specimens */}
          <div className="border-t border-chalk/10 px-4 py-4 md:px-6">
            <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto [scrollbar-width:none]">
              {holdTypes.map((ht, i) => (
                <motion.button
                  key={ht.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  onClick={() => selectType(ht.id)}
                  className={cn(
                    'group flex w-20 shrink-0 snap-start flex-col items-center gap-1.5 rounded-md px-2 py-2.5 transition-all duration-300 hover:-translate-y-1',
                    ht.id === type.id ? 'bg-chalk/10 ring-1 ring-clay' : 'hover:bg-chalk/5',
                  )}
                >
                  <HoldGlyph
                    id={ht.id}
                    category={ht.category}
                    className={cn(
                      'h-8 w-8 transition-transform duration-300 group-hover:scale-110',
                      ht.id === type.id ? 'text-clay' : 'text-chalk/70',
                    )}
                  />
                  <span
                    className={cn(
                      'w-full truncate text-center font-mono text-[9px] uppercase tracking-wider',
                      ht.id === type.id ? 'text-clay' : 'text-chalk/55',
                    )}
                  >
                    {ht.nameEn}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
