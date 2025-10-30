import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import { MotionPage } from './components/MotionPage';

// Ленивая загрузка страниц для оптимизации
const Catalog = lazy(() => import('./pages/Catalog'));
const Abrasives = lazy(() => import('./pages/Abrasives'));
const Applications = lazy(() => import('./pages/Applications'));
const Docs = lazy(() => import('./pages/Docs'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Улучшенный компонент загрузки с градиентной анимацией
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, rgba(241, 245, 249, 1) 0%, rgba(219, 234, 254, 1) 50%, rgba(238, 242, 255, 1) 100%)'
    }}>
      <div className="text-center">
        {/* Анимированный градиентный спиннер */}
        <div className="relative inline-block">
          <div
            className="h-12 w-12 rounded-full border-4 border-solid border-transparent animate-spin"
            style={{
              borderTopColor: '#7dd3fc',
              borderRightColor: '#60a5fa',
              borderBottomColor: '#818cf8',
              borderLeftColor: '#a78bfa'
            }}
          />
          <div
            className="absolute inset-0 h-12 w-12 rounded-full border-4 border-solid border-transparent animate-spin"
            style={{
              borderTopColor: '#c084fc',
              borderRightColor: '#e879f9',
              opacity: 0.5,
              animationDirection: 'reverse',
              animationDuration: '1.5s'
            }}
          />
        </div>
        <p className="mt-6 text-slate-700 font-medium">Загрузка...</p>
        <p className="mt-2 text-sm text-slate-500">Подождите немного</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<MotionPage><Home /></MotionPage>} />
            <Route path="/catalog" element={<MotionPage><Catalog /></MotionPage>} />
            <Route path="/abrasives" element={<MotionPage><Abrasives /></MotionPage>} />
            <Route path="/applications" element={<MotionPage><Applications /></MotionPage>} />
            <Route path="/docs" element={<MotionPage><Docs /></MotionPage>} />
            <Route path="/contacts" element={<MotionPage><Contacts /></MotionPage>} />
            <Route path="*" element={<MotionPage><NotFound /></MotionPage>} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
