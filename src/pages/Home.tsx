import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import GlueSelector from '../components/GlueSelector';
import { FadeIn } from '../components/FadeIn';
import gluesData from '../data/glues.json';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Блок преимуществ */}
      <Features />

      {/* Форма подбора клея */}
      <GlueSelector />

      {/* Каталог */}
      <section id="catalog" className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Каталог</h2>
              <Link to="/contacts#lead" className="text-sm text-blue-700 hover:text-blue-900 transition-colors duration-200">
                Нужна помощь в подборе? →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <FadeIn delay={0.1} fullWidth>
              <Link to="/catalog" className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 h-full flex">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4 w-full">
                  <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200">Клеи</h3>
                    <p className="text-slate-600 text-sm mt-1 group-hover:text-slate-700 transition-colors">EVA / APAO / PU / PVA, расплавы, стержни</p>
                  </div>
                  <svg className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.2} fullWidth>
              <Link to="/abrasives" className="group relative overflow-hidden rounded-2xl border border-orange-200 bg-orange-50 p-6 hover:shadow-2xl hover:border-orange-400 transition-all duration-300 h-full flex">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4 w-full">
                  <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-200">Абразивы Abraform</h3>
                    <p className="text-slate-600 text-sm mt-1 group-hover:text-slate-700 transition-colors">Широкие ленты для деревообработки и ЛКМ</p>
                  </div>
                  <svg className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* По применению */}
      <section id="use" className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">По применению</h2>
            <p className="mt-2 text-slate-600">Выберите вашу задачу — покажем подходящие серии клеёв и абразивов.</p>
          </FadeIn>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Упаковка и этикетка',
              'Мебель, матрасы, дерево',
              'Металлообработка / слесарка',
              'Самоклеящиеся материалы (PSA)',
              'DIY и ремонт',
              'Авто‑сервис и ЛКМ'
            ].map((item, index) => (
              <FadeIn key={item} delay={0.1 + index * 0.05} fullWidth>
                <Link to="/applications" className="group relative overflow-hidden rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-blue-200 bg-white transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col h-full">
                    <div className="mb-3 h-24 w-full rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-slate-100 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 flex items-center justify-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{item}</p>
                    <p className="text-sm text-slate-600 mt-1 group-hover:text-slate-700 transition-colors">Подбор решения и спецификации →</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Примеры продуктов */}
      <section className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Наша продукция</h2>
              <Link to="/catalog" className="text-sm text-blue-700 hover:underline">
                Смотреть весь каталог →
              </Link>
            </div>
          </FadeIn>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gluesData.slice(0, 3).map((product, index) => (
              <FadeIn key={product.id} delay={0.1 + index * 0.1}>
                <ProductCard
                  title={product.name}
                  specs={[
                    `Химия: ${product.chemistry}`,
                    ...('workingTemp' in product ? [`Рабочая t°: ${product.workingTemp}`] : []),
                    ...('applicationTemp' in product ? [`t° нанесения: ${product.applicationTemp}`] : []),
                    ...product.features ? [product.features[0]] : []
                  ]}
                  onDownloadTDS={() => console.log('Download TDS')}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 md:py-16 lg:py-20 text-white">
        {/* Декоративные элементы фона */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeIn direction="left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              КлейВуд — поставки и технологическая поддержка
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-300 leading-relaxed">
              Работаем с промышленными клиентами. Помогаем подобрать оптимальные клеи и абразивы под оборудование и материалы, предоставляем TDS/SDS и рекомендации по режимам.
            </p>
            <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">Склад в РФ и своевременная логистика</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">Подбор под PP/PE/дерево/металл/ткани</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">Тестовые образцы и шлиф‑режимы</span>
              </li>
            </ul>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
