import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { scrollToTop } from '~common/utils/dom';

const useScrollToTop = ({ triggers = [] } = {}) => {
  const history = useHistory();

  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...triggers]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      scrollToTop();
    });

    return () => {
      unlisten();
    };
  }, [history]);
};

export default useScrollToTop;
