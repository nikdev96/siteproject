import { useState } from 'react';
import { Link } from 'react-router-dom';
import gluesData from '../data/glues.json';
import type { Product } from '../types/product';
import type { MaterialValue, ApplicationValue } from '../constants/categories';
import { MATERIALS, APPLICATIONS } from '../constants/categories';
import { filterProducts, formatProductSpecs } from '../utils/productFilters';

export default function GlueSelector() {
  const [material, setMaterial] = useState<MaterialValue | ''>('');
  const [application, setApplication] = useState<ApplicationValue | ''>('');
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Типизированные продукты
  const products = gluesData as Product[];

  const handleSearch = () => {
    // Используем утилиту фильтрации
    const filtered = filterProducts(products, material, application);
    setResults(filtered);
    setShowResults(true);
  };

  const handleReset = () => {
    setMaterial('');
    setApplication('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Подбор клея по материалу</h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">Ответьте на несколько вопросов, и мы подберём оптимальное решение</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm">
          <div className="space-y-4 sm:space-y-6">
            {/* Материал */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                Какой материал нужно склеивать?
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as MaterialValue | '')}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите материал</option>
                {MATERIALS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Применение */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                Область применения
              </label>
              <select
                value={application}
                onChange={(e) => setApplication(e.target.value as ApplicationValue | '')}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Выберите применение</option>
                {APPLICATIONS.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSearch}
                disabled={!material && !application}
                className="flex-1 rounded-xl bg-blue-600 px-4 sm:px-6 py-3 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Подобрать клей
              </button>
              <button
                onClick={handleReset}
                className="rounded-xl border border-slate-300 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium hover:bg-slate-50"
              >
                Сбросить
              </button>
            </div>
          </div>

          {/* Результаты */}
          {showResults && (
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                {results.length > 0 ? `Найдено ${results.length} подходящих продукта:` : 'Подходящие продукты не найдены'}
              </h3>

              {results.length > 0 && (
                <div className="space-y-4">
                  {results.map((product) => (
                    <div key={product.id} className="rounded-xl border border-slate-200 p-3 sm:p-4 hover:bg-slate-50">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1 w-full">
                          <div className="mb-1 inline-block px-2 py-0.5 rounded-md bg-blue-50 text-xs font-medium text-blue-700">
                            {product.category}
                          </div>
                          <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">{product.name}</h4>
                          <p className="text-xs sm:text-sm text-slate-600 mb-2">
                            {formatProductSpecs(product)}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {product.applications.slice(0, 4).map((app, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link
                          to="/contacts#lead"
                          className="w-full sm:w-auto text-center rounded-lg bg-blue-600 px-4 py-2 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 whitespace-nowrap"
                        >
                          Запросить КП
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">Не нашли подходящий продукт? Свяжитесь с нами для консультации.</p>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-medium hover:bg-blue-700"
                  >
                    Связаться с нами
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
