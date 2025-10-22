import { type GlueProduct, type GlueCategoryInfo } from '../types/glue';

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
      name: category as GlueProduct['category'],
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
