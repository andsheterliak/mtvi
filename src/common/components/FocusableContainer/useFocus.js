import { useRef } from 'react';

import { focusContainer } from '~common/utils/dom';

const useFocus = () => {
  const containerRef = useRef();

  const focus = () => {
    focusContainer(containerRef.current);
  };

  return { containerRef, focus };
};

export default useFocus;
