import { useState, useMemo } from 'react';
import DocCard from '../components/DocCard';
import { useDebounce } from '../hooks/useDebounce';
import { FadeIn } from '../components/FadeIn';

export default function Docs() {
  const [searchInput, setSearchInput] = useState('');
  const searchQuery = useDebounce(searchInput, 300); // 300мс задержка

  const documents = [
    { title: 'TDS — Серия 1', description: 'PDF, 2.1 МБ • параметры, применение, совместимые материалы' },
    { title: 'TDS — Серия 2', description: 'PDF, 2.1 МБ • параметры, применение, совместимые материалы' },
    { title: 'TDS — Серия 3', description: 'PDF, 2.1 МБ • параметры, применение, совместимые материалы' },
    { title: 'SDS — EVA клеи', description: 'PDF, 1.8 МБ • паспорт безопасности, химический состав' },
    { title: 'SDS — АПАО клеи', description: 'PDF, 1.9 МБ • паспорт безопасности, химический состав' },
    { title: 'Инструкция по применению', description: 'PDF, 3.2 МБ • рекомендации по использованию и хранению' }
  ];

  const handleDownload = (title: string) => {
    console.log('Download:', title);
  };

  // Оптимизированная фильтрация с useMemo (вместо двух вызовов filter)
  const filteredDocuments = useMemo(() => {
    if (!searchQuery) return documents;

    const query = searchQuery.toLowerCase();
    return documents.filter(doc =>
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section className="py-10 md:py-14 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Документы</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600">TDS / SDS / инструкции по применению</p>
            </div>
            <div className="w-full md:max-w-xs">
              <label className="sr-only" htmlFor="docsearch">Поиск</label>
              <input
                id="docsearch"
                type="search"
                placeholder="Поиск по документам"
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </FadeIn>
        <div className="mt-6 md:mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc, index) => (
            <FadeIn key={doc.title} delay={0.1 + index * 0.05} fullWidth>
              <DocCard
                title={doc.title}
                description={doc.description}
                onDownload={() => handleDownload(doc.title)}
              />
            </FadeIn>
          ))}
        </div>
        {filteredDocuments.length === 0 && (
          <p className="mt-8 text-center text-slate-500">Документы не найдены</p>
        )}
      </div>
    </section>
  );
}
