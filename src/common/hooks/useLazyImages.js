import { useEffect } from 'react';

const useLazyImages = ({
  dataSetName = 'data-src',
  isLoading,
  triggers = [],
} = {}) => {
  useEffect(() => {
    if (isLoading) return null;

    const targets = document.querySelectorAll(`[${dataSetName}]`);

    const intersectionHandler = (target) => {
      const { src } = target.dataset;

      if (!src) return;
      target.src = src;

      requestAnimationFrame(() => {
        target.classList.add('is-visible');
      });
    };

    const intObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !entry.isIntersecting &&
            typeof entry.isIntersecting !== 'undefined' // Some browsers did not implement 'isIntersecting' prop.
          ) {
            return;
          }

          intersectionHandler(entry.target);
          intObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '200px' }
    );

    targets?.forEach((target) => {
      intObserver.observe(target);
    });

    return () => {
      intObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSetName, isLoading, ...triggers]);
};

export default useLazyImages;
