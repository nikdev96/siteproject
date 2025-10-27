import { useCallback } from 'react';

/**
 * Хук для создания эффекта градиента, следующего за курсором
 * @returns объект с обработчиками событий мыши
 */
export function useCursorGradient() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    e.currentTarget.style.background = `radial-gradient(circle at ${x}% 50%, #4f46e5, #2563eb, #3b82f6)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'linear-gradient(90deg, #3b82f6, #2563eb, #4f46e5)';
  }, []);

  return { handleMouseMove, handleMouseLeave };
}
