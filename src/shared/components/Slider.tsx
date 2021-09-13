import { makeStyles } from '@material-ui/core/styles';
import { useEmblaCarousel } from 'embla-carousel/react';
import { ReactNode, useEffect } from 'react';
import { IsLoading } from '../types';

type Padding = string;

const useStyles = makeStyles({
  slider: {
    overflow: 'hidden',
    userSelect: 'none',

    padding({ padding }: { padding: Padding }) {
      return padding;
    },
  },
});

type Props = {
  isLoading: IsLoading;
  padding?: Padding;
  children: ReactNode;
};

export const Slider = ({ children, padding = '10px', isLoading }: Props) => {
  const classes = useStyles({ padding });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    speed: 25,
  });

  const scrollHandler = () => {
    if (!emblaApi) return;

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
    if (!isLoading) emblaApi?.reInit();
  }, [emblaApi, isLoading]);

  return (
    <div ref={emblaRef} className={classes.slider}>
      {children}
    </div>
  );
};
