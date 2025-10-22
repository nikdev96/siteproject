import { useState, useMemo } from 'react';
import { type GlueProduct } from '../types/glue';
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
