import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles(() => ({
  slider: {
    overflow: 'auto',
    userSelect: 'none',
    // To expand 'container' to set 'cursor: pointer' correctly
    display: 'flex',
  },

  container: {
    cursor: 'pointer',
    padding: ' 0 10px 20px',
  },
}));

export const calcHowFar = (clientPosition, prevClientPosition) => {
  return clientPosition - prevClientPosition;
};

export const calcVelocity = (scroll, prevScroll) => {
  return scroll - prevScroll;
};

export const ifIsForward = (value) => Math.sign(value) === -1;

const Slider = ({ children, momentumDowngrade = 0.94, isMomentum = true }) => {
  const classes = useStyles();

  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const stateRef = useRef({
    momentumID: null,
    lastSwipeTime: null,
    isInteractionDisabled: false,
    startPositions: { scrollTop: 0, scrollLeft: 0, clientX: 0, clientY: 0 },
    momentum: { x: null, y: null },
    directions: { isXForward: null, isYForward: null },
  });

  const disableInteraction = ({ howFarX, howFarY }) => {
    const state = stateRef.current;

    if (state.isInteractionDisabled) return;
    if (howFarX === 0 && howFarY === 0) return;

    sliderInnerRef.current.style.pointerEvents = 'none';
    state.isInteractionDisabled = true;
  };

  const enableInteraction = () => {
    const state = stateRef.current;

    if (state.isInteractionDisabled) {
      sliderInnerRef.current.style.pointerEvents = '';
      state.isInteractionDisabled = false;
    }
  };

  const destroyMomentum = () => {
    const state = stateRef.current;

    cancelAnimationFrame(state.momentumID);
  };

  const getEdgeInfo = ({ isHorizontal }) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const isForward = isHorizontal
      ? state.directions.isXForward
      : state.directions.isYForward;

    const edges = { isStart: null, isEnd: null };

    const values = isHorizontal
      ? {
          scrollStart: slider.scrollLeft,
          scrollSize: slider.scrollWidth,
          clientSize: slider.clientWidth,
        }
      : {
          scrollStart: slider.scrollTop,
          scrollSize: slider.scrollHeight,
          clientSize: slider.clientHeight,
        };

    edges.isStart = values.scrollStart === 0;
    edges.isEnd = values.scrollStart + values.clientSize === values.scrollSize;

    const isEdge = (edges.isStart && !isForward) || (edges.isEnd && isForward);
    const isScrollable = !(edges.isStart && edges.isEnd);

    return { edges, isEdge, isScrollable };
  };

  const runMomentum = () => {
    const slider = sliderRef.current;
    const state = stateRef.current;

    const tickScrollX = state.momentum.x;
    const tickScrollY = state.momentum.y;

    slider.scrollLeft += tickScrollX;
    slider.scrollTop += tickScrollY;

    state.momentum.x *= momentumDowngrade;
    state.momentum.y *= momentumDowngrade;

    const xEdgeInfo = getEdgeInfo({ isHorizontal: true });
    const yEdgeInfo = getEdgeInfo({ isHorizontal: false });

    const isXLimit = Math.abs(tickScrollX) < 2;
    const isYLimit = Math.abs(tickScrollY) < 2;

    const isEdge = xEdgeInfo.isEdge && yEdgeInfo.isEdge;

    if (isEdge || (isXLimit && isYLimit)) return;
    state.momentumID = requestAnimationFrame(runMomentum);
  };

  const initMomentum = () => {
    const state = stateRef.current;

    const TIME_PASSED_THRESHOLD = 1;
    const timePassedFromLastSwipe = Date.now() - state.lastSwipeTime;

    if (timePassedFromLastSwipe > TIME_PASSED_THRESHOLD) return;
    runMomentum();
  };

  const setMomentumData = ({
    prevScrollLeft,
    prevScrollTop,
    isXForward,
    isYForward,
  }) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const velocityX = calcVelocity(slider.scrollLeft, prevScrollLeft);
    const velocityY = calcVelocity(slider.scrollTop, prevScrollTop);

    state.directions.isXForward = isXForward;
    state.directions.isYForward = isYForward;

    state.momentum.x = velocityX;
    state.momentum.y = velocityY;

    state.lastSwipeTime = Date.now();
  };

  const moveSliderHandler = (event) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const howFarX = calcHowFar(event.clientX, state.startPositions.clientX);
    const howFarY = calcHowFar(event.clientY, state.startPositions.clientY);

    const isXForward = ifIsForward(howFarX);
    const isYForward = ifIsForward(howFarY);

    const prevScrollLeft = slider.scrollLeft;
    const prevScrollTop = slider.scrollTop;

    slider.scrollLeft = state.startPositions.scrollLeft - howFarX;
    slider.scrollTop = state.startPositions.scrollTop - howFarY;

    disableInteraction({ howFarX, howFarY });

    if (!isMomentum) return;

    setMomentumData({
      prevScrollLeft,
      prevScrollTop,
      isXForward,
      isYForward,
    });
  };

  const stopSliderHandler = () => {
    enableInteraction();
    if (isMomentum) initMomentum();

    document.removeEventListener('mousemove', moveSliderHandler);
    document.removeEventListener('mouseup', stopSliderHandler);
  };

  const initSliderHandler = (event) => {
    destroyMomentum();

    const state = stateRef.current;
    const slider = sliderRef.current;

    // Get the current scroll positions from start (top, left) of the slider element.
    state.startPositions.scrollLeft = slider.scrollLeft;
    state.startPositions.scrollTop = slider.scrollTop;
    // Get the current mouse (x, y) positions (relative to window edges).
    state.startPositions.clientX = event.clientX;
    state.startPositions.clientY = event.clientY;

    document.addEventListener('mousemove', moveSliderHandler);
    document.addEventListener('mouseup', stopSliderHandler);
  };

  const preventDragHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const slider = sliderRef.current;

    sliderInnerRef.current = slider.querySelector(
      ':scope >:first-child >:first-child'
    );

    return () => {
      destroyMomentum();
    };
  }, []);

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
