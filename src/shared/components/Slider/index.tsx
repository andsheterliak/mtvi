import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { useSlider } from './useSlider';

type Padding = string;

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    userSelect: 'none',
    // To expand 'container' to set padding properly.
    display: 'grid',

    padding({ padding }: { padding: Padding }) {
      return padding;
    },
  },

  isTabbing: {
    scrollBehavior: 'smooth',
    scrollSnapType: 'both mandatory',
    scrollPadding: 'var(--scroll-padding, 0px)',

    // For each grid element.
    '& >:first-child > *': {
      scrollSnapAlign: 'center',
    },
  },
}));

type Props = {
  padding?: Padding;
  children: ReactNode;
  ariaLabelledby: string;
};

export const Slider = ({ children, padding = '10px 12px 20px', ariaLabelledby }: Props) => {
  const classes = useStyles({ padding });

  const { sliderRef, destroyMomentum, initSliderHandler, preventDragHandler } = useSlider({
    isTabbingClassName: classes.isTabbing,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      aria-labelledby={ariaLabelledby}
      ref={sliderRef}
      onMouseDown={initSliderHandler}
      onWheel={destroyMomentum}
      onDragStart={preventDragHandler}
      className={classes.slider}
    >
      {children}
    </div>
  );
};
