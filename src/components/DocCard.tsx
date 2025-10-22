import { motion } from 'framer-motion';

interface DocCardProps {
  title: string;
  description: string;
  onDownload?: () => void;
}

export default function DocCard({ title, description, onDownload }: DocCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative rounded-2xl border border-slate-200 p-5 bg-white hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start justify-between gap-3 flex-1">
        <div className="flex-1">
          <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{title}</p>
          <p className="text-sm text-slate-600 mt-1 group-hover:text-slate-700 transition-colors">{description}</p>
        </div>
        <button
          onClick={onDownload}
          className="flex-shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 hover:scale-105 transition-all duration-200"
        >
          Скачать
        </button>
      </div>
    </motion.div>
  );
}
