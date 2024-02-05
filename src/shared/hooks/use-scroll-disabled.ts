import { useEffect } from 'react';

export const useScrollDisabled = (active: boolean) => {
  useEffect(() => {
    if (active) {
      const root = document.getElementById('root')!;
      root.style.overflow = 'hidden';
    } else {
      const root = document.getElementById('root')!;
      root.style.overflow = 'initial';
    }
  }, [active]);
};
