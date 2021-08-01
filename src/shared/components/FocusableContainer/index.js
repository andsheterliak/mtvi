export { useFocus } from './useFocus';

export const FocusableContainer = ({ children, containerRef }) => {
  return <div ref={containerRef}>{children}</div>;
};
