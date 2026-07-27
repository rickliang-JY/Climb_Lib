import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Hand-drawn SVG rule infographics for the IFSC formats.
 * Framer Motion draw animation: strokes use pathLength 0->1,
 * hold dots pop in with a spring (staggered via custom delay),
 * labels fade up. Replays on every mount (tab change re-keys it).
 */

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: d, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (d: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: d, type: 'spring', stiffness: 300, damping: 15 },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: (d: number = 0) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.5 } }),
};

const POP_STYLE = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

interface HoldProps {
  cx: number;
  cy: number;
  r: number;
  d: number;
  className?: string;
}

function Hold({ cx, cy, r, d, className = 'fill-hold-orange' }: HoldProps) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      variants={pop}
      custom={d}
      style={POP_STYLE}
      className={className}
      strokeWidth={1.2}
      stroke="#FBF9F4"
    />
  );
}

interface LabelProps {
  x: number;
  y: number;
  d: number;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  className?: string;
  children: string;
}

function Label({ x, y, d, size = 10, anchor = 'start', className = 'fill-ink-soft', children }: LabelProps) {
  return (
    <motion.text
      x={x}
      y={y}
      variants={fade}
      custom={d}
      textAnchor={anchor}
      fontSize={size}
      className={`font-mono ${className}`}
    >
      {children}
    </motion.text>
  );
}

interface LeaderProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  d: number;
}

function Leader({ x1, y1, x2, y2, d }: LeaderProps) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      variants={draw}
      custom={d}
      className="stroke-stone"
      strokeWidth={1}
      strokeDasharray="3 3"
    />
  );
}

/* ------------------------------- BOULDER ------------------------------- */
function BoulderDiagram() {
  const { t } = useLanguage();
  return (
    <motion.svg
      viewBox="0 0 340 300"
      initial="hidden"
      animate="show"
      className="h-auto w-full"
      role="img"
      aria-label={t('抱石赛制规则图解', 'Boulder format rule diagram')}
    >
      {/* crash pads + floor */}
      <motion.rect x={24} y={252} width={292} height={14} variants={fade} custom={0.1} className="fill-sand" />
      <motion.line x1={20} y1={266} x2={320} y2={266} variants={draw} custom={0} className="stroke-stone" strokeWidth={1.5} />
      {/* overhanging wall, climbing face on the left slanted edge */}
      <motion.path
        d="M72 266 L112 44 L296 44 L296 266"
        variants={draw}
        custom={0.15}
        className="fill-chalk stroke-ink-soft"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Label x={72} y={36} d={0.4} size={9} className="fill-ink-faint">
        {t('≈4.5m · 无绳 NO ROPES', '≈4.5m · NO ROPES')}
      </Label>
      {/* route holds up the face */}
      <Hold cx={76} cy={244} r={5} d={0.5} className="fill-hold-sage" />
      <Hold cx={81} cy={232} r={5} d={0.58} className="fill-hold-sage" />
      <Hold cx={85} cy={195} r={4} d={0.66} />
      <Hold cx={92} cy={155} r={7} d={0.74} className="fill-hold-amber" />
      <Hold cx={98} cy={120} r={4} d={0.82} />
      <Hold cx={104} cy={88} r={4} d={0.9} />
      <Hold cx={110} cy={55} r={7} d={0.98} className="fill-clay" />
      {/* leaders + labels */}
      <Leader x1={87} y1={240} x2={142} y2={246} d={0.9} />
      <Label x={148} y={250} d={1.0} size={9.5}>
        {t('START 起点（双手）', 'START (both hands)')}
      </Label>
      <Leader x1={100} y1={155} x2={152} y2={150} d={1.05} />
      <Label x={158} y={154} d={1.15} size={9.5}>
        {t('ZONE 分区点 +10', 'ZONE +10 pts')}
      </Label>
      <Leader x1={118} y1={56} x2={160} y2={52} d={1.2} />
      <Label x={166} y={56} d={1.3} size={9.5}>
        {t('TOP 顶点 +25', 'TOP +25 pts')}
      </Label>
      {/* Badges, right-aligned into the clear upper-right of the wall face.
          They must clear the ZONE leader label, which runs from x=158 to
          roughly x=245 on the y=154 line. */}
      <Label x={288} y={100} d={1.25} size={22} anchor="end" className="fill-clay">
        4:00
      </Label>
      <Label x={288} y={116} d={1.35} size={9} anchor="end" className="fill-ink-soft">
        {t('每条线路限时 PER PROBLEM', 'PER PROBLEM')}
      </Label>
      <Label x={288} y={196} d={1.45} size={9.5} anchor="end" className="fill-ink-soft">
        {t('∞ 尝试次数不限', '∞ unlimited attempts')}
      </Label>
      <Label x={288} y={211} d={1.5} size={9} anchor="end" className="fill-ink-soft">
        {t('每次尝试 −0.1 分', '−0.1 per attempt')}
      </Label>
    </motion.svg>
  );
}

