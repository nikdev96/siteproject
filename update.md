# 🔄 Промт для обновления проекта КлейВуд

## Контекст проекта

**КлейВуд** - React B2B сайт для продажи клеевых материалов и абразивов. Проект использует современный стек: React 19 + TypeScript + Vite + Tailwind CSS 4.x. Целевая аудитория - промышленные клиенты.

## Текущее состояние (20.10.2025)

### ✅ Что уже сделано:
- Базовая архитектура с компонентами и страницами
- Типизация для абразивов (`src/types/abrasive.ts`)
- Оптимизированный поиск с `useDebounce`
- Адаптивный дизайн с Tailwind CSS
- Документация (README, GUIDE)
- SEO оптимизация

### ❌ Критические проблемы для исправления:

1. **Отсутствие типизации для клеев** - `glues.json` не типизирован
2. **Проблемы доступности** - dropdown без keyboard navigation
3. **Неоптимальная производительность** - пересчеты в Catalog
4. **Отсутствие error boundaries** - нет обработки ошибок
5. **Слабая валидация форм** - только HTML5 валидация

## Команды для обновления

### 1. Создание типизации для клеев
```bash
# Создать файл типов
mkdir -p src/types
touch src/types/glue.ts

# Содержимое src/types/glue.ts:
```

```typescript
export interface GlueProduct {
  id: string;
  name: string;
  category: 'Клеевые стержни' | 'Клей для фанеры' | 'Клеи-расплавы для изоляции' | 'Клеи-расплавы для самоклеящихся материалов';
  chemistry: string;
  applications: string[];
  features?: string[];
  
  // Специфичные поля для разных типов
  diameter?: string;
  length?: string;
  color?: string;
  workingTemp?: string;
  applicationTemp?: string;
  viscosity?: string;
  openTime?: string;
  thermalStability?: string;
  tack?: string;
}

export type GlueCategory = GlueProduct['category'];

export interface GlueCategoryInfo {
  id: string;
  name: GlueCategory | 'all';
  title: string;
  count: number;
  path?: string;
}
```

### 2. Установка дополнительных зависимостей
```bash
# Для форм и валидации
npm install react-hook-form @hookform/resolvers zod

# Для UI компонентов
npm install @headlessui/react

# Для уведомлений
npm install react-hot-toast

# Для утилит
npm install clsx

# Для тестирования (опционально)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### 3. Создание Error Boundary
```bash
# Создать компонент
touch src/components/ErrorBoundary.tsx

# Содержимое:
```

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Что-то пошло не так
            </h1>
            <p className="text-slate-600 mb-4">
              Произошла ошибка при загрузке страницы
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 4. Оптимизация производительности
```bash
# Создать утилиты для фильтрации
mkdir -p src/utils
touch src/utils/filters.ts

# Содержимое src/utils/filters.ts:
```

```typescript
import { GlueProduct, GlueCategoryInfo } from '../types/glue';

export function calculateGlueCategories(products: GlueProduct[]): GlueCategoryInfo[] {
  const categories: GlueCategoryInfo[] = [
    { id: 'all', name: 'all', title: 'Все продукты', count: products.length }
  ];

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(categoryCounts).forEach(([category, count]) => {
    categories.push({
      id: category,
      name: category as any,
      title: category,
      count
    });
  });

  return categories;
}

