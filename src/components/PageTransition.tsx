import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Запускаем анимацию при каждой смене маршрута
    setShouldAnimate(true);

    // Сбрасываем флаг после завершения анимации
    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 800); // Длительность анимации

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className={shouldAnimate ? 'page-transition fadeIn' : ''}
    >
      {children}
    </div>
  );
}