/* --------------------------------- LEAD -------------------------------- */
const LEAD_ROUTE: [number, number][] = [
  [148, 250],
  [146, 215],
  [143, 180],
  [140, 145],
  [138, 110],
  [135, 75],
  [133, 48],
];

function LeadDiagram() {
  const { t } = useLanguage();
  return (
    <motion.svg
      viewBox="0 0 340 300"
      initial="hidden"
      animate="show"
      className="h-auto w-full"
      role="img"
      aria-label={t('难度赛制规则图解', 'Lead format rule diagram')}
    >
      <motion.line x1={20} y1={272} x2={320} y2={272} variants={draw} custom={0} className="stroke-stone" strokeWidth={1.5} />
      {/* 15m overhanging wall */}
      <motion.path
        d="M150 272 L132 34 L296 34 L296 272"
        variants={draw}
        custom={0.15}
        className="fill-chalk stroke-ink-soft"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* height marker */}
      <motion.line x1={112} y1={272} x2={112} y2={34} variants={draw} custom={0.3} className="stroke-stone" strokeWidth={1} strokeDasharray="4 4" />
      <g transform="rotate(-90 96 156)">
        <Label x={96} y={156} d={0.5} size={9} anchor="middle" className="fill-ink-faint">
          ≈ 15 m
        </Label>
      </g>
      {/* rope */}
      <motion.path
        d="M148 250 C 158 260, 164 268, 172 272"
        variants={draw}
        custom={0.7}
        fill="none"
        className="stroke-moss"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      <Label x={176} y={282} d={1.2} size={8.5} className="fill-moss">
        {t('先锋攀爬 · 沿途扣快挂 LEAD', 'LEAD climbing · clip as you go')}
      </Label>
      {/* route holds + quickdraw ticks */}
      {LEAD_ROUTE.map(([x, y], i) => (
        <Hold key={`h-${i}`} cx={x} cy={y} r={i === LEAD_ROUTE.length - 1 ? 7 : 4} d={0.5 + i * 0.09} className={i === LEAD_ROUTE.length - 1 ? 'fill-clay' : 'fill-hold-orange'} />
      ))}
      {LEAD_ROUTE.slice(0, -1).map(([x, y], i) => (
        <motion.line
          key={`q-${i}`}
          x1={x + 3}
          y1={y}
          x2={x + 13}
          y2={y - 5}
          variants={draw}
          custom={0.6 + i * 0.09}
          className="stroke-hold-slate"
          strokeWidth={1.5}
        />
      ))}
      {/* TOP label */}
      <Leader x1={141} y1={44} x2={170} y2={40} d={1.1} />
      <Label x={176} y={44} d={1.2} size={9.5}>
        {t('TOP = 完攀', 'TOP = send')}
      </Label>
      {/* scoring by height */}
      <motion.line x1={212} y1={246} x2={212} y2={64} variants={draw} custom={0.9} className="stroke-stone" strokeWidth={1} strokeDasharray="4 4" />
      <Label x={224} y={150} d={1.15} size={16} className="fill-clay">
        40+
      </Label>
      <Label x={224} y={166} d={1.25} size={9} className="fill-ink-soft">
        {t('按到达高度计分', 'scored by height')}
      </Label>
      {/* Badges. These sit left of the wall on the page background rather than
          on the chalk face, so they need the stronger ink-soft fill. */}
      <Label x={30} y={92} d={1.3} size={20} className="fill-clay">
        6:00
      </Label>
      <Label x={30} y={108} d={1.38} size={9} className="fill-ink-soft">
        {t('分钟限时 TIME LIMIT', 'MIN TIME LIMIT')}
      </Label>
      {/* Skip y=140..175: the rotated "15 m" height marker sits in that band. */}
      <Label x={30} y={212} d={1.46} size={9.5} className="fill-ink-soft">
        {t('1× 仅一次机会', '1× one attempt')}
      </Label>
      <Label x={30} y={228} d={1.54} size={9} className="fill-ink-soft">
        {t('赛前观察约 6 分钟', '~6 min observation')}
      </Label>
    </motion.svg>
  );
}

