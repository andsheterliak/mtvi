import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { scrollToTop } from '~common/utils/dom';

const useScrollToTop = () => {
  const history = useHistory();

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
