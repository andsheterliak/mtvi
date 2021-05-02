import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { scrollToTop } from '~common/utils/dom';

const useScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // To scroll to top when the call stack is empty and browser is ready to paint.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTop();
      });
    });
  }, [pathname, search]);
};

export default useScrollToTop;
