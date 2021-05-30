import { makeStyles } from '@material-ui/core/styles';

export { default as useSlider } from './useSlider';

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    userSelect: 'none',
  },

  container: {
    padding({ padding }) {
      return padding;
    },
  },
}));

const Slider = ({
  children,
  sliderRef,
  destroyMomentum,
  initSliderHandler,
  preventDragHandler,
  padding = '0 10px 20px',
}) => {
  const classes = useStyles({ padding });

  return (
    // This is a native scrollable element, so it doesn't need additional attributes I think?!.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
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

export default Slider;
