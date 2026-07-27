// Presentation metadata for the 16 hold types: glossary deep-links,
// difficulty bands, related terms and specimen stat ratings (1-5).
// Keyed by HoldType.id from src/data/holds.ts.

export interface HoldMeta {
  /** Exact term string in src/data/glossary.ts, used for /glossary?term= links. */
  glossaryTerm: string;
  bandZh: '入门' | '进阶' | '高级';
  bandEn: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Up to 3 related glossary terms (exact term strings). */
  related: string[];
  /** Specimen stat bars, 1-5. */
  finger: number;
  technique: number;
  frequency: number;
}

export const holdMeta: Record<string, HoldMeta> = {
  jug: {
    glossaryTerm: 'Jug', bandZh: '入门', bandEn: 'Beginner',
    related: ['Edge', 'Dyno', 'Rest'],
    finger: 1, technique: 1, frequency: 5,
  },
  crimp: {
    glossaryTerm: 'Crimp', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Edge', 'Lock-off', 'Crux'],
    finger: 5, technique: 3, frequency: 5,
  },
  sloper: {
    glossaryTerm: 'Sloper', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Smear', 'Flag', 'Rock-Over'],
    finger: 3, technique: 5, frequency: 4,
  },
  pocket: {
    glossaryTerm: 'Pocket', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Two-Finger Pocket', 'Mono', 'Hueco'],
    finger: 4, technique: 3, frequency: 4,
  },
  mono: {
    glossaryTerm: 'Mono', bandZh: '高级', bandEn: 'Advanced',
    related: ['Pocket', 'Campus', 'Two-Finger Pocket'],
    finger: 5, technique: 4, frequency: 2,
  },
  pinch: {
    glossaryTerm: 'Pinch', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Flake', 'Tufa', 'Volume'],
    finger: 4, technique: 3, frequency: 4,
  },
  undercling: {
    glossaryTerm: 'Undercling', bandZh: '高级', bandEn: 'Advanced',
    related: ['Sidepull', 'High Step', 'Lock-off'],
    finger: 3, technique: 5, frequency: 3,
  },
  sidepull: {
    glossaryTerm: 'Sidepull', bandZh: '高级', bandEn: 'Advanced',
    related: ['Gaston', 'Flag', 'Undercling'],
    finger: 3, technique: 4, frequency: 3,
  },
  edge: {
    glossaryTerm: 'Edge', bandZh: '入门', bandEn: 'Beginner',
    related: ['Rail', 'Crimp', 'Jug'],
    finger: 2, technique: 2, frequency: 5,
  },
  volume: {
    glossaryTerm: 'Volume', bandZh: '入门', bandEn: 'Beginner',
    related: ['Smear', 'Sloper', 'Slab'],
    finger: 1, technique: 3, frequency: 4,
  },
  foothold: {
    glossaryTerm: 'Foothold', bandZh: '入门', bandEn: 'Beginner',
    related: ['Smear', 'High Step', 'Rock-Over'],
    finger: 1, technique: 3, frequency: 5,
  },
  chip: {
    glossaryTerm: 'Smear', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Foothold', 'Smear', 'Crux'],
    finger: 1, technique: 4, frequency: 3,
  },
  hueco: {
    glossaryTerm: 'Hueco', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Pocket', 'No-Hands Rest', 'Rest'],
    finger: 2, technique: 3, frequency: 2,
  },
  tufa: {
    glossaryTerm: 'Tufa', bandZh: '高级', bandEn: 'Advanced',
    related: ['Pinch', 'Kneebar Rest', 'Knee Bar'],
    finger: 3, technique: 4, frequency: 2,
  },
  flake: {
    glossaryTerm: 'Flake', bandZh: '进阶', bandEn: 'Intermediate',
    related: ['Crack', 'Layback', 'Sidepull'],
    finger: 2, technique: 3, frequency: 3,
  },
  horn: {
    glossaryTerm: 'Horn', bandZh: '入门', bandEn: 'Beginner',
    related: ['Jug', 'Dyno', 'Mantle'],
    finger: 1, technique: 2, frequency: 2,
  },
};

/** Related terms might not all exist in the glossary; filter at render time. */
export function metaFor(id: string): HoldMeta {
  return (
    holdMeta[id] ?? {
      glossaryTerm: id,
      bandZh: '进阶',
      bandEn: 'Intermediate',
      related: [],
      finger: 3,
      technique: 3,
      frequency: 3,
    }
  );
}

