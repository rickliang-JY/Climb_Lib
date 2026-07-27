// Derived per-discipline presentation metadata for the Disciplines page.
// The content source of truth is src/data/disciplines.ts (do not edit);
// this file only adds page-level presentation params: risk bands, matrix
// ratings, imagery, glossary term picks and onward links.

import type { Discipline } from '@/data/disciplines';
import type { HoldColor } from '@/components/shared/HoldDot';
import { asset } from '@/lib/asset';

export interface DisciplineMeta {
  /** public/ image path; undefined -> color-block / HoldDot placeholder */
  image?: string;
  /** Risk band 1-5 (rendered as HoldDots) */
  risk: number;
  /** Beginner friendliness 1-5 (comparison matrix) */
  beginner: number;
  focusZh: string;
  focusEn: string;
  /** 3 glossary terms (verified against src/data/glossary.ts) */
  terms: string[];
  /** Related onward link */
  linkTo: string;
  linkZh: string;
  linkEn: string;
}

export const DISCIPLINE_META: Record<string, DisciplineMeta> = {
  bouldering: {
    image: asset('disc-bouldering.webp'),
    risk: 3,
    beginner: 5,
    focusZh: '爆发力 · 指力',
    focusEn: 'Power & fingers',
    terms: ['Dyno', 'Mantle', 'Crash Pad'],
    linkTo: '/competition',
    linkZh: '看抱石如何成为奥运项目',
    linkEn: 'See bouldering in competition',
  },
  'sport-climbing': {
    image: asset('disc-sport.webp'),
    risk: 2,
    beginner: 3,
    focusZh: '耐力 · 红点心理',
    focusEn: 'Endurance & redpoint mind',
    terms: ['Quickdraw', 'Redpoint', 'Bolt'],
    linkTo: '/history',
    linkZh: '回到 1980 年代的螺栓革命',
    linkEn: 'Back to the 1980s bolting revolution',
  },
  'traditional-climbing': {
    image: asset('disc-trad.webp'),
    risk: 4,
    beginner: 2,
    focusZh: '耐力 · 判断力',
    focusEn: 'Endurance & judgment',
    terms: ['Cam', 'Nut', 'Hand Jam'],
    linkTo: '/grades',
    linkZh: '查看传统攀等级与保护器材',
    linkEn: 'Trad grades & protection gear',
  },
  'lead-climbing': {
    image: asset('disc-lead.webp'),
    risk: 2,
    beginner: 3,
    focusZh: '耐力 · 节奏分配',
    focusEn: 'Endurance & pacing',
    terms: ['Lead Fall', 'Backclip', 'Z-Clip'],
    linkTo: '/competition',
    linkZh: '看难度赛如何计分',
    linkEn: 'How lead comps are scored',
  },
  'speed-climbing': {
    image: asset('disc-speed.webp'),
    risk: 1,
    beginner: 4,
    focusZh: '爆发力 · 起跑反应',
    focusEn: 'Explosiveness & reaction',
    terms: ['Beta', 'Sequence', 'Dyno'],
    linkTo: '/competition',
    linkZh: '看速度赛如何比赛',
    linkEn: 'See speed in competition',
  },
  'top-rope': {
    risk: 1,
    beginner: 5,
    focusZh: '基础耐力 · 动作打磨',
    focusEn: 'Base endurance & technique',
    terms: ['Top Rope', 'Anchor', 'Figure-Eight Knot'],
    linkTo: '/glossary',
    linkZh: '先学会保护与安全术语',
    linkEn: 'Learn the belay vocabulary first',
  },
  'big-wall': {
    image: asset('disc-bigwall.webp'),
    risk: 5,
    beginner: 1,
    focusZh: '意志 · 后勤管理',
    focusEn: 'Willpower & logistics',
    terms: ['Portaledge', 'Haul Bag', 'Multi-Pitch'],
    linkTo: '/history',
    linkZh: '回到大墙攀登的黄金年代',
    linkEn: 'Back to the golden age of big walls',
  },
  'aid-climbing': {
    risk: 4,
    beginner: 1,
    focusZh: '器械技术 · 耐心',
    focusEn: 'Gear craft & patience',
    terms: ['Aid Climbing', 'Screamer', 'Zipper'],
    linkTo: '/glossary',
    linkZh: '器械攀登相关术语',
    linkEn: 'Aid climbing vocabulary',
  },
  'free-solo': {
    image: asset('disc-freesolo.webp'),
    risk: 5,
    beginner: 1,
    focusZh: '心理控制 · 精确度',
    focusEn: 'Mind control & precision',
    terms: ['Free Solo', 'Free Climbing', 'Headpoint'],
    linkTo: '/glossary',
    linkZh: '术语：Free Solo 与 Free Climbing 之别',
    linkEn: 'Term: Free Solo vs. Free Climbing',
  },
  'deep-water-solo': {
    image: asset('disc-deepwater.webp'),
    risk: 3,
    beginner: 2,
    focusZh: '爆发力 · 胆魄',
    focusEn: 'Power & nerve',
    terms: ['Deep Water Solo', 'Traverse', 'Overhang'],
    linkTo: '/glossary',
    linkZh: '术语：Deep Water Solo',
    linkEn: 'Term: Deep Water Solo',
  },
  'ice-climbing': {
    risk: 4,
    beginner: 2,
    focusZh: '上肢力量 · 耐寒',
    focusEn: 'Upper body & cold tolerance',
    terms: ['V-Thread', 'Screamer', 'Anchor'],
    linkTo: '/grades',
    linkZh: '查看攀冰 WI 等级体系',
    linkEn: 'Ice grades: the WI scale',
  },
  'mixed-climbing': {
    risk: 4,
    beginner: 1,
    focusZh: '肩部力量 · 器械感知',
    focusEn: 'Shoulders & tool feel',
    terms: ['Figure-Four', 'Lock-off', 'Helmet'],
    linkTo: '/grades',
    linkZh: '查看混合 M 等级体系',
    linkEn: 'Mixed grades: the M scale',
  },
  'indoor-gym': {
    image: asset('disc-indoor.webp'),
    risk: 1,
    beginner: 5,
    focusZh: '综合体能 · 可量化',
    focusEn: 'All-round & measurable',
    terms: ['Volume', 'Jug', 'Gumby'],
    linkTo: '/wall-3d',
    linkZh: '去 3D 岩墙亲手摸一摸岩点',
    linkEn: 'Feel the holds on the 3D wall',
  },
  'crack-climbing': {
    risk: 3,
    beginner: 2,
    focusZh: '前臂耐力 · 疼痛耐受',
    focusEn: 'Forearms & tolerance',
    terms: ['Crack', 'Hand Jam', 'Fist Jam'],
    linkTo: '/glossary',
    linkZh: '裂缝手法全套术语',
    linkEn: 'Crack technique vocabulary',
  },
  'slab-face': {
    risk: 3,
    beginner: 3,
    focusZh: '平衡感 · 脚法精度',
    focusEn: 'Balance & footwork',
    terms: ['Slab', 'Smear', 'Runout'],
    linkTo: '/glossary',
    linkZh: '摩擦面与岩面术语',
    linkEn: 'Slab & face vocabulary',
  },
  'alpine-climbing': {
    image: asset('disc-alpine.webp'),
    risk: 5,
    beginner: 1,
    focusZh: '综合能力 · 连环决策',
    focusEn: 'All-round & serial decisions',
    terms: ['Simul-Climbing', 'Multi-Pitch', 'Epic'],
    linkTo: '/history',
    linkZh: '回到阿式攀登的起源',
    linkEn: 'Back to the origins of alpinism',
  },
};

export const CATEGORY_META: Record<
  Discipline['category'],
  { zh: string; en: string; color: HoldColor }
> = {
  rope: { zh: '绳索攀登', en: 'ROPED', color: 'hold-orange' },
  boulder: { zh: '抱石', en: 'BOULDERING', color: 'hold-amber' },
  'ice-mixed': { zh: '冰与混合', en: 'ICE & MIXED', color: 'hold-slate' },
  indoor: { zh: '室内', en: 'INDOOR', color: 'hold-sage' },
  specialty: { zh: '专项技艺', en: 'SPECIALTY', color: 'hold-rose' },
};

/** Gear barrier 1-5 derived from the length of the gear list. */
export function gearBarrier(gearCount: number): number {
  if (gearCount <= 2) return 1;
  if (gearCount <= 4) return 2;
  if (gearCount <= 5) return 3;
  if (gearCount <= 7) return 4;
  return 5;
}
