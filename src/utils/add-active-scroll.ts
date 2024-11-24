import { useEffect, RefObject } from 'react';

export function addActiveScroll<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  topOffset: number = 80,
  setIsScrolled: any
) {
  useEffect(() => {
    const element = ref?.current;
    const listener = () => {
      if (window.scrollY > topOffset) {
        element?.classList.add('is-scrolling');
        setIsScrolled(true);
      } else {
        element?.classList.remove('is-scrolling');
        setIsScrolled(false);
      }
    };
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, []);
}