export const categoryLabels: Record<string, { zh: string; en: string }> = {
  positive: { zh: '正手点', en: 'Positive' },
  neutral: { zh: '中性点', en: 'Neutral' },
  negative: { zh: '反力点', en: 'Negative' },
  foot: { zh: '脚点', en: 'Foot' },
  feature: { zh: '造型点', en: 'Feature' },
};

export const gripLabels: Record<string, { zh: string; en: string }> = {
  'open-hand': { zh: '开放手', en: 'Open hand' },
  crimp: { zh: '扣指', en: 'Crimp' },
  pinch: { zh: '捏握', en: 'Pinch' },
  pocket: { zh: '指洞', en: 'Pocket' },
  friction: { zh: '摩擦 / 掌压', en: 'Friction / palm' },
  foot: { zh: '脚踩', en: 'Foot' },
};

export const textureLabels: Record<string, { zh: string; en: string }> = {
  smooth: { zh: '光滑面', en: 'Smooth' },
  sandstone: { zh: '砂岩质感', en: 'Sandstone' },
  granite: { zh: '花岗岩质感', en: 'Granite' },
  resin: { zh: '树脂面', en: 'Resin' },
};

/**
 * Specimen colors, shared with the /wall-3d route palette so both 3D modules
 * speak one color language. On the wall, color = route; in the specimen room,
 * color = hold category, which is what the sidebar and legend sort by.
 */
export const categoryColors: Record<string, string> = {
  positive: '#7CB342',
  neutral: '#42A5F5',
  negative: '#AB47BC',
  foot: '#FFA726',
  feature: '#EF5350',
};

export function categoryColorOf(category: string): string {
  return categoryColors[category] ?? '#8B8F94';
}

/**
 * Typical real-world size of the hold's usable face, in cm. Shown instead of
 * the internal geometry params, which mean nothing to a reader.
 */
export const holdRealSize: Record<string, { zh: string; en: string }> = {
  jug: { zh: '把手宽约 12–20 cm，指槽深 4–6 cm', en: '12-20 cm wide, 4-6 cm deep bucket' },
  crimp: { zh: '棱边宽 6–12 cm，可用深度 8–20 mm', en: '6-12 cm edge, 8-20 mm usable depth' },
  sloper: { zh: '圆顶直径 15–30 cm，无棱边', en: '15-30 cm dome, no edge anywhere' },
  pocket: { zh: '洞口直径 3–5 cm，容 2–3 指', en: '3-5 cm mouth, fits 2-3 fingers' },
  mono: { zh: '洞口直径 2–3 cm，仅容 1 指', en: '2-3 cm mouth, a single finger' },
  pinch: { zh: '夹宽 5–10 cm，两侧对称受力', en: '5-10 cm pinch width, symmetric faces' },
  undercling: { zh: '反向唇边宽 10–18 cm', en: '10-18 cm downward-facing lip' },
  sidepull: { zh: '竖向棱边高 10–20 cm', en: '10-20 cm vertical grip edge' },
  edge: { zh: '横条长 15–40 cm，深 15–25 mm', en: '15-40 cm rail, 15-25 mm deep' },
  volume: { zh: '边长 30–80 cm 的大型造型', en: '30-80 cm structural feature' },
  foothold: { zh: '踩踏面 4–8 cm', en: '4-8 cm stepping face' },
  chip: { zh: '踩踏面 2–4 cm 的微脚点', en: '2-4 cm micro foot chip' },
  hueco: { zh: '洞口直径 8–15 cm，可整手入洞', en: '8-15 cm mouth, takes a whole hand' },
  tufa: { zh: '柱体长 30–80 cm，可双手环抱', en: '30-80 cm column, wrappable' },
  flake: { zh: '片状长 15–30 cm，背后留指缝', en: '15-30 cm flake with a finger gap behind' },
  horn: { zh: '角状凸起 8–15 cm', en: '8-15 cm horn protrusion' },
};

export function realSizeOf(id: string): { zh: string; en: string } {
  return holdRealSize[id] ?? { zh: '尺寸依厂牌而异', en: 'Size varies by brand' };
}
