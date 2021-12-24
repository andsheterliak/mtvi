import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { scrollToTop } from '~/shared/utils';

export const useScrollToTop = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action !== 'POP') scrollToTop();
    });

    return () => {
      unlisten();
    };
  }, [history]);
};
