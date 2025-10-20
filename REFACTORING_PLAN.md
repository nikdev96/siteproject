# План реорганизации проекта: Двухбрендовая структура

**Дата:** 19.10.2025
**Цель:** Разделить проект на два раздела — Ergotek (клеи) и Abraform (абразивы)

## ✅ Выполнено (19.10.2025)

### 1. Устранены баги
- [x] Header.tsx:26 — заменен useMemo на useEffect для resize-событий
- [x] GlueSelector.tsx:112 — убран висячий разделитель через formatProductSpecs()
- [x] App.css — очищен от конфликтующих Vite-стилей
- [x] Catalog.tsx — добавлено чтение query-параметров через useSearchParams

### 2. Создана структура данных для абразивов
- [x] `/src/types/abrasive.ts` — типы для абразивных продуктов Abraform
- [x] `/src/data/abrasives.json` — 6 продуктов (HardLine FS P80/P120, WoodLine FA P100, WoodLine XA P150, LacLine ES P180, LacLine ES stearat+ P240)
- [x] `/src/pages/BrandSelection.tsx` — главная страница выбора бренда

## 📋 TODO: Реорганизация роутинга

### Этап 1: Структура маршрутов
- [ ] Создать `/src/layouts/ErgoLayout.tsx` — обертка для Ergotek с синим брендингом
- [ ] Создать `/src/layouts/AbraLayout.tsx` — обертка для Abraform с оранжевым брендингом
- [ ] Обновить `App.tsx` с новой структурой роутов:
  ```
  / → BrandSelection
  /ergotek → ErgoLayout
    /ergotek (home)
    /ergotek/catalog
    /ergotek/applications
    /ergotek/docs
    /ergotek/contacts
  /abraform → AbraLayout
    /abraform (home)
    /abraform/catalog
    /abraform/applications
    /abraform/docs
    /abraform/contacts
  ```

### Этап 2: Создание страниц Abraform
- [ ] `/src/pages/abraform/Home.tsx` — главная с hero для абразивов
- [ ] `/src/pages/abraform/Catalog.tsx` — каталог с фильтрами по зернистости, сериям
- [ ] `/src/pages/abraform/Applications.tsx` — применения абразивов
- [ ] `/src/pages/abraform/Docs.tsx` — документы TDS для абразивов
- [ ] `/src/pages/abraform/Contacts.tsx` — контакты с полем "Поставщик: Abraform"

### Этап 3: Реорганизация существующих страниц Ergotek
- [ ] Переместить текущие страницы в `/src/pages/ergotek/`:
  - Home.tsx
  - Catalog.tsx
  - Applications.tsx
  - Docs.tsx
  - Contacts.tsx
- [ ] Обновить импорты в компонентах

### Этап 4: Brand-aware компоненты
- [ ] Создать `/src/contexts/BrandContext.tsx` — контекст для определения текущего бренда
- [ ] Обновить Header.tsx:
  - Добавить логику определения бренда по URL
  - Brand-specific логотип и цвета
  - Разные меню для Ergotek и Abraform
- [ ] Обновить Footer.tsx:
  - Brand-specific ссылки
  - Разные цвета для брендов
- [ ] Обновить Contacts форму:
  - Добавить скрытое поле "Поставщик" (определяется по контексту)
  - Brand-specific email получателя

### Этап 5: Brand-specific стили
- [ ] Обновить `/src/index.css`:
  ```css
  :root {
    /* Ergotek (синий) */
    --brand-ergotek: #2563EB;
    --brand-ergotek-dark: #1d4ed8;

    /* Abraform (оранжевый) */
    --brand-abraform: #ea580c;
    --brand-abraform-dark: #c2410c;
  }

  [data-brand="ergotek"] {
    --brand: var(--brand-ergotek);
    --brand-dark: var(--brand-ergotek-dark);
  }

  [data-brand="abraform"] {
    --brand: var(--brand-abraform);
    --brand-dark: var(--brand-abraform-dark);
  }
  ```

