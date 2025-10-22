export interface GlueProduct {
  id: string;
  name: string;
  category: 'Клеевые стержни' | 'Клей для фанеры' | 'Клеи-расплавы для изоляции' | 'Клеи-расплавы для самоклеящихся материалов';
  chemistry: string;
  applications: string[];
  features?: string[];

  // Специфичные поля для разных типов клеев
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
