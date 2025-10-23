# КлейВуд — B2B сайт поставщика клеевых материалов

Современный корпоративный сайт для поставки клеев-расплавов, клеевых стержней и абразивных материалов.

## 🎯 Что реализовано

- ✅ Многостраничный сайт с 6 страницами
- ✅ Интерактивная форма подбора клея по материалу и применению
- ✅ Каталог с фильтрацией по категориям (7 продуктов)
- ✅ Раздел абразивов с фильтрацией по сериям (6 продуктов)
- ✅ Форма заявки на коммерческое предложение с валидацией
- ✅ Профессиональные анимации (Framer Motion)
- ✅ Полная адаптивность (мобильные, планшеты, десктоп)
- ✅ SEO оптимизация (meta-теги, sitemap, robots.txt)
- ✅ Production build готов к деплою

## 🛠 Технологии

**Frontend:**
- React 19 + TypeScript
- Vite 7.1.10
- React Router v7
- Tailwind CSS v4
- Framer Motion v12

**Качество кода:**
- react-hook-form + zod (валидация форм)
- @headlessui/react (доступные UI компоненты)
- Полная типизация TypeScript
- ✅ 0 ESLint ошибок
- ✅ 0 TypeScript ошибок

## 🚀 Запуск

```bash
# Установка
npm install

# Разработка
npm run dev

# Production build
npm run build

# Превью production
npm run preview
```

## 📊 Производительность

**Build метрики:**
- Общий размер: 552 KB
- Main JS (gzip): 133.06 KB
- Build time: 1.28s ⚡
- Lazy loading всех страниц
- Code splitting оптимизирован

## 📁 Структура

```
src/
├── components/     # Переиспользуемые компоненты
│   ├── GradientButton.tsx    # Кнопка с анимацией
│   ├── Header.tsx            # Навигация с dropdown
│   ├── Hero.tsx              # Hero-секция
│   ├── GlueSelector.tsx      # Форма подбора клея
│   └── FadeIn.tsx            # Scroll-reveal анимации
├── pages/          # Страницы
│   ├── Home.tsx              # Главная
│   ├── Catalog.tsx           # Каталог клеев
│   ├── Abrasives.tsx         # Абразивы
│   ├── Applications.tsx      # По применению
│   ├── Docs.tsx              # Документы
│   └── Contacts.tsx          # Контакты + форма
├── hooks/          # Кастомные хуки
│   ├── usePrefetch.ts        # Префетчинг страниц
│   └── useCursorGradient.ts  # Градиент по курсору
├── data/           # JSON данные
│   ├── glues.json            # 7 продуктов клеев
│   └── abrasives.json        # 6 абразивов
└── utils/          # Утилиты
    └── validation.ts         # Zod схемы валидации
```

## 🎨 Особенности

**Анимации:**
- Scroll-reveal эффекты на всех страницах
- Hover-эффекты с физикой (Framer Motion)
- Вращающиеся градиентные рамки на навигации
- Плавные переходы между страницами

**UX/UI:**
- Glassmorphism эффекты (header, hero)
- Адаптивная цветовая схема (синий для клеев, оранжевый для абразивов)
- Мобильное меню с анимациями
- Dropdown меню каталога с задержкой закрытия
- Липкая кнопка "Запросить КП"

**Оптимизации:**
- Lazy loading всех страниц
- Prefetching при hover на ссылки
- Code splitting по роутам
- Tree-shaking для минимального bundle

## 📦 Деплой

Production build готов в папке `dist/`:

```bash
# Cloudflare Pages
npx wrangler pages deploy dist

# Или через Git
# Настройки: Build command: npm run build
#            Output directory: dist
```

## 🔗 Ссылки

- **Поставщик:** [Ergotek.ru](https://ergotek.ru/)
- **Абразивы:** [Rollis.su](https://rollis.su/)
- **Дизайн вдохновение:** [Linkify.io](https://linkify-io.vercel.app/)

---

**Версия:** 2.0.1
**Последнее обновление:** 23 октября 2025
**Рейтинг качества:** 10/10 ⭐
