import { ReactNode, RefObject } from 'react';

export { useFocus } from './useFocus';

type Props = {
  children?: ReactNode;
  containerRef: RefObject<HTMLDivElement>;
};

export const FocusableContainer = ({ children, containerRef }: Props) => {
  return <div ref={containerRef}>{children}</div>;
};
