import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './layouts/Layout';
import Home from './pages/Home';

// Ленивая загрузка страниц для оптимизации
const Catalog = lazy(() => import('./pages/Catalog'));
const Abrasives = lazy(() => import('./pages/Abrasives'));
const Applications = lazy(() => import('./pages/Applications'));
const Docs = lazy(() => import('./pages/Docs'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Компонент загрузки
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-slate-600">Загрузка...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/abrasives" element={<Abrasives />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
