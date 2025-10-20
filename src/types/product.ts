/**
 * Типы для продуктов компании КлейВуд
 */

// Базовый интерфейс для всех продуктов
export interface BaseProduct {
  id: string;
  name: string;
  category: string;
  chemistry: string;
  applications: string[];
  features?: string[];
}

// Клеевые стержни
export interface GlueRod extends BaseProduct {
  category: 'Клеевые стержни';
  diameter: string;
  length: string;
  color: string;
  workingTemp: string;
}

// Клей-расплав на основе полиуретана
export interface PURHotMelt extends BaseProduct {
  category: 'Клей для фанеры';
  chemistry: 'PUR (полиуретановый реактивный)' | string;
  viscosity: string;
  applicationTemp: string;
  openTime: string;
}

// Клей-расплав на основе EVA
export interface EVAHotMelt extends BaseProduct {
  category: 'Клей для фанеры';
  chemistry: 'EVA' | string;
  viscosity: string;
  applicationTemp: string;
  workingTemp: string;
}

// Клей-расплав для изоляции
export interface InsulationHotMelt extends BaseProduct {
  category: 'Клеи-расплавы для изоляции';
  chemistry: 'APAO' | string;
  viscosity: string;
  applicationTemp: string;
  workingTemp: string;
  openTime: string;
}

// Клей для самоклеящихся материалов (PSA)
export interface PSAHotMelt extends BaseProduct {
  category: 'Клеи-расплавы для самоклеящихся материалов';
  chemistry: string;
  viscosity: string;
  applicationTemp: string;
  tackLevel?: string;
  openTime?: string;
}

// Union type для всех типов продуктов
export type Product = GlueRod | PURHotMelt | EVAHotMelt | InsulationHotMelt | PSAHotMelt;

// Type guard для проверки типа продукта
export function isGlueRod(product: Product): product is GlueRod {
  return product.category === 'Клеевые стержни';
}

export function isPURHotMelt(product: Product): product is PURHotMelt {
  return product.category === 'Клей для фанеры' && product.chemistry.includes('PUR');
}

export function isEVAHotMelt(product: Product): product is EVAHotMelt {
  return product.category === 'Клей для фанеры' && product.chemistry === 'EVA';
}

export function isInsulationHotMelt(product: Product): product is InsulationHotMelt {
  return product.category === 'Клеи-расплавы для изоляции';
}

export function isPSAHotMelt(product: Product): product is PSAHotMelt {
  return product.category === 'Клеи-расплавы для самоклеящихся материалов';
}

// Категории продуктов
export type ProductCategory =
  | 'Клеевые стержни'
  | 'Клей для фанеры'
  | 'Клеи-расплавы для изоляции'
  | 'Клеи-расплавы для самоклеящихся материалов';

// Интерфейс для категории с мета-данными
export interface CategoryInfo {
  id: string;
  name: ProductCategory | 'all';
  title: string;
  count: number;
  path?: string;
}
