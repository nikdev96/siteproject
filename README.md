# КлейВуд — Сайт поставщика клеевых материалов

**B2B платформа для поставки клеев-расплавов, клеевых стержней и материалов для промышленности**

## 🎯 О проекте

Многостраничный сайт компании КлейВуд, специализирующейся на поставках:
- Клеевых стержней (EVA, универсальные и специализированные)
- Клеев для производства фанеры (PU, EVA для ребросклеивания и склейки слоёв)
- Клеев-расплавов для изоляции кабелей (APAO)
- Клеев для самоклеящихся материалов (PSA, этикетки, ленты)

**Целевая аудитория:** B2B (производство мебели, фанеры, упаковки, кабельная промышленность)

**Поставщик продукции:** [Ergotek.ru](https://ergotek.ru/)

---

## 🛠 Технологический стек

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7.1.7
- **Routing:** React Router DOM v7.9.4
- **Styling:** Tailwind CSS v4.1.14 (с @tailwindcss/postcss)
- **Animations:** Framer Motion v12.23.24
- **UI Components:** @headlessui/react v2.2.9
- **Forms:** react-hook-form v7.65.0 + zod v4.1.12
- **Utilities:** clsx v2.1.1
- **Дизайн-токены:** CSS Custom Properties в :root
- **SEO:** Meta-теги, Open Graph, robots.txt, sitemap.xml

---

## 📁 Структура проекта

```
/Users/nikita/lessons/site/
├── public/
│   ├── robots.txt          # SEO: правила индексации
│   └── sitemap.xml         # SEO: карта сайта (5 страниц)
├── src/
│   ├── components/
│   │   ├── Header.tsx      # Общий хедер с навигацией
│   │   ├── Footer.tsx      # Общий футер
│   │   ├── Hero.tsx        # Hero-секция для главной
│   │   ├── ProductCard.tsx # Карточка продукта (старый компонент)
│   │   ├── DocCard.tsx     # Карточка документа
│   │   ├── GlueSelector.tsx # ✨ Форма подбора клея по материалу
│   │   └── FadeIn.tsx      # ✨ Компонент анимации scroll-reveal
│   ├── pages/
│   │   ├── Home.tsx        # Главная: Hero + Подбор клея + Каталог + Продукция
│   │   ├── Catalog.tsx     # ✨ Каталог с фильтрами по категориям (7 продуктов)
│   │   ├── Applications.tsx # По применению
│   │   ├── Docs.tsx        # Документы (с поиском)
│   │   ├── Contacts.tsx    # Контакты + форма КП
│   │   └── NotFound.tsx    # 404
│   ├── data/
│   │   ├── glues.json      # ✨ 7 продуктов с детальными характеристиками
│   │   └── abrasives.json  # Абразивы (не используется пока)
│   ├── App.tsx             # Роутинг + липкая кнопка "Запросить КП"
│   ├── main.tsx            # Entry point
│   └── index.css           # ✨ Tailwind v4 (@import) + дизайн-токены
├── index.html              # SEO: title, description, OG-теги
├── postcss.config.js       # PostCSS с @tailwindcss/postcss
├── package.json
└── README.md               # Этот файл
```

---

## ✨ Ключевые функции

### 1. **Интерактивная форма подбора клея** (GlueSelector.tsx)
   - Выбор материала: Дерево, Пластик, Картон, Кабели и др.
   - Выбор применения: Мебель, Фанера, Упаковка, Этикетки, Изоляция
   - Умная фильтрация продуктов по категориям и тегам
   - Отображение подходящих решений с характеристиками
   - Расположена на главной странице после Hero

### 2. **Каталог продукции с фильтрами** (Catalog.tsx)
   - 7 продуктов с полными характеристиками
   - Кнопки-фильтры по категориям:
     - Все продукты (7)
     - Клеевые стержни (2)
     - Клей для фанеры (2)
     - Клеи-расплавы для изоляции (1)
     - Клеи для самоклеящихся материалов (2)
   - Детальные карточки с:
     - Бейджем категории
     - Характеристиками (химия, температура, вязкость)
     - Тегами применения (до 3 шт.)
     - Кнопками "TDS" и "Запросить КП"

### 3. **Продукты (glues.json)**

| ID | Название | Категория | Химия | Применение |
|----|----------|-----------|-------|------------|
| eva-rods-universal | Клеевые стержни EVA универсальные | Клеевые стержни | EVA | Упаковка, DIY, Сборка мебели |
| eva-rods-furniture | Клеевые стержни для мебели (высокотемпературные) | Клеевые стержни | EVA | Кромкование, Корпусная мебель |
| pu-plywood-edging | PU клей-расплав для ребросклеивания фанеры | Клей для фанеры | PUR | Ребросклеивание шпона, Производство фанеры |
| eva-plywood-layup | EVA клей для склейки слоёв фанеры | Клей для фанеры | EVA | Склейка слоёв шпона, Мебельные щиты |
| apao-cable-insulation | APAO для изоляции кабелей | Клеи-расплавы для изоляции | APAO | Изоляция проводов, Герметизация |
| eva-psa-tapes | EVA клей для самоклеящихся материалов (PSA) | Клеи-расплавы для самоклеящихся материалов | EVA + смолы | Производство скотча, Этикетки |
| apao-psa-labels | APAO для производства этикеток и лент | Клеи-расплавы для самоклеящихся материалов | APAO | Этикетки, Двусторонние ленты |

### 4. **Роутинг**
   - `/` — Главная (Hero + Подбор клея + Каталог + Продукция + О компании)
   - `/catalog` — Каталог с фильтрами
   - `/applications` — По применению
   - `/docs` — Документы (TDS/SDS с поиском)
   - `/contacts` — Контакты + форма заявки
   - `*` — 404 страница

### 5. **Дизайн-токены и анимации** (src/index.css)
```css
:root {
  --brand: #2563EB;        /* синий акцент (отличие от Ergotek) */
  --ink: #111827;          /* основной текст */
  --muted: #6B7280;        /* вторичный текст */
  --bg: #FFFFFF;           /* фон */
  --radius: 12px;          /* радиус по умолчанию */
}

/* Анимации в стиле Linkify */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
  50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.3); }
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### 6. **Анимации в стиле Linkify** (22.10.2025)

**Вдохновение:** [linkify-io.vercel.app](https://linkify-io.vercel.app/)

**Добавленные анимации:**

1. **FadeIn компонент** (`src/components/FadeIn.tsx`)
   - Scroll-reveal эффекты с помощью framer-motion
   - Поддержка 4 направлений: up, down, left, right
   - Настраиваемые задержки для staggered-анимаций
   - `useInView` хук для оптимизации производительности

2. **Gradient текст заголовков**
   ```tsx
   className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
   ```

3. **Enhanced hover-эффекты**
   - Карточки продуктов: `whileHover={{ y: -10, scale: 1.02 }}`
   - Тени: `hover:shadow-xl`
   - Масштабирование: `hover:scale-105`
   - Плавные transitions (300ms)

4. **Staggered появление**
   - Карточки появляются последовательно с задержками
   - Плавный cubic-bezier easing: `[0.25, 0.4, 0.25, 1]`

**Применено на:**
- ✅ Catalog page: заголовки, фильтры, карточки продуктов
- ✅ Home page: все секции с градиентными заголовками
- ✅ About section: left/right directional animations

### 7. **SEO оптимизация**
- ✅ Title, description, keywords
- ✅ Open Graph теги (og:image, og:title, og:description)
- ✅ Twitter Card
- ✅ Theme color (#2563EB)
- ✅ robots.txt (Allow: /, Sitemap)
- ✅ sitemap.xml (5 страниц с priority)

### 8. **Липкая кнопка "Запросить КП"**
- Фиксирована в правом нижнем углу (fixed bottom-4 right-4)
- Видна на всех страницах
- Ведёт на /contacts#lead

---

## 🚀 Запуск проекта

### Установка зависимостей
```bash
npm install
```

### Разработка
```bash
npm run dev
```
Откроется на: **http://localhost:5173/**

### Production-сборка
```bash
npm run build
```

### Превью production-сборки
```bash
npm run preview
```

---

## 📝 Изменения для Tailwind v4

**Важно!** Проект использует Tailwind CSS v4, который имеет новый синтаксис:

### ❌ Старый способ (v3):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ✅ Новый способ (v4):
```css
@import "tailwindcss";
```

**Файл конфигурации:** `tailwind.config.js` был удалён (не нужен для v4).

**PostCSS:** Используется `@tailwindcss/postcss` вместо обычного `tailwindcss`:
```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

---

## 🎨 Где править дизайн

### Цветовая схема
**Файл:** `src/index.css` (строки 3-8)
```css
:root {
  --brand: #2563EB;    /* Измени на свой цвет */
  --ink: #111827;
  --muted: #6B7280;
  --bg: #FFFFFF;
  --radius: 12px;
}
```

### Компоненты
- **Header:** `src/components/Header.tsx`
- **Footer:** `src/components/Footer.tsx`
- **Hero:** `src/components/Hero.tsx`
- **Форма подбора:** `src/components/GlueSelector.tsx`

### Страницы
- **Главная:** `src/pages/Home.tsx`
- **Каталог:** `src/pages/Catalog.tsx`
- **Контакты:** `src/pages/Contacts.tsx`

### Продукты
**Файл:** `src/data/glues.json`

Структура продукта:
```json
{
  "id": "product-id",
  "name": "Название продукта",
  "category": "Категория",
  "chemistry": "EVA/PU/APAO",
  "workingTemp": "180-200°C",
  "applicationTemp": "160-180°C",
  "viscosity": "1200 мПа·с",
  "applications": ["Применение 1", "Применение 2"],
  "features": ["Преимущество 1", "Преимущество 2"]
}
```

---

## 📋 TODO (для дальнейшего развития)

- [ ] Добавить реальные изображения продуктов (заменить плейсхолдеры)
- [ ] Подключить backend для формы контактов
- [ ] Добавить реальную логику скачивания TDS/SDS
- [ ] Расширить базу продуктов (больше клеев и стержней)
- [ ] Добавить раздел "Новости" или "Статьи"
- [ ] Интеграция с CRM для заявок
- [ ] Многоязычность (EN версия сайта)
- [ ] Личный кабинет B2B клиента
- [ ] История заказов и повторные заказы

---

## ⚙️ Решённые проблемы

### 1. Tailwind CSS не применялся
**Проблема:** Использовался старый синтаксис v3 с новым Tailwind v4
**Решение:** Изменён `src/index.css`:
```css
/* Было */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Стало */
@import "tailwindcss";
```

### 2. PostCSS конфликт
**Проблема:** Старый плагин `tailwindcss` вместо `@tailwindcss/postcss`
**Решение:** Обновлён `postcss.config.js`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 3. TypeScript ошибка verbatimModuleSyntax
**Проблема:** `FormEvent` импортирован как значение
**Решение:** Добавлен `type` в импорт:
```ts
import { type FormEvent, useState } from 'react';
```

---

## 📦 Зависимости

### Dependencies
- `react` ^19.1.1
- `react-dom` ^19.1.1
- `react-router-dom` ^7.9.4
- `framer-motion` ^12.23.24 ✨ NEW
- `@headlessui/react` ^2.2.9
- `react-hook-form` ^7.65.0
- `zod` ^4.1.12
- `clsx` ^2.1.1

### DevDependencies
- `@tailwindcss/postcss` ^4.1.14
- `@types/react` ^19.1.16
- `@types/react-dom` ^19.1.9
- `@types/node` ^24.8.1 ✨ NEW
- `@vitejs/plugin-react` ^5.0.4
- `autoprefixer` ^10.4.21
- `tailwindcss` ^4.1.14
- `typescript` ~5.9.3
- `vite` ^7.1.7

---

## 📞 Контакты (заглушки)

- **Email:** sales@kleywood.ru
- **Телефон:** +7 (___) ___-__-__
- **Адрес:** г. ____, ул. ________, д. __

*(Обновить контактную информацию в `src/pages/Contacts.tsx`)*

---

---

## 🎨 Обновления дизайна (18.10.2025)

### Улучшения вдохновлённые Rollis.su:

1. **Типографика:**
   - Подключён Google Font Inter (400, 500, 600, 700)
   - Обновлён font-family в index.css

2. **Hero-секция (Hero.tsx):**
   - Крупные заголовки: text-5xl → text-6xl на десктопе
   - 2 CTA-кнопки: "Открыть каталог" + "Связаться с нами"
   - Быстрая статистика: 7+ продуктов, 1-3 дня доставка, 24/7 поддержка
   - Плейсхолдер для фото продукта (800×800px) с инструкциями

3. **Блок преимуществ (Features.tsx):**
   - 4 иконки: Прямые поставки, Быстрая доставка, TDS/SDS, Техподдержка
   - Hover-анимации: scale + цвет фона
   - Размещён после Hero на главной

4. **Dropdown меню каталога (Header.tsx):**
   - Открывается на hover
   - 4 категории с количеством товаров
   - Анимированная стрелка (rotate 180°)
   - Ссылка "Все продукты →"

5. **Улучшенные карточки продуктов (ProductCard.tsx):**
   - Плейсхолдер для фото (400×300px) с иконкой и инструкциями
   - Hover: поднимается вверх + тень (hover:-translate-y-1 hover:shadow-xl)
   - Заголовок меняет цвет на brand
   - Точки списка светлеют
   - Улучшенные кнопки с transition

### Что заменить:
- [ ] Фото продуктов в Hero (800×800px, белый фон)
- [ ] Фото продуктов в карточках (400×300px)
- [ ] Детальные описания продуктов
- [ ] Контактные данные компании

---

## 💡 Принципы разработки (19.10.2025)

### ⚡ Правило: ВСЕГДА использовать готовые библиотеки

**Не изобретай велосипед!** Для типовых UI-задач используй проверенные библиотеки:

#### 🎯 Рекомендованные библиотеки:

**UI компоненты:**
- ✅ **@headlessui/react** — модальные окна, меню, табы (без стилей, максимальная кастомизация)
- ✅ **@radix-ui/react-*** — доступные UI примитивы (dropdown, dialog, accordion)
- ✅ **react-hot-toast** — уведомления/тосты
- ✅ **framer-motion** — анимации

**Формы и валидация:**
- ✅ **react-hook-form** — управление формами (производительность!)
- ✅ **zod** — схемы валидации с TypeScript
- ✅ **yup** — альтернатива zod

**Утилиты:**
- ✅ **clsx** или **classnames** — условные CSS классы
- ✅ **date-fns** — работа с датами (легче moment.js)
- ✅ **react-use** — готовые React хуки

**Таблицы и списки:**
- ✅ **@tanstack/react-table** — мощные таблицы
- ✅ **react-virtualized** — виртуализация длинных списков

#### ❌ НЕ делай вручную:

- ❌ Модальные окна (используй `@headlessui/react` Dialog)
- ❌ Dropdown меню (используй `@headlessui/react` Menu)
- ❌ Табы (используй `@headlessui/react` Tab)
- ❌ Тосты/уведомления (используй `react-hot-toast`)
- ❌ Сложные формы (используй `react-hook-form`)
- ❌ Валидацию форм (используй `zod`)

#### ✅ Примеры использования:

**До (самописное мобильное меню):**
```tsx
// ❌ 80+ строк кода, проблемы с accessibility, баги на мобильных
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
{mobileMenuOpen && <div className="fixed...">...</div>}
```

**После (с @headlessui/react):**
```tsx
// ✅ 10 строк, accessibility из коробки, работает везде
import { Dialog, DialogPanel } from '@headlessui/react';

<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
  <DialogPanel>...</DialogPanel>
</Dialog>
```

#### 📦 Установленные библиотеки:

```json
{
  "dependencies": {
    "@headlessui/react": "^2.2.9",  // ✅ Модальные окна, меню (19.10.2025)
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.4"
  }
}
```

### 🎓 Урок:

> Если задача кажется типовой (меню, модалки, формы, табы) — сначала загугли библиотеку, потом пиши код.
> Это сэкономит часы отладки и улучшит качество.

**Время на самописное меню:** 2 часа + баги
**Время с @headlessui/react:** 10 минут + 0 багов

---

## 🎉 Обновления (20.10.2025)

### Структура сайта упрощена
- ❌ Убрана двухбрендовая структура (Ergotek/Abraform как отдельные сайты)
- ✅ Единый сайт КлейВуд с разделом "Абразивы"
- ✅ Плоская маршрутизация без вложенности

### Добавлен раздел "Абразивы" (Abraform)
**Новая страница:** `/abrasives`
- 6 продуктов: HardLine FS (P80, P120), WoodLine FA (P100), WoodLine XA (P150), LacLine ES (P180, P240 stearat+)
- Фильтрация по сериям
- Оранжевая цветовая схема (отличается от синей темы клеев)
- Данные в `src/data/abrasives.json`
- Типы в `src/types/abrasive.ts`

### Улучшения UX/UI

**1. Навигация:**
- Кнопка "Каталог" → "Каталог клеев" (для различия с абразивами)
- Добавлена ссылка "Абразивы" в Header и Footer
- Dropdown меню каталога: плавная анимация появления/исчезновения (300мс)
- Задержка 1 секунда перед закрытием меню (случайно увели курсор — меню остаётся)

**2. Адаптивная кнопка "Запросить КП":**
- 🔵 Синяя на страницах клеев
- 🟠 Оранжевая на странице абразивов (`/abrasives`)
- Меняется автоматически через `useLocation()` в Header.tsx

**3. Анимации:**
- Плавные переходы между страницами (выезжание снизу, 0.8с, cubic-bezier)
- Мобильное меню выезжает снизу с transition (300мс)
- Backdrop с плавным появлением/исчезновением
- Компонент PageTransition.tsx для управления анимациями страниц

**4. Мобильная версия:**
- Плавное открытие/закрытие меню через Headless UI Transition
- Анимированный бургер-иконка (превращается в X)
- Полноэкранное меню с прокруткой

### Технические улучшения

**Файловая структура:**
```
src/
├── components/
│   ├── PageTransition.tsx  # NEW: Управление анимациями страниц
│   └── Header.tsx          # Updated: Адаптивная кнопка КП + плавное меню
├── pages/
│   └── Abrasives.tsx       # NEW: Страница абразивов
├── data/
│   └── abrasives.json      # NEW: 6 продуктов Abraform
├── types/
│   └── abrasive.ts         # NEW: TypeScript типы для абразивов
└── layouts/
    └── Layout.tsx          # Updated: Обёртка с PageTransition
```

**Исправления:**
- TypeScript: `NodeJS.Timeout` → `number` для setTimeout
- Headless UI: Добавлены `Transition` и `TransitionChild` для плавных анимаций
- CSS: Новые keyframes для анимации страниц (fadeSlideIn)

### Деплой
- ✅ Проект задеплоен на **Cloudflare Pages**
- Билд успешный: 961ms, 338 KB (103 KB gzip)
- Доступен для просмотра партнёрами

---

## 🎬 Обновления анимаций (22.10.2025)

### Linkify-style анимации

**Что добавлено:**

1. **Framer Motion v12.23.24**
   - Установлена библиотека для профессиональных анимаций
   - Scroll-reveal эффекты
   - Hover анимации с физикой

2. **FadeIn компонент** (`src/components/FadeIn.tsx`)
   ```tsx
   <FadeIn delay={0.1} direction="up">
     <h1>Animated content</h1>
   </FadeIn>
   ```
   - Автоматическое появление при скролле
   - 4 направления: up, down, left, right
   - Настраиваемая задержка для staggered-эффекта
   - Использует `useInView` для оптимизации

3. **CSS анимации** (добавлены в `index.css`)
   - `@keyframes glow` - эффект свечения карточек
   - `@keyframes gradient-x` - анимация градиента текста
   - `@keyframes slide-up` - плавное появление снизу
   - `@keyframes pulse-subtle` - мягкая пульсация

4. **Примененные эффекты:**

   **Catalog page:**
   - Gradient заголовок с clip-path
   - FadeIn на кнопках-фильтрах с задержками
   - motion.div на карточках: `whileHover={{ y: -10, scale: 1.02 }}`
   - Enhanced hover: shadow-2xl + border-blue-300
   - Staggered appearance: `delay={0.1 + index * 0.05}`

   **Home page:**
   - Все заголовки секций с gradient
   - FadeIn-обертки для всех основных блоков
   - Directional animations: left/right для about section
   - Enhanced hover на всех карточках
   - Плавное масштабирование: `hover:scale-105`

### Производительность:

**Build результаты:**
```
dist/index-Bg-MaZJN.js    425.95 kB │ gzip: 136.85 kB
```

**Что оптимизировано:**
- Lazy loading страниц через React.lazy()
- Code splitting по роутам
- Framer Motion tree-shaking (используются только нужные компоненты)
- CSS animations для простых эффектов
- useInView с `once: true` для scroll-reveals

### Сравнение до/после:

| Метрика | До | После |
|---------|-----|-------|
| Main bundle | 311 KB | 426 KB |
| Main bundle (gzip) | 98 KB | 137 KB |
| Build time | 983ms | 1.26s |
| Dev server | 320ms | 120ms |
| Анимации | Базовые CSS | Linkify-style |

**Выводы:**
- ✅ Bundle увеличился на ~115 KB (39 KB gzipped) - приемлемо для Framer Motion
- ✅ Build чуть медленнее, но в пределах нормы
- ✅ Dev server стал быстрее после оптимизации
- ✅ UX значительно улучшен профессиональными анимациями

---

**Статус:** ✅ Проект готов к работе с профессиональными анимациями
**Последнее обновление:** 22 октября 2025
**Разработчик:** Claude (Anthropic) + Nikita
**Deploy:** Cloudflare Pages
