import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="py-10 md:py-14 min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-600">Страница не найдена</p>
        <p className="mt-2 text-sm sm:text-base text-slate-500">Запрашиваемая страница не существует или была перемещена.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}
