# 📝 Руководство по редактированию сайта КлейВуд

## 🔧 Открытие проекта в IDE

### В VS Code (или Cursor):
```bash
cd /Users/nikita/lessons/site
code .   # для VS Code
# или
cursor . # для Cursor
```

### В WebStorm/PhpStorm:
1. File → Open
2. Выберите папку `/Users/nikita/lessons/site`

---

## 📝 Основные файлы для редактирования

### 🎨 Дизайн и стили
- **`src/index.css`** — цветовая схема (строки 3-8)
  ```css
  :root {
    --brand: #2563EB;    /* измени цвет */
    --ink: #111827;
    --muted: #6B7280;
  }
  ```

### 🧩 Компоненты
- **`src/components/Header.tsx`** — шапка сайта, навигация
- **`src/components/Footer.tsx`** — футер
- **`src/components/Hero.tsx`** — главный экран
- **`src/components/GlueSelector.tsx`** — форма подбора клея

### 📄 Страницы
- **`src/pages/Home.tsx`** — главная страница
- **`src/pages/Catalog.tsx`** — каталог продукции
- **`src/pages/Contacts.tsx`** — контакты и форма

### 📦 Данные
- **`src/data/glues.json`** — продукты (клеи и стержни)

---

## 🚀 Рабочий процесс

### 1. Запуск dev-сервера (автообновление)
```bash
npm run dev
```
Сайт откроется на http://localhost:5173/
Все изменения применяются автоматически (Hot Module Replacement)

### 2. Редактирование
- Откройте нужный файл в IDE
- Внесите изменения
- Сохраните (Cmd+S / Ctrl+S)
- Браузер автоматически обновится!

### 3. Остановка сервера
```bash
Ctrl+C в терминале
```

---

## 💡 Примеры изменений

### Изменить цвет бренда
**Файл:** `src/index.css`
```css
:root {
  --brand: #059669;  /* зелёный вместо синего */
}
```

### Добавить продукт
**Файл:** `src/data/glues.json`
```json
{
  "id": "new-product",
  "name": "Новый клей",
  "category": "Клеевые стержни",
  "chemistry": "EVA",
  "workingTemp": "180-200°C",
  "applications": ["Упаковка"],
  "features": ["Быстрое схватывание"]
}
```

### Изменить текст на главной
**Файл:** `src/components/Hero.tsx`
```tsx
<h1 className="text-4xl...">
  Ваш новый заголовок
</h1>
```

### Обновить контакты
**Файл:** `src/pages/Contacts.tsx`
Найдите раздел с контактами (строка ~363):
```tsx
<ul className="mt-3 space-y-2 text-sm text-slate-700">
  <li>Тел.: +7 (123) 456-78-90</li>
  <li>Email: info@kleywood.ru</li>
  <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
  <li>Мессенджеры: Telegram / WhatsApp</li>
</ul>
```

---

## 🛠 Полезные команды

```bash
# Запуск с автообновлением
npm run dev

# Сборка для продакшена
npm run build

# Проверка сборки локально
npm run preview

# Установка новых пакетов
npm install package-name
```

---

## 📁 Структура для быстрого доступа

```
src/
├── components/     👈 Повторяющиеся элементы (Header, Footer, Hero)
├── pages/          👈 Отдельные страницы (Home, Catalog, Contacts)
├── data/           👈 Данные продуктов (glues.json)
├── index.css       👈 Стили и цвета
└── App.tsx         👈 Роутинг и навигация
```

---

## ⚡️ Горячие клавиши (VS Code)

- **Cmd+P** (Ctrl+P) — быстрый поиск файла
- **Cmd+Shift+F** (Ctrl+Shift+F) — поиск по всем файлам
- **Cmd+D** (Ctrl+D) — выделить следующее вхождение
- **Alt+Up/Down** — переместить строку
- **Cmd+/** (Ctrl+/) — закомментировать строку
- **Cmd+B** (Ctrl+B) — открыть/закрыть боковую панель

---

## 🎯 Частые задачи

### Добавить новую категорию продуктов
1. Откройте `src/data/glues.json`
2. Добавьте продукты с новой категорией
3. Фильтры в каталоге обновятся автоматически

### Изменить навигацию
1. Откройте `src/components/Header.tsx`
2. Отредактируйте ссылки в `<nav>`

### Добавить новую страницу
1. Создайте файл в `src/pages/NewPage.tsx`
2. Добавьте роут в `src/App.tsx`:
   ```tsx
   <Route path="/new" element={<NewPage />} />
   ```
3. Добавьте ссылку в Header

---

## 🐛 Решение проблем

### Не работают стили Tailwind
1. Проверьте `src/index.css` — должно быть `@import "tailwindcss";`
2. Перезапустите dev-сервер: `Ctrl+C` → `npm run dev`

### Ошибка TypeScript
1. Проверьте импорты (type imports должны быть с `type`)
2. Запустите `npm run build` для проверки

### Сайт не обновляется
1. Жёсткая перезагрузка: Cmd+Shift+R (Ctrl+Shift+R)
2. Перезапустите dev-сервер

---

## 📞 Контакты Claude

Если нужна помощь, просто напишите:
- "подними сайт" — запустить dev-сервер
- "положи сайт" — остановить dev-сервер
- "помоги с [задача]" — помощь с кодом

---

**Последнее обновление:** 17 октября 2025
**Путь к проекту:** `/Users/nikita/lessons/site`
