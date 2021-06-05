export { default as useFocus } from './useFocus';

const FocusableContainer = ({ children, containerRef }) => {
  return <div ref={containerRef}>{children}</div>;
};

export default FocusableContainer;
