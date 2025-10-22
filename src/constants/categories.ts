import type { ProductCategory } from '../types/product';

/**
 * Константы для категорий продуктов
 */

// Категории для навигации и фильтров
const buildCategoryPath = (category: ProductCategory) =>
  `/catalog?cat=${encodeURIComponent(category)}`;

export const PRODUCT_CATEGORIES = [
  { id: 'rods', name: 'Клеевые стержни' as ProductCategory, path: buildCategoryPath('Клеевые стержни') },
  { id: 'plywood', name: 'Клей для фанеры' as ProductCategory, path: buildCategoryPath('Клей для фанеры') },
  { id: 'insulation', name: 'Клеи-расплавы для изоляции' as ProductCategory, path: buildCategoryPath('Клеи-расплавы для изоляции') },
  { id: 'psa', name: 'Клеи-расплавы для самоклеящихся материалов' as ProductCategory, path: buildCategoryPath('Клеи-расплавы для самоклеящихся материалов') }
] as const;

// Материалы для формы подбора
export const MATERIALS = [
  { value: 'wood', label: 'Дерево / Фанера / Шпон' },
  { value: 'plastic', label: 'Пластик (PP/PE/PVC)' },
  { value: 'cardboard', label: 'Картон / Бумага' },
  { value: 'fabric', label: 'Ткань' },
  { value: 'cable', label: 'Кабели / Изоляция' },
  { value: 'other', label: 'Другое' }
] as const;

// Области применения для формы подбора
export const APPLICATIONS = [
  { value: 'furniture', label: 'Производство мебели' },
  { value: 'plywood', label: 'Производство фанеры' },
  { value: 'packaging', label: 'Упаковка' },
  { value: 'labels', label: 'Этикетки / Самоклейка' },
  { value: 'insulation', label: 'Изоляция кабелей' },
  { value: 'assembly', label: 'Сборка / Монтаж' }
] as const;

// Типы для экспорта
export type MaterialValue = typeof MATERIALS[number]['value'];
export type ApplicationValue = typeof APPLICATIONS[number]['value'];