export function filterGluesByCategory(products: GlueProduct[], category: string): GlueProduct[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function filterGluesByMaterial(products: GlueProduct[], material: string): GlueProduct[] {
  if (!material) return products;

  switch (material) {
    case 'wood':
      return products.filter(p =>
        p.category === 'Клей для фанеры' ||
        p.category === 'Клеевые стержни' ||
        p.applications.some(app => 
          app.toLowerCase().includes('дерев') || 
          app.toLowerCase().includes('фанер') || 
          app.toLowerCase().includes('мебел')
        )
      );
    case 'plastic':
      return products.filter(p =>
        p.applications.some(app => 
          app.toLowerCase().includes('pp') || 
          app.toLowerCase().includes('pe')
        ) ||
        p.features?.some(f => 
          f.toLowerCase().includes('pp') || 
          f.toLowerCase().includes('pe')
        )
      );
    case 'cardboard':
      return products.filter(p =>
        p.applications.some(app => 
          app.toLowerCase().includes('упаков') || 
          app.toLowerCase().includes('этикет')
        )
      );
    case 'cable':
      return products.filter(p =>
        p.category === 'Клеи-расплавы для изоляции'
      );
    default:
      return products;
  }
}
```

### 5. Улучшение доступности
```bash
# Обновить Header.tsx для keyboard navigation
# Добавить в Header.tsx:
```

```typescript
// Добавить в Header.tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Escape') {
    setCatalogOpen(false);
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setCatalogOpen(!catalogOpen);
  }
};

// Обновить div с dropdown:
<div
  className="relative"
  onMouseEnter={() => setCatalogOpen(true)}
  onMouseLeave={() => setCatalogOpen(false)}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="button"
  aria-expanded={catalogOpen}
  aria-haspopup="true"
>
```

### 6. Улучшение валидации форм
```bash
# Создать схему валидации
touch src/schemas/contactForm.ts

# Содержимое:
```

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email'),
  interest: z.string().optional(),
  comment: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### 7. Создание хуков для оптимизации
```bash
# Создать хук для продуктов
touch src/hooks/useGlues.ts

# Содержимое:
```

```typescript
import { useState, useMemo } from 'react';
import { GlueProduct } from '../types/glue';
import { calculateGlueCategories, filterGluesByCategory } from '../utils/filters';

export function useGlues(products: GlueProduct[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => 
    calculateGlueCategories(products), 
    [products]
  );

  const filteredProducts = useMemo(() => 
    filterGluesByCategory(products, selectedCategory),
    [products, selectedCategory]
  );

  return {
    categories,
    filteredProducts,
    selectedCategory,
    setSelectedCategory
  };
}
```

## Приоритеты обновления

### 🔴 Критично (сделать в первую очередь):
1. Создать типизацию для клеев
2. Добавить Error Boundary
3. Исправить keyboard navigation в dropdown
4. Оптимизировать производительность в Catalog

### 🟡 Важно (сделать в течение недели):
5. Улучшить валидацию форм
6. Добавить loading состояния
7. Создать переиспользуемые компоненты

### 🟢 Желательно (сделать в течение месяца):
8. Добавить тестирование
9. Улучшить SEO
10. Добавить мониторинг

## Команды для проверки

```bash
# Проверка типов
npx tsc --noEmit

# Проверка линтера
npm run lint

# Сборка проекта
npm run build

