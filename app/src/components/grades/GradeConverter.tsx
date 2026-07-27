import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { ropeGrades, boulderGrades } from '@/data/grades-gear';
import type { GradeRow, BoulderGradeRow } from '@/data/grades-gear';
import { useLanguage } from '@/i18n/LanguageContext';
import HoldDot from '@/components/shared/HoldDot';
import type { HoldColor } from '@/components/shared/HoldDot';
import { cn } from '@/lib/utils';

type Mode = 'rope' | 'boulder';

type AnyRow = GradeRow | BoulderGradeRow;

interface SystemDef {
  id: string;
  /** Constant English label (system names never translate) */
  name: string;
  nameZh: string;
  getValue: (row: AnyRow) => string;
}

const SYSTEMS: Record<Mode, SystemDef[]> = {
  rope: [
    { id: 'yds', name: 'YDS', nameZh: '美国', getValue: (r) => (r as GradeRow).yds },
    { id: 'french', name: 'French', nameZh: '法国', getValue: (r) => (r as GradeRow).french },
    { id: 'uiaa', name: 'UIAA', nameZh: '国际山岳联盟', getValue: (r) => (r as GradeRow).uiaa },
  ],
  boulder: [
    { id: 'v', name: 'V-scale', nameZh: '美国抱石', getValue: (r) => (r as BoulderGradeRow).v },
    { id: 'font', name: 'Font', nameZh: '枫丹白露', getValue: (r) => (r as BoulderGradeRow).font },
  ],
};

const ROWS: Record<Mode, AnyRow[]> = { rope: ropeGrades, boulder: boulderGrades };

/** Milestone tick marks on the slider, keyed by the grade value in the first system of each mode. */
const MILESTONES: Record<Mode, { key: string; zh: string; en: string }[]> = {
  rope: [
    { key: '5.10a', zh: '进阶之门', en: 'Gateway to intermediate' },
    { key: '5.12a', zh: '资深分水岭', en: 'The dedicated divide' },
    { key: '5.14a', zh: '精英层级', en: 'Elite level' },
    { key: '5.15a', zh: '世界之巅', en: 'Top of the world' },
  ],
  boulder: [
    { key: 'V4', zh: '进阶之门', en: 'Gateway to intermediate' },
    { key: 'V8', zh: '资深分水岭', en: 'The dedicated divide' },
    { key: 'V12', zh: '精英层级', en: 'Elite level' },
    { key: 'V16', zh: '世界之巅', en: 'Top of the world' },
  ],
};

interface Band {
  id: string;
  zh: string;
  en: string;
  color: HoldColor;
}

const BANDS: { max: number; band: Band }[] = [
  { max: 0.15, band: { id: 'beginner', zh: '入门', en: 'Beginner', color: 'hold-sage' } },
  { max: 0.4, band: { id: 'intermediate', zh: '进阶', en: 'Intermediate', color: 'hold-amber' } },
  { max: 0.65, band: { id: 'advanced', zh: '高级', en: 'Advanced', color: 'hold-orange' } },
  { max: 0.85, band: { id: 'elite', zh: '精英', en: 'Elite', color: 'hold-rose' } },
  { max: 1.01, band: { id: 'worldclass', zh: '世界级', en: 'World class', color: 'hold-slate' } },
];

function bandFor(ratio: number): Band {
  return (BANDS.find((b) => ratio < b.max) ?? BANDS[BANDS.length - 1]).band;
}

