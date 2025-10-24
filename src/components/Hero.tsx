import { Link } from 'react-router-dom';
import { GradientButton } from './GradientButton';

export default function Hero() {
  return (
    <>
      {/* CSS для анимированных кнопок */}
      <style>{`
        @keyframes rotate-gradient {
          0% {
            --angle: 0deg;
          }
          100% {
            --angle: 360deg;
          }
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .hero-button-animated {
          position: relative;
          padding: 12px 32px;
          border-radius: 12px;
          isolation: isolate;
          display: inline-block;
          text-align: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .hero-button-animated::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 12px;
          background: conic-gradient(
            from var(--angle, 0deg),
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
          --angle: 0deg;
          will-change: opacity;
        }

        .hero-button-animated::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: -1;
        }

        .hero-button-animated:hover::before {
          opacity: 1;
          animation: rotate-gradient 3s linear infinite;
        }

        .hero-button-animated:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 2px;
        }
      `}</style>
      <section
        className="relative overflow-hidden py-12 md:py-20 lg:py-28"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: 'rgba(248, 250, 252, 0.5)',
          backgroundImage: 'linear-gradient(135deg, rgba(241, 245, 249, 0.4) 0%, rgba(219, 234, 254, 0.4) 50%, rgba(238, 242, 255, 0.4) 100%)'
        }}
      >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[color:var(--ink)]">
            Клеи и стержни для промышленности
          </h1>
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            Прямые поставки от производителя Ergotek. Технические документы. Поддержка специалистов.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <GradientButton
              as="link"
              to="/catalog"
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              Открыть каталог
            </GradientButton>
            <Link
              to="/contacts"
              className="hero-button-animated text-slate-700 hover:text-slate-900 text-base sm:text-lg"
            >
              Связаться с нами
            </Link>
          </div>

          {/* Быстрые факты */}
          <div className="mt-8 md:mt-10 grid grid-cols-3 gap-3 sm:gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[color:var(--brand)]">7+</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1">Видов продукции</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[color:var(--brand)]">1-3</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1">Дня доставка</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[color:var(--brand)]">24/7</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1">Техподдержка</div>
            </div>
          </div>
        </div>

        {/* Плейсхолдер для изображения продукта */}
        <div className="relative">
          <div className="aspect-square w-full max-w-lg mx-auto rounded-2xl bg-gradient-to-br from-white to-slate-100 border-2 border-slate-200 shadow-2xl flex items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto h-32 w-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-slate-700 font-semibold text-lg">Место для фото продукта</p>
              <p className="text-slate-500 text-sm mt-2">Рекомендуемый размер: 800×800px</p>
              <p className="text-slate-400 text-xs mt-4">Идеально: клеевые стержни или упаковка на белом фоне</p>
            </div>
          </div>

          {/* Декоративные элементы */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 rounded-full opacity-20 blur-2xl"></div>
        </div>
      </div>
      </section>
    </>
  );
}
