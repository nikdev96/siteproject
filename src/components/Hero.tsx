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
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Клеи и стержни для промышленности
          </h1>
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed">
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
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">7+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Видов продукции</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">1-3</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Дня доставка</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Техподдержка</div>
            </div>
          </div>
        </div>

        {/* Информационные карточки */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {/* Карточка 1 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-3xl font-bold text-blue-400 mb-2">10+ лет</div>
                <div className="text-sm text-slate-400">в отрасли</div>
              </div>
            </div>

            {/* Карточка 2 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-3xl font-bold text-emerald-400 mb-2">Поддержка</div>
                <div className="text-sm text-slate-400">технолога</div>
              </div>
            </div>

            {/* Карточка 3 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-3xl font-bold text-violet-400 mb-2">Гибкие</div>
                <div className="text-sm text-slate-400">условия</div>
              </div>
            </div>

            {/* Карточка 4 */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-3xl font-bold text-orange-400 mb-2">Документы</div>
                <div className="text-sm text-slate-400">и сертификаты</div>
              </div>
            </div>
          </div>

          {/* Декоративные элементы */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
      </section>
    </>
  );
}