/** Unique grade values of a system, mapped to the first row index where they appear. */
function uniqueValues(rows: AnyRow[], getValue: (r: AnyRow) => string): { value: string; index: number }[] {
  const seen = new Map<string, number>();
  rows.forEach((row, i) => {
    const v = getValue(row);
    if (!seen.has(v)) seen.set(v, i);
  });
  return Array.from(seen, ([value, index]) => ({ value, index }));
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GradeConverter() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>('rope');
  const [index, setIndex] = useState(0);

  const rows = ROWS[mode];
  const systems = SYSTEMS[mode];
  const maxIndex = rows.length - 1;
  const row = rows[Math.min(index, maxIndex)];
  const band = bandFor(maxIndex === 0 ? 0 : index / maxIndex);

  // Unique-value lists per system (for selects and the mini range indicator)
  const valueLists = useMemo(() => systems.map((s) => uniqueValues(rows, s.getValue)), [systems, rows]);

  // Milestone markers resolved to slider positions
  const markers = useMemo(
    () =>
      MILESTONES[mode]
        .map((m) => {
          const keyGetter = systems[0].getValue;
          const i = rows.findIndex((r) => keyGetter(r) === m.key);
          return i >= 0 ? { ...m, index: i, pct: maxIndex === 0 ? 0 : (i / maxIndex) * 100 } : null;
        })
        .filter((m): m is NonNullable<typeof m> => m !== null),
    [mode, rows, systems, maxIndex],
  );

  // Intro demo: tween the handle from the left end to 5.10 on mount
  useEffect(() => {
    const target = ROWS.rope.findIndex((r) => (r as GradeRow).yds === '5.10a');
    const controls = animate(0, Math.max(0, target), {
      duration: 1.2,
      delay: 0.3,
      ease: EASE,
      onUpdate: (v) => setIndex(Math.round(v)),
    });
    return () => controls.stop();
  }, []);

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    const nextRows = ROWS[next];
    const nextMax = nextRows.length - 1;
    // Keep the relative difficulty position across the two tables
    setIndex(Math.round((index / maxIndex) * nextMax));
    setMode(next);
  };

  return (
    <div className="border border-stone bg-sand/50">
      {/* Card header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone px-6 py-4 md:px-10">
        <span className="font-mono type-caption uppercase text-ink-faint">TOOL.01 / GRADE CONVERTER</span>
        {/* Mode toggle */}
        <div className="flex rounded-full border border-stone bg-paper p-1" role="group" aria-label={t('攀爬模式', 'Climbing mode')}>
          {(['rope', 'boulder'] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={cn(
                'relative rounded-full px-4 py-1.5 font-mono text-xs tracking-wide transition-colors duration-300',
                mode === m ? 'text-chalk' : 'text-ink-soft hover:text-clay',
              )}
            >
              {mode === m && (
                <motion.span
                  layoutId="converter-mode-pill"
                  className="absolute inset-0 rounded-full bg-clay"
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                />
              )}
              <span className="relative z-10">{m === 'rope' ? t('运动攀 / 难度', 'Roped') : t('抱石', 'Bouldering')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 md:px-10 md:py-10">
        {/* Slider with milestone markers */}
        <div className="relative">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={maxIndex}
              step={1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              aria-label={t('难度刻度滑杆', 'Difficulty scale slider')}
              className={cn(
                'h-10 w-full cursor-pointer appearance-none bg-transparent',
                '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full',
                '[&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-hold-sage [&::-webkit-slider-runnable-track]:via-hold-orange [&::-webkit-slider-runnable-track]:to-ink',
                '[&::-webkit-slider-thumb]:-mt-3 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
                '[&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-chalk [&::-webkit-slider-thumb]:bg-ink [&::-webkit-slider-thumb]:shadow-card',
                '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110',
                '[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full',
                '[&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-hold-sage [&::-moz-range-track]:via-hold-orange [&::-moz-range-track]:to-ink',
                '[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-chalk [&::-moz-range-thumb]:bg-ink',
              )}
            />
            {/* Milestone markers (thumb is 32px wide: compensate so markers align with thumb center) */}
            {markers.map((m) => (
              <div
                key={m.key}
                className="group absolute top-1/2 z-10 -translate-y-1/2"
                style={{ left: `calc(${m.pct}% + ${16 - (m.pct / 100) * 32}px)` }}
              >
                <button
                  onClick={() => setIndex(m.index)}
                  aria-label={`${m.key} — ${t(m.zh, m.en)}`}
                  className={cn(
                    'block h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink transition-all duration-200 group-hover:scale-125',
                    index === m.index ? 'bg-clay' : 'bg-chalk',
                  )}
                />
                {/* Milestone tooltip */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-0 z-30 mb-3 w-44 -translate-x-1/2 translate-y-1 border border-stone bg-ink p-2.5 text-left opacity-0 shadow-card transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span className="block font-mono text-sm font-bold text-chalk">{m.key}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-chalk/80">{t(m.zh, m.en)}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            <span>{mode === 'rope' ? '5.6' : 'VB'}</span>
            <span className="flex items-center gap-1.5 normal-case tracking-normal">
              <MoveHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              {t('拖动滑杆，或直接点选任一体系的等级', 'Drag the slider, or pick a grade in any system')}
            </span>
            <span>{mode === 'rope' ? '5.15d' : 'V17'}</span>
          </div>
        </div>

        {/* System readout rows */}
        <div className="mt-8">
          {systems.map((sys, si) => {
            const value = sys.getValue(row);
            const list = valueLists[si];
            const pos = list.findIndex((v) => v.value === value);
            const pct = list.length <= 1 ? 0 : (Math.max(0, pos) / (list.length - 1)) * 100;
            return (
              <motion.div
                key={`${mode}-${sys.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + si * 0.06, duration: 0.5, ease: EASE }}
                className="grid grid-cols-1 items-center gap-3 border-t border-stone/70 py-4 first:border-t-0 md:grid-cols-12 md:gap-6"
              >
                {/* System name + band dot */}
                <div className="flex items-center gap-3 md:col-span-3">
                  <HoldDot color={band.color} size="sm" />
                  <div className="leading-tight">
                    <span className="block font-mono text-sm font-bold uppercase tracking-wider text-ink">{sys.name}</span>
                    <span className="block text-xs text-ink-faint">{t(sys.nameZh, sys.name)}</span>
                  </div>
                </div>
                {/* Current value (big mono) + mini range indicator */}
                <div className="md:col-span-6">
                  <div className="flex h-12 items-center overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={value}
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -18, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="font-mono text-4xl font-bold tracking-tight text-ink md:text-5xl"
                      >
                        {value}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="mt-2 h-1 w-full max-w-xs rounded-full bg-stone/50">
                    <div
                      className="h-full rounded-full bg-clay transition-all duration-300"
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
                {/* Direct select */}
                <div className="md:col-span-3 md:justify-self-end">
                  <label className="sr-only" htmlFor={`select-${mode}-${sys.id}`}>
                    {sys.name}
                  </label>
                  <select
                    id={`select-${mode}-${sys.id}`}
                    value={pos >= 0 ? list[pos].index : index}
                    onChange={(e) => setIndex(Number(e.target.value))}
                    className="w-full cursor-pointer border border-stone bg-paper px-3 py-2 font-mono text-sm text-ink transition-colors hover:border-clay focus:border-clay focus:outline-none md:w-36"
                  >
                    {list.map((v) => (
                      <option key={v.value} value={v.index}>
                        {v.value}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Band + interpretation */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-stone/70 pt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone bg-paper px-3 py-1.5">
            <HoldDot color={band.color} size="sm" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">{t(band.zh, band.en)}</span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${mode}-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="min-w-0 flex-1 text-sm leading-relaxed text-ink-soft"
            >
              {t(row.noteZh ?? '', row.note ?? '')}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
