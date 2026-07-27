import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import HistoryPage from '@/pages/HistoryPage';
import DisciplinesPage from '@/pages/DisciplinesPage';
import CompetitionPage from '@/pages/CompetitionPage';
import GlossaryPage from '@/pages/GlossaryPage';
import GradesPage from '@/pages/GradesPage';
import Wall3DPage from '@/pages/Wall3DPage';
import Holds3DPage from '@/pages/Holds3DPage';
import { initLenis, getLenis } from '@/lib/lenis';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Nested-route (layout-route) pattern: Layout renders <Outlet/> */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="disciplines" element={<DisciplinesPage />} />
          <Route path="competition" element={<CompetitionPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="wall-3d" element={<Wall3DPage />} />
          <Route path="holds" element={<Holds3DPage />} />
        </Route>
      </Routes>
    </>
  );
}
