import { useRef } from 'react';

import { focusContainer } from '~common/utils/dom';

const useFocusContainer = () => {
  const containerRef = useRef();

  const focus = () => {
    focusContainer(containerRef.current);
  };

  const FocusableContainer = ({ children }) => {
    return <div ref={containerRef}>{children}</div>;
  };

  return {
    containerRef,
    focus,
    FocusableContainer,
  };
};

export default useFocusContainer;
