import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldAlert, ListChecks } from 'lucide-react';
import { gearItems } from '@/data/grades-gear';
import type { Gear } from '@/data/grades-gear';
import { useLanguage } from '@/i18n/LanguageContext';
import ArchiveTag from '@/components/shared/ArchiveTag';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/asset';

type Category = Gear['category'];

const CATEGORIES: { id: 'all' | Category; zh: string; en: string }[] = [
  { id: 'all', zh: '全部', en: 'All' },
  { id: 'shoes', zh: '鞋', en: 'Shoes' },
  { id: 'rope', zh: '绳索', en: 'Ropes' },
  { id: 'belay', zh: '保护与连接', en: 'Belay & Connectors' },
  { id: 'protection', zh: '传统保护', en: 'Protection' },
  { id: 'clothing-acc', zh: '服饰与配件', en: 'Wear & Accessories' },
  { id: 'bigwall', zh: '大岩壁', en: 'Big Wall' },
];

/** One illustration per category (public/gear-*.webp) */
const CATEGORY_IMAGE: Record<Category, string> = {
  shoes: asset('gear-shoes.webp'),
  rope: asset('gear-rope.webp'),
  belay: asset('gear-belay.webp'),
  protection: asset('gear-protection.webp'),
  'clothing-acc': asset('gear-chalk.webp'),
  bigwall: asset('gear-harness.webp'),
};

/** Item-level overrides where the illustration matches a specific item */
const ITEM_IMAGE: Record<string, string> = {
  harness: asset('gear-harness.webp'),
};

function gearImage(item: Gear): string {
  return ITEM_IMAGE[item.id] ?? CATEGORY_IMAGE[item.category];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GearGallery() {
  const { lang, t } = useLanguage();
  const [activeCat, setActiveCat] = useState<'all' | Category>('all');
  const [selected, setSelected] = useState<Gear | null>(null);

  const visible = useMemo(
    () => (activeCat === 'all' ? gearItems : gearItems.filter((g) => g.category === activeCat)),
    [activeCat],
  );

  const catLabel = (id: 'all' | Category) => {
    const c = CATEGORIES.find((x) => x.id === id);
    return c ? t(c.zh, c.en) : id;
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('装备分类', 'Gear categories')}>
        {CATEGORIES.map((c) => (
          <ArchiveTag key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
            {t(c.zh, c.en)}
            <span className="ml-1.5 opacity-70">
              {c.id === 'all' ? gearItems.length : gearItems.filter((g) => g.category === c.id).length}
            </span>
          </ArchiveTag>
        ))}
      </div>

      {/* Card grid */}
      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.05, ease: EASE }}
              className="group flex h-full flex-col border border-stone bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
            >
              <button
                onClick={() => setSelected(item)}
                className="flex h-full flex-col text-left"
                aria-label={t(`查看 ${item.nameZh} 详情`, `View ${item.nameEn} details`)}
              >
                <div className="relative overflow-hidden border-b border-stone">
                  <img
                    src={gearImage(item)}
                    alt={lang === 'zh' ? item.nameZh : item.nameEn}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 border border-stone bg-paper/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    {catLabel(item.category)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="font-mono type-caption uppercase text-ink-faint">
                    GEAR.{String(gearItems.indexOf(item) + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold leading-snug text-ink">
                    {t(item.nameZh, item.nameEn)}
                  </h3>
                  <span className="font-mono text-xs text-ink-faint">{lang === 'zh' ? item.nameEn : item.nameZh}</span>
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {t(item.descZh, item.descEn)}
                  </p>
                  <span className="mt-auto pt-3 font-mono text-xs text-clay-deep transition-colors group-hover:text-clay">
                    {t('查看详情 →', 'Details →')}
                  </span>
                </div>
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail modal */}
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto border-stone bg-paper sm:max-w-2xl">
          {selected && (
            <>
              <div className="overflow-hidden border border-stone">
                <img
                  src={gearImage(selected)}
                  alt={lang === 'zh' ? selected.nameZh : selected.nameEn}
                  className="aspect-[2/1] w-full object-cover"
                />
              </div>
              <DialogHeader>
                <span className="font-mono type-caption uppercase text-ink-faint">
                  GEAR.{String(gearItems.indexOf(selected) + 1).padStart(2, '0')} / {catLabel(selected.category)}
                </span>
                <DialogTitle className="font-display text-2xl font-bold text-ink">
                  {t(selected.nameZh, selected.nameEn)}
                  <span className="ml-3 font-mono text-sm font-normal text-ink-faint">
                    {lang === 'zh' ? selected.nameEn : selected.nameZh}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm leading-[1.9] text-ink-soft">
                  {t(selected.descZh, selected.descEn)}
                </DialogDescription>
              </DialogHeader>

              <div>
                <h4 className="flex items-center gap-2 font-mono type-caption uppercase text-ink">
                  <ListChecks className="h-4 w-4 text-clay" aria-hidden="true" />
                  {t('规格与选购要点', 'Specs & buying notes')}
                </h4>
                <ul className="mt-3 space-y-2 border-l-2 border-stone pl-4">
                  {selected.specs.map((spec) => (
                    <li key={spec} className="font-mono text-xs leading-relaxed text-ink-soft">
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-moss/40 bg-moss/10 p-4">
                <h4 className="flex items-center gap-2 font-mono type-caption uppercase text-ink">
                  <ShieldAlert className="h-4 w-4 text-moss" aria-hidden="true" />
                  {t('使用与安全提示', 'Use & safety tips')}
                </h4>
                <p className={cn('mt-2 text-sm leading-[1.9] text-ink-soft')}>
                  {t(selected.tipsZh, selected.tips)}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
