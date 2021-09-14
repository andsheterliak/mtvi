import { useEffect } from 'react';
import { LAZY_IMG_CLASS_NAME } from '~/shared/constants';

const showImage = (image: HTMLImageElement) => {
  requestAnimationFrame(() => {
    if (image.complete) {
      image.style.opacity = '1';
    } else {
      showImage(image);
    }
  });
};

const intersectionHandler = (target: HTMLImageElement) => {
  const { src } = target.dataset;

  if (src) {
    target.src = src;
    showImage(target);
  } else {
    showImage(target);
  }
};

type Props = {
  isLoading: boolean;
  triggers?: unknown[];
};

export const useLazyImages = ({ isLoading, triggers = [] }: Props) => {
  useEffect(() => {
    if (isLoading) return undefined;

    const intObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !entry.isIntersecting &&
            typeof entry.isIntersecting !== 'undefined' // Some browsers did not implement 'isIntersecting' prop.
          ) {
            return;
          }

          intersectionHandler(entry.target as HTMLImageElement);
          intObserver.unobserve(entry.target);
        });
      },

      { rootMargin: '200px' }
    );

    document.querySelectorAll(`.${LAZY_IMG_CLASS_NAME}`).forEach((img) => {
      intObserver.observe(img);
    });

    return () => {
      intObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, ...triggers]);
};