### Этап 6: Утилиты и хелперы
- [ ] `/src/utils/abrasiveFilters.ts` — фильтрация абразивов по зернистости, серии
- [ ] `/src/utils/brandUtils.ts` — getBrandFromPath(), brand-specific конфиг
- [ ] `/src/constants/abraCategories.ts` — категории и серии абразивов

### Этап 7: Компоненты для абразивов
- [ ] `/src/components/AbrasiveCard.tsx` — карточка абразивного продукта
- [ ] `/src/components/AbrasiveSelector.tsx` — подбор абразива по задаче
- [ ] `/src/components/abraform/Hero.tsx` — hero-секция для Abraform
- [ ] `/src/components/abraform/Features.tsx` — преимущества абразивов

## 🎨 Дизайн-система

### Цветовая схема
- **Ergotek:** синий (#2563EB), градиенты от blue-600 до indigo-600
- **Abraform:** оранжевый (#ea580c), градиенты от orange-500 до red-600

### Компоненты-плейсхолдеры
- Логотип Ergotek: `bg-gradient-to-br from-blue-600 to-indigo-600`
- Логотип Abraform: `bg-gradient-to-br from-orange-500 to-red-600`

## 🧪 Тестирование и проверка

### Чек-лист перед коммитом
- [ ] `npm run build` — проект собирается без ошибок
- [ ] TypeScript без ошибок
- [ ] Все роуты работают корректно
- [ ] Навигация между брендами работает
- [ ] Формы отправляют правильного поставщика
- [ ] Responsive верстка на мобильных
- [ ] Проверить все ссылки (нет 404)

## 📝 Примечания

### Структура файлов (финальная)
```
src/
├── components/
│   ├── Header.tsx (brand-aware)
│   ├── Footer.tsx (brand-aware)
│   ├── ProductCard.tsx
│   ├── AbrasiveCard.tsx
│   ├── GlueSelector.tsx
│   ├── AbrasiveSelector.tsx
│   ├── ergotek/
│   │   ├── Hero.tsx
│   │   └── Features.tsx
│   └── abraform/
│       ├── Hero.tsx
│       └── Features.tsx
├── pages/
│   ├── BrandSelection.tsx
│   ├── NotFound.tsx
│   ├── ergotek/
│   │   ├── Home.tsx
│   │   ├── Catalog.tsx
│   │   ├── Applications.tsx
│   │   ├── Docs.tsx
│   │   └── Contacts.tsx
│   └── abraform/
│       ├── Home.tsx
│       ├── Catalog.tsx
│       ├── Applications.tsx
│       ├── Docs.tsx
│       └── Contacts.tsx
├── layouts/
│   ├── ErgoLayout.tsx
│   └── AbraLayout.tsx
├── contexts/
│   └── BrandContext.tsx
├── data/
│   ├── glues.json
│   └── abrasives.json
├── types/
│   ├── product.ts
│   └── abrasive.ts
└── utils/
    ├── productFilters.ts
    ├── abrasiveFilters.ts
    └── brandUtils.ts
```

### Ссылки на ресурсы Abraform
- HardLine FS: https://www.ergotek.ru/shlifovka-i-polirovka/shlifovalnye-shirokie-lenty/hardline-fs
- WoodLine FA: https://www.ergotek.ru/shlifovka-i-polirovka/shlifovalnye-shirokie-lenty/woodline-fa
- WoodLine XA: https://www.ergotek.ru/shlifovka-i-polirovka/shlifovalnye-shirokie-lenty/woodline-xa
- LacLine ES: https://www.ergotek.ru/shlifovka-i-polirovka/shlifovalnye-shirokie-lenty/lacline-es

## 🚀 Порядок выполнения (приоритет)

1. ✅ Создать BrandContext и утилиты
2. ✅ Создать Layout компоненты
3. ✅ Обновить App.tsx с новым роутингом
4. ✅ Переместить Ergotek страницы
5. ✅ Создать Abraform страницы
6. ✅ Обновить Header/Footer
7. ✅ Добавить brand-specific стили
8. ✅ Тестирование
9. ✅ Build и проверка
