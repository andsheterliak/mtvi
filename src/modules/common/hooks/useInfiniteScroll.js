import { useEffect, useRef } from 'react';

const useInfiniteScroll = (action, isLoadMore, isLoading, isMoreData) => {
  const infiniteScrollRef = useRef(null);

  useEffect(() => {
    if (!isLoadMore || isLoading || !isMoreData) return null;

    const intObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          action();
        }
      },
      { rootMargin: '300px' }
    );

    intObserver.observe(infiniteScrollRef.current);

    return () => {
      intObserver.disconnect();
    };
  }, [action, isLoadMore, isLoading, isMoreData]);

  return infiniteScrollRef;
};

export default useInfiniteScroll;