/* --------------------------------- SPEED ------------------------------- */
/**
 * Lane-1 hold positions on the 5-degree overhang. The real IFSC speed route is
 * a single standardized zig-zag, and the two lanes are mirror images of each
 * other about the centre divider - so lane 2 is drawn as `340 - x`, not as a
 * copy offset sideways.
 */
const SPEED_HOLDS: [number, number][] = [
  [116, 71],
  [96, 100],
  [118, 129],
  [98, 158],
  [120, 187],
  [100, 216],
  [117, 245],
];

/** Mirror of a lane-1 x about the centre divider at x = 170. */
const mirrorX = (x: number) => 340 - x;

function SpeedDiagram() {
  const { t } = useLanguage();
  return (
    <motion.svg
      viewBox="0 0 340 300"
      initial="hidden"
      animate="show"
      className="h-auto w-full"
      role="img"
      aria-label={t('速度赛制规则图解', 'Speed format rule diagram')}
    >
      <motion.line x1={20} y1={272} x2={320} y2={272} variants={draw} custom={0} className="stroke-stone" strokeWidth={1.5} />
      {/* timing pads */}
      <motion.rect x={70} y={36} width={68} height={6} variants={pop} custom={0.9} style={POP_STYLE} className="fill-clay" />
      <motion.rect x={184} y={36} width={68} height={6} variants={pop} custom={0.95} style={POP_STYLE} className="fill-clay" />
      <Label x={170} y={28} d={1.1} size={9} anchor="middle" className="fill-clay">
        {t('拍板计时 TIMING PADS', 'TIMING PADS — slap to stop the clock')}
      </Label>
      {/* twin lanes, 5° overhang */}
      <motion.path
        d="M78 272 L68 44 L138 44 L148 272"
        variants={draw}
        custom={0.15}
        className="fill-chalk stroke-ink-soft"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <motion.path
        d="M192 272 L182 44 L252 44 L262 272"
        variants={draw}
        custom={0.25}
        className="fill-chalk stroke-ink-soft"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* center divider */}
      <motion.line x1={170} y1={48} x2={170} y2={266} variants={draw} custom={0.5} className="stroke-stone" strokeWidth={1} strokeDasharray="4 4" />
      {/* auto belays */}
      <motion.rect x={97} y={50} width={14} height={10} variants={pop} custom={1.0} style={POP_STYLE} className="fill-hold-slate" />
      <motion.rect x={211} y={50} width={14} height={10} variants={pop} custom={1.05} style={POP_STYLE} className="fill-hold-slate" />
      {/* standardized holds — identical pattern in both lanes */}
      {SPEED_HOLDS.map(([x, y], i) => (
        <Hold key={`a-${i}`} cx={x} cy={y} r={4} d={0.5 + i * 0.08} className="fill-hold-orange" />
      ))}
      {SPEED_HOLDS.map(([x, y], i) => (
        <Hold key={`b-${i}`} cx={mirrorX(x)} cy={y} r={4} d={0.55 + i * 0.08} className="fill-hold-orange" />
      ))}
      {/* start pads */}
      <motion.rect x={92} y={262} width={30} height={6} variants={pop} custom={1.15} style={POP_STYLE} className="fill-hold-slate" />
      <motion.rect x={206} y={262} width={30} height={6} variants={pop} custom={1.2} style={POP_STYLE} className="fill-hold-slate" />
      {/* height marker */}
      <motion.line x1={44} y1={272} x2={44} y2={44} variants={draw} custom={0.4} className="stroke-stone" strokeWidth={1} strokeDasharray="4 4" />
      <g transform="rotate(-90 34 158)">
        <Label x={34} y={158} d={0.6} size={9} anchor="middle" className="fill-ink-faint">
          15 m · 5°
        </Label>
      </g>
      {/* captions */}
      <Label x={170} y={288} d={1.3} size={9} anchor="middle" className="fill-ink-soft">
        {t('全球统一赛道 · 自动保护器 AUTO BELAY', 'Standardized worldwide · AUTO BELAY')}
      </Label>
      {/* False-start callout, tied to the start pads with a leader so it reads
          as a note about the start rather than free-floating text. */}
      <Leader x1={238} y1={265} x2={276} y2={244} d={1.35} />
      <Label x={334} y={240} d={1.4} size={9.5} anchor="end" className="fill-clay">
        {t('反应 <0.1 秒', 'react <0.1 s')}
      </Label>
      <Label x={334} y={254} d={1.45} size={9.5} anchor="end" className="fill-clay">
        {t('= 抢跑判负', '= false start')}
      </Label>
    </motion.svg>
  );
}

