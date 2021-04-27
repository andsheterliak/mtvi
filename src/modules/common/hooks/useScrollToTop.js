import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { scrollToTop } from '~common/utils/dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
};

export default useScrollToTop;
