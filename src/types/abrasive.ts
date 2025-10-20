/**
 * Типы для абразивных продуктов Abraform
 */

// Базовый интерфейс для абразивного продукта
export interface BaseAbrasive {
  id: string;
  name: string;
  category: string;
  brand: 'Abraform';
  description: string;
  applications: string[];
  features?: string[];
}

// Широкая лента (Wide Belt)
export interface WideBelt extends BaseAbrasive {
  category: 'Широкие ленты';
  series: 'HardLine FS' | 'WoodLine FA' | 'WoodLine XA' | 'LacLine ES' | 'LacLine ES stearat+';
  grain: string; // Зернистость (например, "P80", "P120", "P180")
  backing: string; // Основа (бумага, ткань)
  bondType: string; // Тип связки (клей)
  applications: string[];
  width?: string; // Ширина ленты
  length?: string; // Длина ленты
  link?: string; // Ссылка на страницу производителя
}

// Union type для всех типов абразивов
export type Abrasive = WideBelt;

// Type guard
export function isWideBelt(abrasive: Abrasive): abrasive is WideBelt {
  return abrasive.category === 'Широкие ленты';
}

// Категории абразивов
export type AbrasiveCategory = 'Широкие ленты';

// Интерфейс для категории с мета-данными
export interface AbrasiveCategoryInfo {
  id: string;
  name: AbrasiveCategory | 'all';
  title: string;
  count: number;
  path?: string;
}

// Серии продуктов
export type AbrasiveSeries =
  | 'HardLine FS'
  | 'WoodLine FA'
  | 'WoodLine XA'
  | 'LacLine ES'
  | 'LacLine ES stearat+';
