import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCard from '../components/ProductCard';
import GlueSelector from '../components/GlueSelector';
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
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight">Каталог</h2>
            <Link to="/contacts#lead" className="text-sm text-blue-700 hover:underline">
              Нужна помощь в подборе?
            </Link>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Link to="/catalog" className="group rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-900 group-hover:scale-105 transition-transform" aria-hidden="true"></div>
                <div>
                  <h3 className="text-xl font-semibold">Клеи</h3>
                  <p className="text-slate-600 mt-1">EVA / APAO / PU / PVA, расплавы, стержни, контактные, очистители</p>
                </div>
              </div>
            </Link>
            <Link to="/abrasives" className="group rounded-2xl border border-orange-300 bg-orange-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 group-hover:scale-105 transition-transform" aria-hidden="true"></div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Абразивы Abraform</h3>
                  <p className="text-slate-600 mt-1">Широкие ленты для деревообработки и ЛКМ</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* По применению */}
      <section id="use" className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">По применению</h2>
          <p className="mt-2 text-slate-600">Выберите вашу задачу — покажем подходящие серии клеёв и абразивов.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Упаковка и этикетка',
              'Мебель, матрасы, дерево',
              'Металлообработка / слесарка',
              'Самоклеящиеся материалы (PSA)',
              'DIY и ремонт',
              'Авто‑сервис и ЛКМ'
            ].map((item) => (
              <Link key={item} to="/applications" className="group rounded-2xl border border-slate-200 p-5 hover:shadow-md bg-white transition-shadow">
                <div className="mb-3 h-24 w-full rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-slate-100" aria-hidden="true"></div>
                <p className="font-medium group-hover:text-slate-900">{item}</p>
                <p className="text-sm text-slate-600 mt-1">Подбор решения и спецификации.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Примеры продуктов */}
      <section className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight">Наша продукция</h2>
            <Link to="/catalog" className="text-sm text-blue-700 hover:underline">
              Смотреть весь каталог →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gluesData.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                specs={[
                  `Химия: ${product.chemistry}`,
                  ...('workingTemp' in product ? [`Рабочая t°: ${product.workingTemp}`] : []),
                  ...('applicationTemp' in product ? [`t° нанесения: ${product.applicationTemp}`] : []),
                  ...product.features ? [product.features[0]] : []
                ]}
                onDownloadTDS={() => console.log('Download TDS')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* О компании */}
      <section id="about" className="bg-slate-900 py-10 md:py-14 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">КлейВуд — поставки и технологическая поддержка</h2>
            <p className="mt-3 text-slate-300">
              Работаем с промышленными клиентами. Помогаем подобрать оптимальные клеи и абразивы под оборудование и материалы, предоставляем TDS/SDS и рекомендации по режимам.
            </p>
            <ul className="mt-6 space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
                <span>Склад в РФ и своевременная логистика</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
                <span>Подбор под PP/PE/дерево/металл/ткани</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
                <span>Тестовые образцы и шлиф‑режимы</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
            <div className="h-40 w-full rounded-xl bg-slate-800 border border-slate-700 mb-4" aria-hidden="true"></div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-slate-700 p-3">10+ лет в отрасли</div>
              <div className="rounded-xl border border-slate-700 p-3">Поддержка технолога</div>
              <div className="rounded-xl border border-slate-700 p-3">Гибкие условия</div>
              <div className="rounded-xl border border-slate-700 p-3">Документы и сертификаты</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
