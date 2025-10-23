import { useCallback } from 'react';

/**
 * Хук для префетчинга lazy-loaded компонентов
 * Предзагружает страницы при hover на ссылки для моментальной навигации
 */
export function usePrefetch() {
  const prefetchPage = useCallback((page: string) => {
    switch (page) {
      case 'home':
        import('../pages/Home');
        break;
      case 'catalog':
        import('../pages/Catalog');
        break;
      case 'abrasives':
        import('../pages/Abrasives');
        break;
      case 'applications':
        import('../pages/Applications');
        break;
      case 'docs':
        import('../pages/Docs');
        break;
      case 'contacts':
        import('../pages/Contacts');
        break;
      default:
        break;
    }
  }, []);

  return { prefetchPage };
}
