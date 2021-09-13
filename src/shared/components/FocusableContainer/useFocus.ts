import { useRef } from 'react';

const focusContainer = (container: HTMLElement) => {
  container.setAttribute('tabindex', '0');
  container.focus();
  container.removeAttribute('tabindex');
};

export const useFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const focus = () => {
    if (!containerRef.current) throw Error('"containerRef" is not assigned!');
    focusContainer(containerRef.current);
  };

  return { containerRef, focus };
};