/* ------------------------------- COMBINED ------------------------------ */
function CombinedDiagram() {
  const { t } = useLanguage();
  return (
    <motion.svg
      viewBox="0 0 340 260"
      initial="hidden"
      animate="show"
      className="h-auto w-full"
      role="img"
      aria-label={t('两项全能赛制规则图解', 'Boulder & Lead combined format diagram')}
    >
      {/* left panel: boulder */}
      <motion.rect x={28} y={30} width={116} height={132} variants={fade} custom={0.1} className="fill-chalk stroke-stone" strokeWidth={1} />
      <motion.path
        d="M48 150 L66 58 L126 58 L126 150"
        variants={draw}
        custom={0.25}
        fill="none"
        className="stroke-ink-soft"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Hold cx={60} cy={134} r={4} d={0.5} className="fill-hold-sage" />
      <Hold cx={68} cy={108} r={4} d={0.58} />
      <Hold cx={74} cy={84} r={5.5} d={0.66} className="fill-hold-amber" />
      <Hold cx={80} cy={64} r={5.5} d={0.74} className="fill-clay" />
      <Label x={86} y={180} d={0.85} size={10} anchor="middle" className="fill-ink">
        {t('BOULDER 抱石', 'BOULDER')}
      </Label>
      <Label x={86} y={195} d={0.9} size={8.5} anchor="middle" className="fill-ink-faint">
        {t('满分 MAX 100', 'MAX 100')}
      </Label>
      {/* plus */}
      <Label x={172} y={104} d={0.9} size={26} anchor="middle" className="fill-clay">
        +
      </Label>
      {/* right panel: lead */}
      <motion.rect x={200} y={30} width={116} height={132} variants={fade} custom={0.2} className="fill-chalk stroke-stone" strokeWidth={1} />
      <motion.path
        d="M222 150 L214 58 L296 58 L296 150"
        variants={draw}
        custom={0.35}
        fill="none"
        className="stroke-ink-soft"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Hold cx={220} cy={134} r={4} d={0.55} />
      <Hold cx={217} cy={108} r={4} d={0.63} />
      <Hold cx={215} cy={84} r={4} d={0.71} />
      <Hold cx={213} cy={64} r={5.5} d={0.79} className="fill-clay" />
      <Label x={258} y={180} d={0.9} size={10} anchor="middle" className="fill-ink">
        {t('LEAD 难度', 'LEAD')}
      </Label>
      <Label x={258} y={195} d={0.95} size={8.5} anchor="middle" className="fill-ink-faint">
        {t('满分 MAX 100', 'MAX 100')}
      </Label>
      {/* total chip */}
      <motion.rect x={105} y={206} width={134} height={26} variants={pop} custom={1.1} style={POP_STYLE} className="fill-clay" />
      <Label x={172} y={223} d={1.25} size={10.5} anchor="middle" className="fill-chalk">
        {t('= 200 分 · 得分相加', '= 200 pts · added')}
      </Label>
      <Label x={172} y={248} d={1.35} size={8} anchor="middle" className="fill-ink-faint">
        {t('东京 2020 名次相乘 → 洛杉矶 2028 三项独立设金', 'Tokyo 2020 multiplied ranks → LA 2028 standalone medals')}
      </Label>
    </motion.svg>
  );
}

/* ------------------------------- switch -------------------------------- */
export default function FormatDiagram({ id }: { id: string }) {
  switch (id) {
    case 'lead':
      return <LeadDiagram />;
    case 'speed':
      return <SpeedDiagram />;
    case 'combined':
      return <CombinedDiagram />;
    case 'boulder':
    default:
      return <BoulderDiagram />;
  }
}
