import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import abrasivesData from '../data/abrasives.json';
import type { Abrasive } from '../types/abrasive';

export default function Abrasives() {
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  // Типизированные продукты
  const abrasives = abrasivesData as Abrasive[];

  // Получение уникальных серий с подсчетом
  const series = useMemo(() => {
    const seriesCounts = abrasives.reduce((acc, abrasive) => {
      const series = abrasive.series;
      acc[series] = (acc[series] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const uniqueSeries = [
      { id: 'all', title: 'Все ленты', count: abrasives.length },
      ...Object.entries(seriesCounts).map(([name, count]) => ({
        id: name,
        title: name,
        count
      }))
    ];

    return uniqueSeries;
  }, [abrasives]);

  // Фильтрация по серии
  const filteredAbrasives = useMemo(() => {
    return selectedSeries === 'all'
      ? abrasives
      : abrasives.filter(a => a.series === selectedSeries);
  }, [selectedSeries, abrasives]);

  return (
    <section className="bg-slate-50 py-10 md:py-14 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Абразивные материалы Abraform</h1>
        <p className="mt-2 text-slate-600">Широкие ленты для деревообработки и лакокрасочных покрытий</p>

        {/* Фильтры по сериям */}
        <div className="mt-8 flex flex-wrap gap-3">
          {series.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSeries(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedSeries === s.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s.title} ({s.count})
            </button>
          ))}
        </div>

        {/* Продукты */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAbrasives.map((abrasive) => (
            <div key={abrasive.id} className="rounded-2xl border border-orange-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" aria-hidden="true">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 mb-2"></div>
                  <p className="text-xs text-slate-500">Изображение продукта</p>
                </div>
              </div>

              <div className="mb-2 inline-block px-2 py-1 rounded-md bg-orange-100 text-xs font-medium text-orange-700">
                {abrasive.series}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">{abrasive.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{abrasive.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Зернистость:</span>
                  <span className="font-medium">{abrasive.grain}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Основа:</span>
                  <span className="font-medium">{abrasive.backing}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Ширина:</span>
                  <span className="font-medium">{abrasive.width}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 mb-4">
                <p className="text-xs text-slate-500 mb-2">Применение:</p>
                <div className="flex flex-wrap gap-1">
                  {abrasive.applications.slice(0, 3).map((app, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-xs">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to="/contacts#lead"
                  className="flex-1 text-center rounded-lg bg-orange-600 px-3 py-2 text-white text-sm font-medium hover:bg-orange-700"
                  aria-label={`Запросить коммерческое предложение для ${abrasive.name}`}
                >
                  Запросить КП
                </Link>
                {abrasive.link && (
                  <a
                    href={abrasive.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                    aria-label={`Открыть страницу ${abrasive.name} на сайте производителя`}
                  >
                    Подробнее
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAbrasives.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-slate-500">Продукты в данной серии скоро появятся</p>
          </div>
        )}
      </div>
    </section>
  );
}
