import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';

// Routes are mounted under Vite's base path so the same build works at the
// root in dev and under /<repo>/ on GitHub Pages.
const basename = import.meta.env.BASE_URL;

// No <StrictMode>: it double-runs canvas/GSAP effects (react-dev.md).
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>,
);
