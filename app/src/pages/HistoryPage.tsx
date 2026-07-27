import HistoryHero from '@/components/history/HistoryHero';
import TimelineSection from '@/components/history/TimelineSection';
import PioneersStrip from '@/components/history/PioneersStrip';
import ExploreNext from '@/components/history/ExploreNext';

/**
 * /history — scroll-driven timeline narrative page.
 * S0 hero -> S1/S2 pinned timeline (6 eras from src/data/history.ts)
 * -> S3 pioneers strip -> S4 keep-exploring links.
 */
export default function HistoryPage() {
  return (
    <>
      <HistoryHero />
      <TimelineSection />
      <PioneersStrip />
      <ExploreNext />
    </>
  );
}
