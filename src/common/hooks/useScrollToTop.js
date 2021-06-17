import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { scrollToTop } from '~common/utils/dom';

const useScrollToTop = ({ triggers = [] } = {}) => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      scrollToTop();
    });

    return () => {
      unlisten();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...triggers]);
};

export default useScrollToTop;
