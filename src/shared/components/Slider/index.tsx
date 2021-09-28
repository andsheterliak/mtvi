import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { useSlider } from './useSlider';

type Padding = string;

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    userSelect: 'none',
    // To expand 'container' to set paddings properly.
    display: 'grid',
  },

  container: {
    padding({ padding }: { padding: Padding }) {
      return padding;
    },
  },
}));

type Props = {
  padding?: Padding;
  children: ReactNode;
  ariaLabelledby: string;
};

export const Slider = ({ children, padding = '10px 12px 20px', ariaLabelledby }: Props) => {
  const { sliderRef, destroyMomentum, initSliderHandler, preventDragHandler } = useSlider();
  const classes = useStyles({ padding });

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
      <div className={classes.container}>{children}</div>
    </div>
  );
};
