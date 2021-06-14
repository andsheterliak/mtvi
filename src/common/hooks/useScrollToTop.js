import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { scrollToTop } from '~common/utils/dom';

const useScrollToTop = ({ triggers = [] } = {}) => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // To scroll to top when the call stack is empty and browser is ready to paint.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToTop();
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search, ...triggers]);
};

export default useScrollToTop;