# Запуск dev сервера
npm run dev
```

## Полезные ссылки

- [React Hook Form](https://react-hook-form.com/)
- [Zod валидация](https://zod.dev/)
- [Headless UI](https://headlessui.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Последнее обновление:** 20 октября 2025  
**Версия проекта:** 1.0.0  
**Статус:** Готов к обновлению

---

## Обновления после последней версии (22.10.2025)

- **Критические улучшения:**
  - ✅ Ленивая загрузка всех страниц через `React.lazy`
  - ✅ Полная валидация форм с визуальной обратной связью
  - ✅ Мобильное меню с Headless UI и анимациями
  - ✅ Страница абразивов с фильтрацией по сериям
  - ✅ Layout система с `PageTransition`
  - ✅ Универсальные утилиты фильтрации продуктов

- **Техническая архитектура:**
  - ✅ Error Boundary обернул все приложение
  - ✅ Полная типизация: `Product`, `GlueProduct`, `Abrasive`
  - ✅ Оптимизация производительности с `useMemo`
  - ✅ Framer Motion анимации и переходы
  - ✅ Константы категорий для переиспользования

- **Финальная оценка: 9.5/10** (значительное улучшение!)

### Критические проблемы (P0)

- ⚠️ **react-router-dom в devDependencies** — должен быть в dependencies
- ⚠️ **Неиспользуемые зависимости** — react-hook-form, zod можно удалить
- ⚠️ **Отсутствуют CSS анимации** — нужно добавить keyframes для dropdown

---

## План исправлений (Q4 2025)

### P0 — Критично (исправить немедленно)
- [ ] **Зависимости**: Переместить `react-router-dom` в dependencies
- [ ] **Очистка**: Удалить неиспользуемые `react-hook-form`, `zod`
- [ ] **CSS анимации**: Добавить keyframes для dropdown анимаций

### P1 — Важно (на этой неделе)
- [ ] **Типы**: Унифицировать `Product` и `GlueProduct` интерфейсы
- [ ] **Обработка ошибок**: Добавить fallback для lazy loading
- [ ] **SEO**: Добавить `react-helmet-async` для мета-тегов

### P2 — Желательно (в течение месяца)
- [ ] **Тестирование**: Unit тесты для компонентов и утилит
- [ ] **Мониторинг**: Добавить Sentry для отслеживания ошибок
- [ ] **Компоненты**: Создать переиспользуемые UI компоненты

---

## Команды для исправления критических проблем

### P0 - Исправить зависимости
```bash
# Переместить react-router-dom в dependencies
npm uninstall react-router-dom
npm install react-router-dom@^7.9.4

# Удалить неиспользуемые зависимости
npm uninstall react-hook-form zod

# Добавить CSS анимации
cat >> src/index.css << 'EOF'

/* Анимации для dropdown */
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeSlideOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}

.page-transition.fadeIn {
  animation: fadeIn 0.8s ease-out;
}
EOF
```

### P1 - Унификация типов
```bash
# Создать единый файл типов продуктов
cat > src/types/unified.ts << 'EOF'
export interface BaseProduct {
  id: string;
  name: string;
  category: string;
  chemistry: string;
  applications: string[];
  features?: string[];
}

export interface GlueProduct extends BaseProduct {
  category: 'Клеевые стержни' | 'Клей для фанеры' | 'Клеи-расплавы для изоляции' | 'Клеи-расплавы для самоклеящихся материалов';
  diameter?: string;
  length?: string;
  color?: string;
  workingTemp?: string;
  applicationTemp?: string;
  viscosity?: string;
  openTime?: string;
  thermalStability?: string;
  tack?: string;
}

export interface AbrasiveProduct extends BaseProduct {
  category: 'Широкие ленты';
  series: string;
  grain: string;
  backing: string;
  bondType: string;
  width?: string;
  length?: string;
  link?: string;
}

export type Product = GlueProduct | AbrasiveProduct;
EOF
```

---

## Критерии готовности релиза

- [ ] Все P0 задачи выполнены и покрыты ручной проверкой.
- [ ] README синхронизирован с `package.json` (версии и команды).
- [ ] Lighthouse Performance/A11y ≥ 90 на десктопе.
- [ ] Нет предупреждений TypeScript (`tsc --noEmit`).
- [ ] Нет ошибок ESLint (`npm run lint`).
- [ ] Все критические проблемы из код-ревью исправлены.

## Финальная оценка проекта

**Текущая оценка: 9.5/10** (значительное улучшение!)

| Категория | Оценка | Статус |
|-----------|--------|--------|
| Архитектура | 10/10 | ✅ Отличная структура + Layout |
| Производительность | 9/10 | ✅ Ленивая загрузка + useMemo |
| Доступность | 8/10 | ✅ ARIA + keyboard navigation |
| Типизация | 10/10 | ✅ Полная типизация всех компонентов |
| Формы | 10/10 | ✅ Валидация + состояния + UX |
| UX/UI | 9/10 | ✅ Framer Motion + мобильная версия |
| Документация | 10/10 | ✅ Превосходная |

## Статус проекта

**Готов к production** после исправления P0 проблем (зависимости + CSS анимации)

**Следующее обновление:** После исправления критических проблем

