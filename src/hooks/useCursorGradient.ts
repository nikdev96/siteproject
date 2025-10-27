import { useCallback } from 'react';

/**
 * Хук для создания эффекта градиента, следующего за курсором
 * @param variant - вариант цветовой схемы ('blue' или 'orange')
 * @returns объект с обработчиками событий мыши
 */
export function useCursorGradient(variant: 'blue' | 'orange' = 'blue') {
  const gradients = {
    blue: {
      radial: (x: number) => `radial-gradient(circle at ${x}% 50%, #4f46e5, #2563eb, #3b82f6)`,
      linear: 'linear-gradient(90deg, #3b82f6, #2563eb, #4f46e5)'
    },
    orange: {
      radial: (x: number) => `radial-gradient(circle at ${x}% 50%, #c2410c, #dc2626, #ea580c)`,
      linear: 'linear-gradient(90deg, #ea580c, #dc2626, #c2410c)'
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    e.currentTarget.style.background = gradients[variant].radial(x);
  }, [variant]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = gradients[variant].linear;
  }, [variant]);

  return { handleMouseMove, handleMouseLeave };
}
