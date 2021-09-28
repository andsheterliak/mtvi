import { MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';

type ClientPosition = number;
type HowFarIsScrolled = number;
type ScrollPosition = number;
type IsForward = boolean;
type Momentum = number;

type State = {
  momentumID: number;
  lastSwipeTime: number;
  isInteractionDisabled: boolean;

  startPositions: {
    scrollTop: ScrollPosition;
    scrollLeft: ScrollPosition;
    clientX: ClientPosition;
    clientY: ClientPosition;
  };

  momentum: { x: Momentum; y: Momentum };
  directions: { isXForward: IsForward; isYForward: IsForward };
};

const calcHowFar = (clientPosition: ClientPosition, prevClientPosition: ClientPosition) => {
  return clientPosition - prevClientPosition;
};

const calcVelocity = (scroll: ScrollPosition, prevScroll: ScrollPosition) => {
  return scroll - prevScroll;
};

const ifIsForward = (value: number) => Math.sign(value) === -1;

type UseSliderProps = {
  momentumDowngrade?: number;
  isMomentum?: boolean;
};

export const useSlider = ({ momentumDowngrade = 0.9, isMomentum = true }: UseSliderProps = {}) => {
  const sliderRef = useRef<HTMLDivElement>(null!);
  const sliderInnerRef = useRef<HTMLDivElement>(null!);

  const stateRef = useRef<State>({
    momentumID: 0,
    lastSwipeTime: 0,
    isInteractionDisabled: false,

    startPositions: {
      scrollTop: 0,
      scrollLeft: 0,
      clientX: 0,
      clientY: 0,
    },

    momentum: { x: 0, y: 0 },
    directions: { isXForward: false, isYForward: false },
  });

  const disableInteraction = ({
    howFarX,
    howFarY,
  }: {
    howFarX: HowFarIsScrolled;
    howFarY: HowFarIsScrolled;
  }) => {
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

  const getEdgeInfo = ({ isHorizontal }: { isHorizontal: boolean }) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const isForward = isHorizontal ? state.directions.isXForward : state.directions.isYForward;
    const edges = { isStart: false, isEnd: false };

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
    edges.isEnd = values.scrollStart + values.clientSize >= values.scrollSize;

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

    const isXLimit = Math.abs(tickScrollX) < 1.5;
    const isYLimit = Math.abs(tickScrollY) < 1.5;

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
  }: {
    prevScrollLeft: ScrollPosition;
    prevScrollTop: ScrollPosition;
    isXForward: IsForward;
    isYForward: IsForward;
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

  const moveSliderHandler = (event: MouseEvent) => {
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

  const initSliderHandler = (event: ReactMouseEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    destroyMomentum();

    // Get the current scroll positions from start (top, left) of the slider element.
    state.startPositions.scrollLeft = slider.scrollLeft;
    state.startPositions.scrollTop = slider.scrollTop;

    // Get the current mouse (x, y) positions (relative to window edges).
    state.startPositions.clientX = event.clientX;
    state.startPositions.clientY = event.clientY;

    document.addEventListener('mousemove', moveSliderHandler);
    document.addEventListener('mouseup', stopSliderHandler);
  };

  const preventDragHandler = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const slider = sliderRef.current;

    sliderInnerRef.current = slider.querySelector(
      ':scope >:first-child >:first-child'
    ) as HTMLDivElement; // Grid element.

    return () => {
      destroyMomentum();
    };
  }, []);

  return {
    sliderRef,
    initSliderHandler,
    destroyMomentum,
    preventDragHandler,
  };
};
