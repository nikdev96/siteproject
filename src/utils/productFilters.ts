import type { Product } from '../types/product';
import type { MaterialValue, ApplicationValue } from '../constants/categories';

/**
 * Утилиты для фильтрации продуктов
 */

// Фильтрация по материалу
export const filterByMaterial = (products: Product[], material: MaterialValue | ''): Product[] => {
  if (!material) return products;

  const materialFilters: Record<MaterialValue, (p: Product) => boolean> = {
    wood: (p) =>
      p.category === 'Клей для фанеры' ||
      p.category === 'Клеевые стержни' ||
      p.applications.some(app => /дерев|фанер|мебел/i.test(app)),

    plastic: (p) =>
      p.applications.some(app => /pp|pe/i.test(app)) ||
      p.features?.some(f => /pp|pe/i.test(f)) ||
      false,

    cardboard: (p) =>
      p.applications.some(app => /упаков|этикет/i.test(app)),

    fabric: (p) =>
      p.applications.some(app => /ткан/i.test(app)),

    cable: (p) =>
      p.category === 'Клеи-расплавы для изоляции',

    other: () => true
  };

  const filter = materialFilters[material];
  return filter ? products.filter(filter) : products;
};

// Фильтрация по применению
export const filterByApplication = (products: Product[], application: ApplicationValue | ''): Product[] => {
  if (!application) return products;

  const applicationFilters: Record<ApplicationValue, (p: Product) => boolean> = {
    furniture: (p) =>
      p.applications.some(app => /мебел/i.test(app)),

    plywood: (p) =>
      p.category === 'Клей для фанеры',

    packaging: (p) =>
      p.applications.some(app => /упаков/i.test(app)),

    labels: (p) =>
      p.category === 'Клеи-расплавы для самоклеящихся материалов' ||
      p.applications.some(app => /этикет|лент/i.test(app)),

    insulation: (p) =>
      p.category === 'Клеи-расплавы для изоляции',

    assembly: (p) =>
      p.applications.some(app => /сборк|монтаж|DIY/i.test(app))
  };

  const filter = applicationFilters[application];
  return filter ? products.filter(filter) : products;
};

// Комбинированная фильтрация по материалу и применению
export const filterProducts = (
  products: Product[],
  material: MaterialValue | '',
  application: ApplicationValue | ''
): Product[] => {
  let filtered = products;

  if (material) {
    filtered = filterByMaterial(filtered, material);
  }

  if (application) {
    filtered = filterByApplication(filtered, application);
  }

  return filtered;
};

// Подсчёт количества продуктов в каждой категории
export const getCategoryCounts = (products: Product[]): Record<string, number> => {
  return products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Форматирование спецификаций продукта для отображения
 * Корректно обрабатывает отсутствующие температурные данные
 */
export const formatProductSpecs = (product: Product): string => {
  const parts: string[] = [`Химия: ${product.chemistry}`];

  if ('workingTemp' in product && product.workingTemp) {
    parts.push(`Рабочая t°: ${product.workingTemp}`);
  }
  if ('applicationTemp' in product && product.applicationTemp) {
    parts.push(`t° нанесения: ${product.applicationTemp}`);
  }

  return parts.join(' | ');
};
