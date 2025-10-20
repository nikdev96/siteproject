import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gluesData from '../data/glues.json';
import type { Product } from '../types/product';
import { getCategoryCounts } from '../utils/productFilters';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('cat') || searchParams.get('type') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);

  // Синхронизация с URL при изменении параметров
  useEffect(() => {
    const urlCategory = searchParams.get('cat') || searchParams.get('type') || 'all';
    setSelectedCategory(urlCategory);
  }, [searchParams]);

  // Типизированные продукты
  const products = gluesData as Product[];

  // Оптимизированный подсчёт категорий с useMemo
  const categories = useMemo(() => {
    const categoryCounts = getCategoryCounts(products);

    return [
      { id: 'all', title: 'Все продукты', count: products.length },
      { id: 'Клеевые стержни', title: 'Клеевые стержни', count: categoryCounts['Клеевые стержни'] || 0 },
      { id: 'Клей для фанеры', title: 'Клей для фанеры', count: categoryCounts['Клей для фанеры'] || 0 },
      { id: 'Клеи-расплавы для изоляции', title: 'Клеи-расплавы для изоляции', count: categoryCounts['Клеи-расплавы для изоляции'] || 0 },
      { id: 'Клеи-расплавы для самоклеящихся материалов', title: 'Клеи для самоклеящихся материалов', count: categoryCounts['Клеи-расплавы для самоклеящихся материалов'] || 0 }
    ];
  }, [products]);

  // Оптимизированная фильтрация с useMemo
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  // Обработчик изменения категории с обновлением URL
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: catId });
    }
  };

  return (
    <section className="bg-slate-50 py-10 md:py-14 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Каталог продукции</h1>
        <p className="mt-2 text-slate-600">Клеи-расплавы и клеевые стержни для промышленного применения</p>

        {/* Категории-фильтры */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.title} ({cat.count})
            </button>
          ))}
        </div>

        {/* Продукты */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center" aria-hidden="true">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-2"></div>
                  <p className="text-xs text-slate-500">Изображение продукта</p>
                </div>
              </div>

              <div className="mb-2 inline-block px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
                {product.category}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-3">{product.name}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Химия:</span>
                  <span className="font-medium">{product.chemistry}</span>
                </div>

                {'diameter' in product && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Диаметр:</span>
                    <span className="font-medium">{product.diameter}</span>
                  </div>
                )}

                {'workingTemp' in product && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Рабочая t°:</span>
                    <span className="font-medium">{product.workingTemp}</span>
                  </div>
                )}

                {'applicationTemp' in product && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">t° нанесения:</span>
                    <span className="font-medium">{product.applicationTemp}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-3 mb-4">
                <p className="text-xs text-slate-500 mb-2">Применение:</p>
                <div className="flex flex-wrap gap-1">
                  {product.applications.slice(0, 3).map((app, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/contacts#lead`}
                  className="flex-1 text-center rounded-lg bg-blue-600 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700"
                  aria-label={`Запросить коммерческое предложение для ${product.name}`}
                >
                  Запросить КП
                </Link>
                <button
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                  aria-label={`Скачать техническую документацию для ${product.name}`}
                  onClick={() => alert('Функция скачивания TDS будет доступна скоро')}
                >
                  TDS
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-slate-500">Продукты в данной категории скоро появятся</p>
          </div>
        )}
      </div>
    </section>
  );
}
