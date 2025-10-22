import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';

export default function Applications() {
  const applications = [
    { title: 'Упаковка и этикетка', description: 'Подбор решения и спецификации для упаковочной индустрии.' },
    { title: 'Мебель, матрасы, дерево', description: 'Клеи для деревообработки и мебельного производства.' },
    { title: 'Металлообработка / слесарка', description: 'Абразивные материалы для обработки металлов.' },
    { title: 'Самоклеящиеся материалы (PSA)', description: 'PSA-клеи для производства самоклеящихся материалов.' },
    { title: 'DIY и ремонт', description: 'Решения для ремонтно-строительных работ.' },
    { title: 'Авто‑сервис и ЛКМ', description: 'Абразивы для подготовки поверхностей под покраску.' }
  ];

  return (
    <section className="py-10 md:py-14 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">По применению</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">Выберите вашу задачу — покажем подходящие серии клеёв и абразивов.</p>
        </FadeIn>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, index) => (
            <FadeIn key={app.title} delay={0.1 + index * 0.05} fullWidth>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
              >
                <Link
                  to="/contacts#lead"
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 p-4 sm:p-5 hover:shadow-xl hover:border-blue-200 bg-white transition-all duration-300 h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col h-full">
                    <div className="mb-3 h-20 sm:h-24 w-full rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-slate-100 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 flex items-center justify-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{app.title}</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 group-hover:text-slate-700 transition-colors">{app.description}</p>
                  </div>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
