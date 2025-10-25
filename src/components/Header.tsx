import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { GradientButton } from './GradientButton';
import { PRODUCT_CATEGORIES } from '../constants/categories';
import gluesData from '../data/glues.json';
import type { Product } from '../types/product';
import { getCategoryCounts } from '../utils/productFilters';
import { usePrefetch } from '../hooks/usePrefetch';

export default function Header() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<number | null>(null);

  // Префетчинг для мгновенной навигации
  const { prefetchPage } = usePrefetch();

  // Типизированные продукты
  const products = gluesData as Product[];

  // Категории с актуальным подсчётом
  const categories = useMemo(() => {
    const counts = getCategoryCounts(products);
    return PRODUCT_CATEGORIES.map(cat => ({
      name: cat.name,
      path: cat.path,
      count: counts[cat.name] || 0
    }));
  }, [products]);

  // Инжектируем CSS анимацию в head только для кнопки "Каталог клеев"
  useEffect(() => {
    const styleId = 'nav-catalog-button-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-gradient {
          0% {
            --angle: 0deg;
          }
          100% {
            --angle: 360deg;
          }
        }

        .nav-item-animated {
          position: relative;
          padding: 8px 16px;
          border-radius: 24px;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.3s ease;
          --angle: 0deg;
        }

        .nav-item-animated::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          background: conic-gradient(
            from var(--angle),
            #7dd3fc,
            #60a5fa,
            #818cf8,
            #a78bfa,
            #c084fc,
            #a78bfa,
            #818cf8,
            #60a5fa,
            #7dd3fc
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
          will-change: opacity;
        }

        .nav-item-animated::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: -1;
        }

        .nav-item-animated:hover {
          animation: rotate-gradient 3s linear infinite;
        }

        .nav-item-animated:hover::before {
          opacity: 1;
        }

        .nav-item-animated:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 2px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Закрытие мобильного меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  // Обработчики для плавного открытия/закрытия с задержкой
  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsClosing(false);
    setCatalogOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsClosing(true);
      // Даем время на анимацию закрытия (300мс), затем скрываем элемент
      setTimeout(() => {
        setCatalogOpen(false);
        setIsClosing(false);
      }, 300);
    }, 1000); // 1 секунда задержки
    setCloseTimeout(timeout);
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-white/20 shadow-lg shadow-slate-900/5"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.72)'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo1.svg" alt="КлейВуд" className="h-9 w-9 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-lg tracking-tight">КлейВуд</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          {/* Dropdown меню каталога с улучшенной доступностью */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="nav-item-animated hover:text-slate-900 transition-colors"
              aria-expanded={catalogOpen}
              aria-haspopup="true"
              aria-label="Открыть меню каталога"
              onClick={() => setCatalogOpen(!catalogOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setCatalogOpen(false);
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCatalogOpen(!catalogOpen);
                }
              }}
            >
              Каталог клеев
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${catalogOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {catalogOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2"
                role="menu"
                aria-label="Категории товаров"
                style={{
                  animation: isClosing ? 'fadeSlideOut 0.3s ease-out' : 'fadeSlideIn 0.3s ease-out'
                }}
              >
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Категории товаров
                </div>
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    role="menuitem"
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    onClick={() => setCatalogOpen(false)}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full" aria-label={`${cat.count} товаров`}>
                      {cat.count}
                    </span>
                  </Link>
                ))}
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <Link
                    to="/catalog"
                    role="menuitem"
                    className="block px-4 py-2.5 text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                    onClick={() => setCatalogOpen(false)}
                  >
                    Все продукты →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/abrasives"
            className="nav-item-animated hover:text-slate-900 transition-colors"
            onMouseEnter={() => prefetchPage('abrasives')}
          >
            Абразивы
          </Link>
          <Link
            to="/applications"
            className="nav-item-animated hover:text-slate-900 transition-colors"
            onMouseEnter={() => prefetchPage('applications')}
          >
            По применению
          </Link>
          <Link
            to="/docs"
            className="nav-item-animated hover:text-slate-900 transition-colors"
            onMouseEnter={() => prefetchPage('docs')}
          >
            Документы
          </Link>
          <Link
            to="/contacts"
            className="nav-item-animated hover:text-slate-900 transition-colors"
            onMouseEnter={() => prefetchPage('contacts')}
          >
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <GradientButton
            as="link"
            to="/contacts#lead"
            className="hidden md:inline-flex text-sm"
          >
            Запросить КП
          </GradientButton>

          {/* Анимированная бургер-кнопка для мобильных */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 group relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              {/* Анимированные линии бургера */}
              <span
                className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Мобильное меню с Headless UI */}
      <Transition show={mobileMenuOpen}>
        <Dialog onClose={setMobileMenuOpen} className="relative z-50 md:hidden">
          {/* Backdrop с плавным появлением */}
          <TransitionChild
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </TransitionChild>

          {/* Full-screen container */}
          <div className="fixed inset-0 flex items-start justify-center">
            <TransitionChild
              enter="transition-transform duration-300 ease-out"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition-transform duration-200 ease-in"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full h-full bg-white overflow-y-auto">
            {/* Header внутри меню */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
              {/* Логотип */}
              <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo1.svg" alt="КлейВуд" className="h-9 w-9 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg tracking-tight">КлейВуд</span>
              </Link>

              {/* Анимированная кнопка закрытия */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 group"
                aria-label="Закрыть меню"
              >
                <svg
                  className="w-6 h-6 text-slate-700 group-hover:text-slate-900 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Анимированный X */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    className="group-hover:scale-110 transition-transform origin-center"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-4">
              {/* Каталог с категориями */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                  Каталог
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-slate-900 font-medium">{cat.name}</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">{cat.count}</span>
                  </Link>
                ))}
                <Link
                  to="/catalog"
                  className="block px-4 py-3 text-blue-600 hover:bg-blue-50 active:bg-blue-100 font-semibold rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Все продукты →
                </Link>
              </div>

              {/* Основные ссылки */}
              <div className="border-t border-slate-200 pt-4 space-y-1">
                <Link
                  to="/abrasives"
                  className="block px-4 py-3 text-slate-900 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Абразивы
                </Link>
                <Link
                  to="/applications"
                  className="block px-4 py-3 text-slate-900 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  По применению
                </Link>
                <Link
                  to="/docs"
                  className="block px-4 py-3 text-slate-900 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Документы
                </Link>
                <Link
                  to="/contacts"
                  className="block px-4 py-3 text-slate-900 hover:bg-slate-50 active:bg-slate-100 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Контакты
                </Link>
              </div>

              {/* CTA кнопка */}
              <div className="border-t border-slate-200 pt-4 mt-4">
                <GradientButton
                  as="link"
                  to="/contacts#lead"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full"
                >
                  Запросить КП
                </GradientButton>
              </div>
            </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
