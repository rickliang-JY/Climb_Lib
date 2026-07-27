import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * App shell. Uses the nested-route (layout-route) pattern: Layout renders
 * <Outlet/> and App.tsx nests all page routes inside it.
 *
 * Navbar positioning contract: the Navbar is `fixed` (overlay nav over the
 * full-bleed hero, per design.md §7.1), so Layout owns the offset — the
 * content slot gets `pt-16` (nav height = 4rem). Pages must NOT add their own
 * nav-height padding. Full-bleed hero sections opt out inside the page with
 * `-mt-16` instead of removing this offset.
 */
export default function Layout() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
