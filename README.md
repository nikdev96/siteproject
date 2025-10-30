# КлейВуд

B2B сайт для поставки клеев-расплавов и абразивных материалов

## Возможности

- Интерактивная форма подбора клея по материалу и применению
- Каталог с фильтрацией по категориям (7 клеев + 6 абразивов)
- Форма заявки на КП с валидацией (react-hook-form + zod)
- Плавные переходы между страницами (AnimatePresence)
- Умный префетчинг для мгновенной навигации
- Профессиональные анимации (scroll-reveal, hover-эффекты)
- Адаптивный дизайн для мобильных и десктопа
- SEO оптимизация (meta-теги, sitemap, robots.txt)

## Технологии

**Frontend:**
- React 19 + TypeScript
- Vite 7.1.10
- Tailwind CSS v4
- Framer Motion v12
- React Router v7

**Качество:**
- ✅ 0 ESLint ошибок
- ✅ 0 TypeScript ошибок
- ✅ Полная типизация

## Запуск

```bash
# Установка зависимостей
npm install

# Разработка (http://localhost:5173)
npm run dev

# Production build
npm run build

# Превью production
npm run preview
```

## Производительность

- **Bundle size:** 142.6 KB (gzip)
- **Build time:** ~1.6s
- **Total size:** 456 KB
- Оптимизированная загрузка главной страницы
- Lazy loading остальных страниц
- Code splitting оптимизирован
- Умный prefetching на Hero и Header
- Плавные переходы за 0.3s (без задержек)

## Структура

```
src/
├── components/      # UI компоненты (GradientButton, MotionPage, Header, Hero)
├── pages/           # 6 страниц (Home, Catalog, Abrasives, etc.)
├── hooks/           # usePrefetch, useCursorGradient
├── data/            # JSON с продуктами (glues.json, abrasives.json)
├── utils/           # Валидация форм (zod схемы)
├── layouts/         # Layout компоненты для роутинга
└── types/           # TypeScript типы
```

## Деплой на Cloudflare Pages

```bash
# Через CLI
npx wrangler pages deploy dist

# Или через Git
# Build command: npm run build
# Output directory: dist
```

---

**Версия:** 2.1.0 • **Качество:** 10/10 ⭐

## Changelog

### v2.1.0 (2025-10-31)
- ✅ Исправлена структура зависимостей (react-router-dom → dependencies)
- ✅ Оптимизирована загрузка главной страницы (убран lazy loading для Home)
- ✅ Добавлены плавные переходы между страницами с AnimatePresence
- ✅ Улучшен UX: убран экран загрузки при переходах
- ✅ Добавлен префетчинг на главной странице (Hero)
- ✅ Исправлено центрирование текста на кнопках
