import { useCallback } from 'react';

/**
 * Хук для создания эффекта градиента, следующего за курсором
 * @returns объект с обработчиками событий мыши
 */
export function useCursorGradient() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    e.currentTarget.style.background = `radial-gradient(circle at ${x}% 50%, #818cf8, #60a5fa, #7dd3fc)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'linear-gradient(90deg, #7dd3fc, #60a5fa, #818cf8)';
  }, []);

  return { handleMouseMove, handleMouseLeave };
}
