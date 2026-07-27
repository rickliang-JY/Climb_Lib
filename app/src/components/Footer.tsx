import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { asset } from '@/lib/asset';

const SITE_NAV = [
  { to: '/', zh: '首页', en: 'Home' },
  { to: '/history', zh: '发展历史', en: 'History' },
  { to: '/disciplines', zh: '攀岩类型', en: 'Disciplines' },
  { to: '/competition', zh: '比赛体系', en: 'Competition' },
];

const CATEGORY_NAV = [
  { to: '/glossary', zh: '术语库', en: 'Glossary' },
  { to: '/grades', zh: '等级 · 装备', en: 'Grades & Gear' },
  { to: '/wall-3d', zh: '3D 岩墙', en: '3D Wall' },
  { to: '/holds', zh: '3D 岩点库', en: 'Holds 3D' },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Big slogan */}
        <div className="border-b border-chalk/15 py-16 md:py-20">
          <p className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {t('保持攀登。', 'Keep climbing.')}
            <span className="ml-3 text-clay md:ml-5">{t('Keep climbing.', '保持攀登。')}</span>
          </p>
        </div>

        {/* Three columns */}
        <div className="grid gap-12 py-14 md:grid-cols-3">
          <div>
            <h3 className="mb-5 font-mono type-caption uppercase text-stone">
              {t('站点导航', 'Site')}
            </h3>
            <ul className="space-y-3">
              {SITE_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-chalk/80 transition-colors hover:text-clay">
                    {t(item.zh, item.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 font-mono type-caption uppercase text-stone">
              {t('内容分类', 'Archive')}
            </h3>
            <ul className="space-y-3">
              {CATEGORY_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-chalk/80 transition-colors hover:text-clay">
                    {t(item.zh, item.en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 font-mono type-caption uppercase text-stone">
              {t('关于与致谢', 'About & Credits')}
            </h3>
            <p className="max-w-[40ch] text-sm leading-relaxed text-chalk/70">
              {t(
                '一座开放的攀岩知识图书馆。内容参考 IFSC（国际攀岩联合会）、Olympics.com、Wikipedia 及公开攀岩史料整理，仅供学习交流。所有历史照片风格图为 AI 生成的编辑插画。',
                'An open climbing knowledge library. Content compiled from IFSC, Olympics.com, Wikipedia and public climbing history sources, for educational use. All imagery is AI-generated editorial illustration.',
              )}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img src={asset('logo.svg')} alt="" className="h-7 w-7 brightness-0 invert" />
              <span className="font-display text-base font-bold">THE CRAG ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-chalk/15 py-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-chalk/50">
            © 2025 THE CRAG ARCHIVE — A climbing knowledge library
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-chalk/40">
            {t('从砂岩到奥运', 'From sandstone to the Olympics')}
          </p>
        </div>
      </div>
    </footer>
  );
}
