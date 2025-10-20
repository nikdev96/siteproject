# Code Review — Проект КлейВуд

**Дата:** 18 октября 2025
**Проверено:** React 19 + TypeScript + Vite + Tailwind CSS 4

---

## 📊 Общая оценка

| Категория | Оценка | Комментарий |
|-----------|--------|-------------|
| **Архитектура** | 8/10 | Хорошая компонентная структура, но нужна типизация |
| **Производительность** | 6/10 | Неоптимальные вычисления в фильтрах |
| **Доступность (a11y)** | 5/10 | Отсутствуют ARIA-атрибуты, проблемы с клавиатурой |
| **Валидация** | 4/10 | Слабая валидация форм |
| **Код-стиль** | 7/10 | Консистентный, но есть дублирование |
| **SEO** | 9/10 | Отличная настройка meta-тегов |

**Общая оценка: 6.5/10**

---

## ✅ Что сделано хорошо

### 1. Компонентная архитектура
- ✅ Разделение на pages и components
- ✅ Функциональные компоненты с хуками
- ✅ Логичная структура каталогов

### 2. Дизайн и UX
- ✅ Современный дизайн с Tailwind CSS 4
- ✅ Адаптивная вёрстка
- ✅ Hover-эффекты и анимации
- ✅ Dropdown меню в Header
- ✅ Sticky CTA кнопка

### 3. SEO
- ✅ Meta-теги, Open Graph, Twitter Card
- ✅ robots.txt и sitemap.xml
- ✅ Семантическая разметка

