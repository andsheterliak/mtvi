import { useRef } from 'react';
import { focusContainer } from '~/utils';

export const useFocus = () => {
  const containerRef = useRef();

  const focus = () => {
    focusContainer(containerRef.current);
  };

  return { containerRef, focus };
};
