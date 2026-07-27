import { lazy, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import SectionLabel from '@/components/shared/SectionLabel';
import TermChip from '@/components/shared/TermChip';
import { glossaryTerms } from '@/data/glossary';
import type { GlossaryTerm } from '@/data/glossary';
import { useLanguage } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';

const WallTeaser = lazy(() => import('@/components/home/WallTeaser'));

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE },
  }),
};

function findTerm(name: string): GlossaryTerm | undefined {
  return glossaryTerms.find((g) => g.term.toLowerCase() === name.toLowerCase());
}

/* ---------------- S1 — Manifesto ---------------- */
function Manifesto() {
  const { t } = useLanguage();
  const chipTerms = ['Beta', 'Free Solo', 'Dyno']
    .map(findTerm)
    .filter((x): x is GlossaryTerm => Boolean(x));
  return (
    <section id="manifesto" className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 md:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionLabel index="SEC.01" label="MANIFESTO" />
          </motion.div>
          <motion.h2
            className="type-h1 mt-8 font-display text-ink"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t(
              '一项垂直向上的运动，一部人类与重力的对话史。',
              'A sport that moves upward. A dialogue between humans and gravity.',
            )}
          </motion.h2>
        </div>
        <div className="lg:col-span-7">
          <motion.p
            className="max-w-[65ch] text-lg leading-[1.9] text-ink-soft"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t(
              '攀岩（Rock Climbing）起源于 19 世纪的登山运动，如今已发展为包含抱石、运动攀、传统攀、速度攀等数十种类型的完整体系，并于 2020 年登上奥运舞台。这座知识库收录它的全部：从多洛米蒂的第一座岩塔，到 IFSC 世界杯的决赛墙；从 "jug" 到 "crux" 的 100+ 术语，到 YDS 与 V 等级的换算表；再到一座可以亲手旋转、点击岩点的 3D 攀岩墙。',
              'Rock climbing grew out of 19th-century mountaineering into a complete system of disciplines — bouldering, sport, trad, speed and more — and reached the Olympic stage in 2020. This library holds all of it: from the first Dolomite towers to IFSC World Cup finals; from "jug" to "crux" across 100+ terms; from YDS-to-V conversion tables to a 3D climbing wall you can spin and click.',
            )}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {chipTerms.map((term) => (
              <TermChip
                key={term.term}
                term={term.term}
                zh={term.zh}
                defZh={term.defZh}
                defEn={term.defEn}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- S3 — Explore the archive ---------------- */
const CARDS = [
  {
    no: 'NO.01',
    titleZh: '发展历史',
    titleEn: 'History',
    descZh: '从阿尔卑斯登山绳索到奥运金牌 — 160 年的垂直进化。',
    descEn: 'From alpine hemp ropes to Olympic gold — 160 years of vertical evolution.',
    img: asset('home-history-teaser.webp'),
    to: '/history',
    span: 'lg:col-span-7',
    big: true,
  },
  {
    no: 'NO.02',
    titleZh: '攀岩类型',
    titleEn: 'Disciplines',
    descZh: '抱石、运动、传统、大墙、独攀… 十种方式读懂一面岩壁。',
    descEn: 'Bouldering, sport, trad, big wall, solo… ten ways to read a cliff.',
    img: asset('home-boulder-teaser.webp'),
    to: '/disciplines',
    span: 'lg:col-span-5',
    big: true,
  },
  {
    no: 'NO.03',
    titleZh: '比赛体系',
    titleEn: 'Competition',
    descZh: 'IFSC 三大赛制与奥运之路。',
    descEn: 'The three IFSC formats and the road to the Olympics.',
    img: asset('comp-ifsc-wall.webp'),
    to: '/competition',
    span: 'lg:col-span-3',
    big: false,
  },
  {
    no: 'NO.04',
    titleZh: '术语库',
    titleEn: 'Glossary',
    descZh: '100+ 条英文术语，可搜索。',
    descEn: '100+ English terms, searchable.',
    img: null,
    to: '/glossary',
    span: 'lg:col-span-3',
    big: false,
  },
  {
    no: 'NO.05',
    titleZh: '等级 · 装备',
    titleEn: 'Grades & Gear',
    descZh: 'YDS ↔ French ↔ V 换算与装备图鉴。',
    descEn: 'YDS ↔ French ↔ V conversions and the gear catalog.',
    img: asset('gear-shoes.webp'),
    to: '/grades',
    span: 'lg:col-span-3',
    big: false,
  },
  {
    no: 'NO.06',
    titleZh: '3D 岩墙 + 岩点库',
    titleEn: '3D Wall & Holds',
    descZh: '旋转一面墙，点击每个岩点。',
    descEn: 'Spin a wall. Click every hold.',
    img: asset('home-3d-teaser.webp'),
    to: '/wall-3d',
    span: 'lg:col-span-3',
    big: false,
  },
];

function ExploreGrid() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-stone bg-paper py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <SectionLabel index="SEC.02" label={t('内容导览 EXPLORE THE ARCHIVE', 'EXPLORE THE ARCHIVE')} />
          <h2 className="type-h2 mt-8 font-display text-ink">
            {t('六条路径，进入攀岩世界。', 'Six paths into the world of climbing.')}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.no}
              className={card.span}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <Link
                to={card.to}
                className="group flex h-full flex-col border border-stone bg-paper-warm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
              >
                {card.big ? (
                  <div className="aspect-[3/2] overflow-hidden border-b border-stone">
                    <img
                      src={card.img ?? ''}
                      alt={t(card.titleZh, card.titleEn)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : card.img ? (
                  <div className="h-36 overflow-hidden border-b border-stone">
                    <img
                      src={card.img}
                      alt={t(card.titleZh, card.titleEn)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex h-36 items-center justify-center border-b border-stone bg-sand/50">
                    <img src={asset('icon-holds-set.svg')} alt="" className="h-20 w-40 object-contain" loading="lazy" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <span className="font-mono type-caption uppercase text-ink-faint">{card.no}</span>
                  <h3 className="text-xl font-bold text-ink">
                    {t(card.titleZh, card.titleEn)}
                    <span className="ml-2 font-mono text-sm font-normal text-ink-faint">
                      {t(card.titleEn, card.titleZh)}
                    </span>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{t(card.descZh, card.descEn)}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors group-hover:text-clay">
                    {t('进入', 'Enter')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- S4 — Terms marquee ---------------- */
function TermsMarquee() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const names = ['Crux', 'Dyno', 'Flag', 'Heel Hook', 'Flash', 'Pumped', 'Redpoint', 'Whipper'];
  const terms = names.map(findTerm).filter((x): x is GlossaryTerm => Boolean(x));
  const track = [...terms, ...terms];

  return (
    <section className="bg-ink py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionLabel index="SEC.03" label={t('今日术语 TERMS OF THE DAY', 'TERMS OF THE DAY')} tone="light" />
          <h3 className="type-h2 mt-6 font-display text-chalk">
            {t('岩壁上的语言。', 'The language of the wall.')}
          </h3>
        </motion.div>
      </div>
      <div className="mt-12 overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee gap-4 pr-4">
          {track.map((term, i) => (
            <button
              key={`${term.term}-${i}`}
              onClick={() => navigate(`/glossary?term=${encodeURIComponent(term.term)}`)}
              className="flex w-56 shrink-0 flex-col gap-2 border border-stone/60 bg-chalk/10 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-clay"
            >
              <span className="font-mono text-lg font-medium text-clay">{term.term}</span>
              <span className="text-sm text-chalk/80">{t(term.zh, term.zh)}</span>
              <span className="line-clamp-2 text-xs leading-relaxed text-chalk/50">
                {t(term.defZh, term.defEn)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- S5 — 3D teaser ---------------- */
function Teaser3D() {
  const { t } = useLanguage();
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        <Suspense
          fallback={
            <div className="flex h-[40vh] min-h-[320px] items-center justify-center border border-stone bg-paper-warm font-mono text-xs uppercase tracking-widest text-ink-faint">
              Loading 3D…
            </div>
          }
        >
          <WallTeaser />
        </Suspense>
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel index="SEC.04" label="INTERACTIVE 3D" />
          </motion.div>
          <motion.h2
            className="type-h2 mt-8 font-display text-ink"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t('转一转这面墙。', 'Give the wall a spin.')}
          </motion.h2>
          <motion.p
            className="mt-6 max-w-[65ch] leading-[1.9] text-ink-soft"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t(
              '一面可以旋转的 3D 攀岩墙，每一颗岩点都能点击 —— 看看它叫什么、怎么抓。再走进岩点库，把 jug、crimp、sloper 逐一拿起来端详。',
              'A 3D climbing wall you can rotate, with holds you can click to learn their names and grips. Then step into the holds library and inspect every jug, crimp and sloper up close.',
            )}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link
              to="/wall-3d"
              className="group inline-flex items-center gap-2 bg-clay px-6 py-3 text-sm font-semibold text-chalk transition-colors duration-300 hover:bg-clay-deep"
            >
              {t('进入 3D 攀岩墙', 'Enter the 3D wall')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/holds"
              className="group inline-flex items-center gap-2 border border-stone px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-clay hover:text-clay"
            >
              {t('浏览岩点库', 'Browse the holds library')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- S6 — Quote banner ---------------- */
function QuoteBanner() {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const quote =
    lang === 'zh'
      ? '世上最强的攀岩者，是玩得最开心的那个人。'
      : 'The best climber in the world is the one having the most fun.';
  const words = quote.split(/(?<=，)|(?<=。)|\s+/).filter(Boolean);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div className="absolute inset-[-14%] will-change-transform" style={{ y: bgY }}>
        <img src={asset('hist-era-7-olympic.webp')} alt="" className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/50" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-28 text-center md:px-10 md:py-40 lg:px-16">
        <blockquote className="max-w-[22ch] font-display text-3xl font-bold italic leading-snug text-chalk md:text-5xl">
          {lang === 'en' && <span className="text-clay">“</span>}
          {words.map((w, i) => (
            <motion.span
              key={`${lang}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.04, duration: 0.6, ease: EASE }}
            >
              {w}
              {lang === 'en' ? ' ' : ''}
            </motion.span>
          ))}
          {lang === 'en' && <span className="text-clay">”</span>}
        </blockquote>
        <p className="mt-8 font-mono type-caption uppercase tracking-widest text-chalk/70">
          — ALEX LOWE / 亚历克斯·洛
        </p>
        <Link
          to="/history"
          className="group mt-10 inline-flex items-center gap-2 border border-chalk/60 px-7 py-3.5 text-sm font-semibold text-chalk transition-colors duration-300 hover:border-chalk hover:bg-chalk/10"
        >
          {t('阅读完整历史', 'Read the full history')}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <StatsStrip />
      <ExploreGrid />
      <TermsMarquee />
      <Teaser3D />
      <QuoteBanner />
    </>
  );
}
