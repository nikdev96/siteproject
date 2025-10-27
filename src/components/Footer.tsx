import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      {/* Контент */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 group mb-4">
              <img src="/logo1.svg" alt="КлейВуд" className="h-10 w-10 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold">КлейВуд</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Поставки и технологическая поддержка
            </p>
            <p className="text-slate-400 text-xs">
              © {currentYear} Все права защищены
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Навигация</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/catalog" className="text-slate-300 hover:text-white transition-colors text-sm">
                Каталог клеев
              </Link>
              <Link to="/abrasives" className="text-slate-300 hover:text-white transition-colors text-sm">
                Абразивные материалы
              </Link>
              <Link to="/applications" className="text-slate-300 hover:text-white transition-colors text-sm">
                По применению
              </Link>
              <Link to="/docs" className="text-slate-300 hover:text-white transition-colors text-sm">
                Документация
              </Link>
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Контакты</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@kleyvud.ru" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm group">
                <Mail className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>info@kleyvud.ru</span>
              </a>
              <a href="tel:+78005553535" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm group">
                <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>+7 (800) 555-35-35</span>
              </a>
              <div className="flex items-start gap-2 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Москва, Россия</span>
              </div>
            </div>
          </div>

          {/* Рабочие часы */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">Режим работы</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-slate-400 text-xs mt-1">Сб-Вс: выходной</p>
                </div>
              </div>
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/50"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>Работаем с промышленными клиентами. Помогаем подобрать оптимальные клеи и абразивы.</p>
            <div className="flex items-center gap-6">
              <Link to="/docs" className="hover:text-slate-200 transition-colors">
                TDS/SDS документы
              </Link>
              <span className="text-slate-600">|</span>
              <Link to="/contacts" className="hover:text-slate-200 transition-colors">
                Техподдержка
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
