# КлейВуд

B2B сайт для поставки клеев-расплавов и абразивных материалов

## Возможности

- Интерактивная форма подбора клея по материалу и применению
- Каталог с фильтрацией по категориям (7 клеев + 6 абразивов)
- Форма заявки на КП с валидацией (react-hook-form + zod)
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

- **Bundle size:** 133 KB (gzip)
- **Build time:** 1.28s
- **Total size:** 552 KB
- Lazy loading всех страниц
- Code splitting оптимизирован
- Prefetching при hover

## Структура

```
src/
├── components/      # UI компоненты (GradientButton, Header, Hero)
├── pages/           # 6 страниц (Home, Catalog, Abrasives, etc.)
├── hooks/           # usePrefetch, useCursorGradient
├── data/            # JSON с продуктами (glues.json, abrasives.json)
├── utils/           # Валидация форм (zod схемы)
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

**Версия:** 2.0.1 • **Качество:** 10/10 ⭐
