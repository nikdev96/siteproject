import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[color:var(--ink)]">
            Клеи и стержни для промышленности
          </h1>
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            Прямые поставки от производителя Ergotek. Технические документы. Поддержка специалистов.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/catalog"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[color:var(--brand)] text-white rounded-xl font-semibold text-base sm:text-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-center"
            >
              Открыть каталог
            </Link>
            <Link
              to="/contacts"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 bg-white rounded-xl font-semibold text-base sm:text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 text-center"
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
  );
}
