import { makeStyles } from '@material-ui/core/styles';
import { useEmblaCarousel } from 'embla-carousel/react';
import { useEffect } from 'react';

const useStyles = makeStyles({
  slider: {
    overflow: 'hidden',
    userSelect: 'none',

    padding({ padding }) {
      return padding;
    },
  },
});

export const Slider = ({ children, padding = '10px' }) => {
  const classes = useStyles({ padding });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    speed: 25,
  });

  const scrollHandler = () => {
    if (!emblaApi.clickAllowed()) {
      emblaApi.containerNode().style.pointerEvents = 'none';
    }

    emblaApi.off('scroll', scrollHandler);
  };

  emblaApi?.on('pointerDown', () => {
    emblaApi.on('scroll', scrollHandler);
  });

  emblaApi?.on('pointerUp', () => {
    emblaApi.off('scroll', scrollHandler);
    emblaApi.containerNode().style.pointerEvents = '';
  });

  useEffect(() => {
    return () => {
      emblaApi?.destroy();
    };
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className={classes.slider}>
      {children}
    </div>
  );
};
