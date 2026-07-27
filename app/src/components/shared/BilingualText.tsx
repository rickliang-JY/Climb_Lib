import { createElement } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface BilingualTextProps {
  zh: string;
  en: string;
  /** HTML tag to render, defaults to span */
  as?: keyof HTMLElementTagNameMap;
  className?: string;
}

/** Renders zh or en text according to the current site language. */
export default function BilingualText({ zh, en, as = 'span', className }: BilingualTextProps) {
  const { lang } = useLanguage();
  return createElement(as, { className: cn(className) }, lang === 'zh' ? zh : en);
}
