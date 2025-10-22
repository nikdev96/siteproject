import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  specs: string[];
  onDownloadTDS?: () => void;
}

export default function ProductCard({ title, specs, onDownloadTDS }: ProductCardProps) {
  // Эффект следования за курсором
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    e.currentTarget.style.background = `radial-gradient(circle at ${x}% 50%, #a855f7, #7c3aed, #4f46e5)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)';
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Плейсхолдер для фото продукта */}
        <div className="mb-4 aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 border border-slate-200 overflow-hidden relative group-hover:border-blue-300 transition-colors" aria-hidden="true">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Место для фото продукта</p>
            <p className="text-xs text-slate-400 mt-1">400×300px</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--brand)] transition-colors duration-200">{title}</h3>
        <ul className="mt-2 text-sm text-slate-600 space-y-1">
          {specs.map((spec, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-200" aria-hidden="true"></span>
              <span className="group-hover:text-slate-900 transition-colors">{spec}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <Link
            to="/contacts#lead"
            className="flex-1 text-center inline-flex items-center justify-center rounded-lg px-3 py-2 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)'
            }}
          >
            <span className="relative z-10">Запросить КП</span>
          </Link>
          <button
            onClick={onDownloadTDS}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
          >
            TDS
          </button>
        </div>
      </div>
    </motion.div>
  );
}
