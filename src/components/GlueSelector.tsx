import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
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

  // Эффект следования курсора для градиента
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    e.currentTarget.style.background = `radial-gradient(circle at ${x}% 50%, #a855f7, #7c3aed, #4f46e5)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)';
  };

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
        <FadeIn>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Подбор клея по материалу</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">Ответьте на несколько вопросов, и мы подберём оптимальное решение</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto relative rounded-2xl"
            style={{
              padding: '3px',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4, #3b82f6)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 6s linear infinite'
            }}
          >
            <style>{`
              @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes button-gradient {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
              }
              button.group:hover,
              a.group:hover {
                animation: button-gradient 2s linear infinite !important;
              }
            `}</style>

            {/* Белый фон */}
            <div className="relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-4 sm:space-y-6">
              {/* Материал */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                  Какой материал нужно склеивать?
                </label>
                <div className="relative">
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value as MaterialValue | '')}
                    className="w-full appearance-none rounded-xl border border-slate-300 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-400 bg-white"
                  >
                    <option value="">Выберите материал</option>
                    {MATERIALS.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Применение */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                  Область применения
                </label>
                <div className="relative">
                  <select
                    value={application}
                    onChange={(e) => setApplication(e.target.value as ApplicationValue | '')}
                    className="w-full appearance-none rounded-xl border border-slate-300 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-400 bg-white"
                  >
                    <option value="">Выберите применение</option>
                    {APPLICATIONS.map((a) => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleSearch}
                disabled={!material && !application}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 rounded-xl px-4 sm:px-6 py-3 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg relative overflow-hidden gradient-button"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  e.currentTarget.style.background = `radial-gradient(circle at ${x}% 50%, #a855f7, #7c3aed, #4f46e5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)';
                }}
                style={{
                  background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)'
                }}
              >
                <span className="relative z-10">Подобрать клей</span>
              </motion.button>
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-slate-300 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
              >
                Сбросить
              </motion.button>
            </div>

            {/* Результаты */}
            {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                {results.length > 0 ? `Найдено ${results.length} подходящих продукта:` : 'Подходящие продукты не найдены'}
              </h3>

              {results.length > 0 && (
                <div className="space-y-4">
                  {results.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="rounded-xl border border-slate-200 p-3 sm:p-4 hover:bg-slate-50 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                    >
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
                          className="w-full sm:w-auto text-center rounded-lg px-4 py-2 text-white text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-sm hover:shadow-md relative overflow-hidden group"
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)'
                          }}
                        >
                          <span className="relative z-10">Запросить КП</span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <p className="text-slate-500 mb-4">Не нашли подходящий продукт? Свяжитесь с нами для консультации.</p>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center rounded-xl px-6 py-3 text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg relative overflow-hidden group"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)'
                    }}
                  >
                    <span className="relative z-10">Связаться с нами</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
            )}
          </div>
        </div>
        </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