### 4. Routing
- ✅ React Router v7
- ✅ 404 страница
- ✅ Hash-навигация для форм (#lead)

---

## 🚨 Критические проблемы

### 1. **Отсутствие TypeScript интерфейсов для JSON данных**

**Проблема:**
```tsx
// GlueSelector.tsx:8
const [results, setResults] = useState<typeof gluesData>([]);
```

**Почему плохо:**
- Нет типизации для Product
- TypeScript не может проверить поля продуктов
- Легко допустить опечатки в полях

**Решение:**
Создать `src/types/product.ts`:
```typescript
export interface BaseProduct {
  id: string;
  name: string;
  category: string;
  chemistry: string;
  applications: string[];
  features?: string[];
}

export interface GlueRod extends BaseProduct {
  diameter: string;
  length: string;
  color: string;
  workingTemp: string;
}

export interface HotMeltGlue extends BaseProduct {
  viscosity: string;
  applicationTemp: string;
  openTime?: string;
}

export type Product = GlueRod | HotMeltGlue;
```

---

### 2. **Неоптимальные вычисления фильтров**

**Проблема в Catalog.tsx (строки 9-14):**
```tsx
const categories = [
  { id: 'all', title: 'Все продукты', count: gluesData.length },
  { id: 'Клеевые стержни', title: 'Клеевые стержни', count: gluesData.filter(p => p.category === 'Клеевые стержни').length },
  // ... повторяется для каждой категории
];
```

**Почему плохо:**
- Фильтрация выполняется на каждом рендере
- `gluesData.filter()` вызывается 4 раза при каждом рендере
- Неэффективно для больших списков

**Решение:**
```tsx
import { useMemo } from 'react';

const categories = useMemo(() => {
  const categoryCounts = gluesData.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [
    { id: 'all', title: 'Все продукты', count: gluesData.length },
    { id: 'Клеевые стержни', title: 'Клеевые стержни', count: categoryCounts['Клеевые стержни'] || 0 },
    // ...
  ];
}, []);
```

---

### 3. **Повторяющийся код фильтрации в GlueSelector**

**Проблема (строки 29-80):**
```tsx
const handleSearch = () => {
  let filtered = gluesData;

  if (material === 'wood') {
    filtered = filtered.filter(p =>
      p.category === 'Клей для фанеры' ||
      p.category === 'Клеевые стержни' ||
      p.applications.some(app => app.toLowerCase().includes('дерев') || ...)
    );
  } else if (material === 'plastic') {
    // ... ещё 50 строк if-else
  }
  // ...
}
```

**Почему плохо:**
- Большая функция (50+ строк)
- Дублирование логики
- Сложно поддерживать и тестировать

**Решение:**
Создать `src/utils/productFilters.ts`:
```typescript
export const filterByMaterial = (products: Product[], material: string): Product[] => {
  const filters: Record<string, (p: Product) => boolean> = {
    wood: (p) => ['Клей для фанеры', 'Клеевые стержни'].includes(p.category),
    plastic: (p) => p.applications.some(app => /pp|pe/i.test(app)),
    cardboard: (p) => p.applications.some(app => /упаков|этикет/i.test(app)),
    cable: (p) => p.category === 'Клеи-расплавы для изоляции',
  };

  return material && filters[material] ? products.filter(filters[material]) : products;
};
```

---

## ⚠️ Важные улучшения

### 4. **Доступность (a11y)**

**Проблемы:**

1. **Dropdown меню** (Header.tsx:24-66):
   - Нет `aria-expanded`
   - Нет `role="menu"` и `role="menuitem"`
   - Нет поддержки Escape для закрытия

2. **Кнопки без aria-label**:
   ```tsx
   // Catalog.tsx:106
   <button className="...">TDS</button>
   ```

3. **Форма** (Contacts.tsx):
   - Нет `aria-describedby` для ошибок
   - Нет `aria-invalid` при невалидных полях

**Решение для Dropdown:**
```tsx
<div
  onMouseEnter={() => setCatalogOpen(true)}
  onMouseLeave={() => setCatalogOpen(false)}
  onKeyDown={(e) => e.key === 'Escape' && setCatalogOpen(false)}
>
  <button
    aria-expanded={catalogOpen}
    aria-haspopup="true"
    className="..."
  >
    Каталог
  </button>
  {catalogOpen && (
    <div role="menu" aria-label="Категории товаров">
      {categories.map((cat) => (
        <Link role="menuitem" key={cat.path} to={cat.path}>
          {cat.name}
        </Link>
      ))}
    </div>
  )}
</div>
```

---

### 5. **Валидация форм**

**Проблема в Contacts.tsx:**
```tsx
<input
  id="phone"
  type="tel"
  required
  // Нет паттерна, нет проверки формата!
/>
```

**Почему плохо:**
- Можно ввести "abc" вместо номера
- Нет проверки email формата
- Нет визуальной обратной связи при ошибках

**Решение:**
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  return phoneRegex.test(phone);
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newErrors: Record<string, string> = {};

  if (!validatePhone(formData.phone)) {
    newErrors.phone = 'Введите корректный номер телефона';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // Отправка формы
};

// В JSX:
<input
  id="phone"
  type="tel"
  pattern="(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}"
  aria-invalid={!!errors.phone}
  aria-describedby={errors.phone ? 'phone-error' : undefined}
/>
{errors.phone && (
  <p id="phone-error" className="text-red-600 text-xs mt-1">
    {errors.phone}
  </p>
)}
```

---

### 6. **Отсутствие обработки ошибок**

**Проблема:**
- Нет loading состояний для форм
- Нет обработки ошибок отправки
- Используется `alert()` вместо UI компонента

**Решение:**
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    // await sendToBackend(formData);
    // Показать success toast
  } catch (error) {
    setSubmitError('Произошла ошибка. Попробуйте позже.');
  } finally {
    setIsSubmitting(false);
  }
};

// В JSX:
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Отправка...' : 'Отправить'}
</button>
{submitError && (
  <div className="bg-red-50 text-red-700 p-3 rounded-lg">
    {submitError}
  </div>
)}
```

---

## 💡 Рекомендации по улучшению

### 7. **Создать константы**

**Проблема:**
Категории и фильтры дублируются в разных местах:
- `Header.tsx:8-12` — категории для dropdown
- `Catalog.tsx:8-14` — категории для фильтров
- `GlueSelector.tsx:11-27` — материалы и применения

**Решение:**
Создать `src/constants/categories.ts`:
```typescript
export const PRODUCT_CATEGORIES = [
  { id: 'rods', name: 'Клеевые стержни', path: '/catalog?cat=rods' },
  { id: 'plywood', name: 'Клей для фанеры', path: '/catalog?cat=plywood' },
  { id: 'insulation', name: 'Клеи для изоляции', path: '/catalog?cat=insulation' },
  { id: 'psa', name: 'Клеи для PSA', path: '/catalog?cat=psa' },
] as const;

export const MATERIALS = [
  { value: 'wood', label: 'Дерево / Фанера / Шпон' },
  { value: 'plastic', label: 'Пластик (PP/PE/PVC)' },
  { value: 'cardboard', label: 'Картон / Бумага' },
  { value: 'fabric', label: 'Ткань' },
  { value: 'cable', label: 'Кабели / Изоляция' },
  { value: 'other', label: 'Другое' },
] as const;
```

---

### 8. **Создать утилиты**

Создать `src/utils/` с:

1. **`productFilters.ts`** — логика фильтрации
2. **`validation.ts`** — валидация форм
3. **`formatters.ts`** — форматирование данных

**Пример `formatters.ts`:**
```typescript
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
```

---

### 9. **Мобильная навигация**

**Проблема:**
В Header.tsx есть класс `hidden md:flex`, но нет мобильного меню (бургер).

**Решение:**
Добавить состояние `mobileMenuOpen` и кнопку-бургер:
```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Бургер-кнопка
<button
  className="md:hidden"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Открыть меню"
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

// Мобильное меню
{mobileMenuOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-white border-t">
    <nav className="flex flex-col p-4">
      <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>
        Каталог
      </Link>
      {/* ... */}
    </nav>
  </div>
)}
```

---

### 10. **SEO улучшения**

**Добавить:**
1. **Schema.org markup** для продуктов
2. **JSON-LD** для организации
3. **Canonical URL** для страниц

**Пример schema.org:**
```tsx
// В ProductCard.tsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": specs.join(', '),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "RUB"
    }
  })}
</script>
```

---

## 📋 План приоритетных улучшений

### Фаза 1: Критические (1-2 дня)
1. ✅ Создать TypeScript интерфейсы (`src/types/product.ts`)
2. ✅ Оптимизировать фильтры в Catalog с `useMemo`
3. ✅ Извлечь логику фильтрации в утилиты
4. ✅ Создать константы для категорий и материалов

### Фаза 2: Важные (2-3 дня)
5. ✅ Добавить ARIA-атрибуты для доступности
6. ✅ Усилить валидацию форм с визуальной обратной связью
7. ✅ Добавить обработку ошибок и loading states
8. ✅ Создать мобильное меню с бургером

### Фаза 3: Желательные (3-5 дней)
9. ⏳ Добавить unit тесты с Vitest
10. ⏳ Настроить Schema.org и JSON-LD
11. ⏳ Добавить Toast уведомления (react-hot-toast)
12. ⏳ Настроить Storybook для компонентов

---

## 🔧 Технические долги

1. **Дублирование кода** — категории, фильтры, стили кнопок
2. **Отсутствие тестов** — нет ни одного теста
3. **Нет обработки состояний загрузки** — формы, данные
4. **Hardcoded значения** — URL, контакты, email
5. **Нет компонента Toast** — используется `alert()`
6. **Нет ErrorBoundary** — приложение может крашнуться
7. **Неоптимальные импорты** — дважды импортируется `Link` в App.tsx

---

## 📈 Метрики для отслеживания

После улучшений измерить:

1. **Performance:**
   - Lighthouse Score (стремиться к 90+)
   - First Contentful Paint (FCP)
   - Time to Interactive (TTI)

2. **Accessibility:**
   - WAVE тест (0 ошибок)
   - axe DevTools (0 критических проблем)
   - Keyboard navigation (все элементы доступны)

3. **SEO:**
   - Lighthouse SEO Score (95+)
   - Schema.org валидация
   - Sitemap актуальность

---

## 🎯 Итоговые рекомендации

### Начать с:
1. Создания TypeScript интерфейсов
2. Оптимизации фильтров с `useMemo`
3. Улучшения доступности (ARIA)
4. Усиления валидации форм

### Средний приоритет:
5. Мобильное меню
6. Обработка ошибок и loading
7. Извлечение констант и утилит

### Низкий приоритет:
8. Тесты
9. Schema.org
10. Storybook

---

**Автор:** Claude Code Review
**Статус:** Готов к улучшениям
**Следующий шаг:** Начать с Фазы 1
