import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600" aria-hidden="true"></div>
          <div>
            <p className="text-sm sm:text-base font-semibold">КлейВуд</p>
            <p className="text-xs text-slate-500">© {currentYear} Все права защищены</p>
          </div>
        </div>
        <nav className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-700">
          <Link to="/catalog" className="hover:text-slate-900">Каталог</Link>
          <Link to="/abrasives" className="hover:text-slate-900">Абразивы</Link>
          <Link to="/applications" className="hover:text-slate-900">Применения</Link>
          <Link to="/docs" className="hover:text-slate-900">Документы</Link>
          <Link to="/contacts" className="hover:text-slate-900">Контакты</Link>
        </nav>
      </div>
    </footer>
  );
}
