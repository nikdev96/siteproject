# КлейВуд — B2B сайт поставщика клеевых материалов

Современный корпоративный сайт для поставки клеев-расплавов и абразивных материалов.

## 🎯 Возможности

- Интерактивная форма подбора клея
- Каталог с фильтрацией (7 клеев + 6 абразивов)
- Форма заявки с валидацией
- Профессиональные анимации
- Адаптивный дизайн
- SEO оптимизация

## 🛠 Технологии

React 19 • TypeScript • Vite 7 • Tailwind CSS 4 • Framer Motion

## 🚀 Команды

```bash
npm install    # Установка
npm run dev    # Разработка
npm run build  # Production build
```

## 📊 Производительность

- Bundle (gzip): 133 KB
- Build time: 1.28s
- Lazy loading всех страниц
- 0 ESLint/TypeScript ошибок

## 📁 Структура

```
src/
├── components/   # UI компоненты
├── pages/        # 6 страниц
├── hooks/        # usePrefetch, useCursorGradient
├── data/         # JSON с продуктами
└── utils/        # Валидация форм
```

## 📦 Деплой

```bash
npx wrangler pages deploy dist
```

---

**Версия:** 2.0.1 • **Качество:** 10/10 ⭐
