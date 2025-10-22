import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Прямые поставки',
      description: 'От производителя Ergotek без посредников',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Быстрая доставка',
      description: 'Склад в РФ, логистика 1-3 дня',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'TDS/SDS документы',
      description: 'Полная техническая документация к каждому продукту',
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-50'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: 'Техподдержка',
      description: 'Консультации специалистов по подбору и применению',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.1 + index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-center group relative"
              >
                {/* Фоновый градиент при hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10`}></div>

                {/* Иконка с градиентом */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 overflow-hidden"
                >
                  {/* Градиентный фон */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

                  {/* Граница с градиентом */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}></div>

                  {/* Иконка с градиентным цветом */}
                  <div className={`relative bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                </motion.div>

                <h3 className="font-semibold text-base sm:text-lg mb-2 text-slate-900 group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                  {feature.description}
                </p>

                {/* Тонкая линия снизу при hover с заострённым концом */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${feature.gradient} group-hover:w-20 transition-all duration-300`} style={{ clipPath: 'polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)' }}></div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
