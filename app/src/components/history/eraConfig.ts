import { eraIntros, timelineEvents } from '@/data/history';
import type { EraIntro, TimelineEvent } from '@/data/history';
import { glossaryTerms } from '@/data/glossary';
import type { GlossaryTerm } from '@/data/glossary';
import { asset } from '@/lib/asset';

export interface EraBlock {
  era: TimelineEvent['era'];
  intro: EraIntro;
  events: TimelineEvent[];
  /** First 4-digit year of the era's first event (for the big panel readout). */
  startYear: number;
  /** Last 4-digit year of the era's last event. */
  endYear: number;
  image: string;
  secondaryImage?: string;
  /** Dark (ink) chapter treatment — design.md: the Olympic era closes on ink. */
  dark: boolean;
  /** Glossary terms surfaced as inline TermChips for this era. */
  terms: GlossaryTerm[];
}

interface EraMeta {
  era: TimelineEvent['era'];
  image: string;
  secondaryImage?: string;
  dark?: boolean;
  termNames: string[];
}

/**
 * Era order follows src/data/history.ts (eraIntros, 6 eras).
 * Images map to the hist-era-* assets; the two "origins" plates
 * (alpine + dolomites) both belong to ERA 01.
 */
const ERA_META: EraMeta[] = [
  {
    era: 'origins',
    image: asset('hist-era-1-alpine.webp'),
    secondaryImage: asset('hist-era-2-dolomites.webp'),
    termNames: ['Free Climbing', 'Aid Climbing', 'Multi-Pitch'],
  },
  {
    era: 'golden',
    image: asset('hist-era-3-yosemite.webp'),
    termNames: ['YDS', 'Portaledge', 'Nut'],
  },
  {
    era: 'free-revolution',
    image: asset('hist-era-4-free.webp'),
    termNames: ['Clean Climbing', 'Redpoint', 'Cam'],
  },
  {
    era: 'sport',
    image: asset('hist-era-5-sport.webp'),
    termNames: ['Bolt', 'Quickdraw', 'Hangdog'],
  },
  {
    era: 'modern',
    image: asset('hist-era-6-comp.webp'),
    termNames: ['V-Scale', 'Campus', 'Project'],
  },
  {
    era: 'olympic',
    image: asset('hist-era-7-olympic.webp'),
    dark: true,
    termNames: ['Free Solo', 'Beta', 'Volume'],
  },
];

function yearNums(y: string): number[] {
  return (y.match(/\d{4}/g) ?? []).map(Number);
}

function findTerm(name: string): GlossaryTerm | undefined {
  return glossaryTerms.find((g) => g.term.toLowerCase() === name.toLowerCase());
}

function buildEras(): EraBlock[] {
  return ERA_META.map((meta) => {
    const intro = eraIntros.find((e) => e.era === meta.era);
    if (!intro) throw new Error(`Missing eraIntro for ${meta.era}`);
    const events = timelineEvents.filter((ev) => ev.era === meta.era);
    const firstNums = events.length ? yearNums(events[0].year) : [0];
    const lastNums = events.length ? yearNums(events[events.length - 1].year) : [0];
    const terms = meta.termNames
      .map(findTerm)
      .filter((x): x is GlossaryTerm => Boolean(x));
    return {
      era: meta.era,
      intro,
      events,
      startYear: firstNums[0] ?? 0,
      endYear: lastNums[lastNums.length - 1] ?? firstNums[0] ?? 0,
      image: meta.image,
      secondaryImage: meta.secondaryImage,
      dark: meta.dark ?? false,
      terms,
    };
  });
}

export const ERAS: EraBlock[] = buildEras();
