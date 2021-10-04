import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef } from 'react';

type ScrollPosition = number;
type IsForward = boolean;
type IsHorizontal = boolean;

type State = {
  momentumID: number;
  lastSwipeTime: number;
  isInteractionDisabled: boolean;

  initialPositions: {
    scrollStart: ScrollPosition;
    pointerPosition: number;
  };

  momentum: number;
  isForward: IsForward;
};

type UseSliderProps = {
  momentumDowngrade?: number;
  isMomentum?: boolean;
  isHorizontal?: IsHorizontal;
  isTabbingClassName: string;
};

export const useSlider = ({
  momentumDowngrade = 0.9,
  isMomentum = true,
  isHorizontal = true,
  isTabbingClassName,
}: UseSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null!);
  const containerWithElementsRef = useRef<HTMLDivElement>(null!);

  const stateRef = useRef<State>({
    momentumID: 0,
    lastSwipeTime: 0,
    isInteractionDisabled: false,

    initialPositions: {
      scrollStart: 0,
      pointerPosition: 0,
    },

    momentum: 0,
    isForward: false,
  });

  const disableInteraction = ({ howFar }: { howFar: number }) => {
    const state = stateRef.current;
    const containerWithElements = containerWithElementsRef.current;

    if (state.isInteractionDisabled || howFar === 0) return;

    containerWithElements.style.pointerEvents = 'none';
    state.isInteractionDisabled = true;
  };

  const enableInteraction = () => {
    const state = stateRef.current;
    const containerWithElements = containerWithElementsRef.current;

    if (state.isInteractionDisabled) {
      containerWithElements.style.pointerEvents = '';
      state.isInteractionDisabled = false;
    }
  };

  const destroyMomentum = () => {
    const state = stateRef.current;

    cancelAnimationFrame(state.momentumID);
  };

  const getEdgeInfo = ({ isHorizontal: isSliderHorizontal }: { isHorizontal: IsHorizontal }) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const edges = { isStart: false, isEnd: false };

    const values = isSliderHorizontal
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

    const isEdge = (edges.isStart && !state.isForward) || (edges.isEnd && state.isForward);
    const isScrollable = !(edges.isStart && edges.isEnd);

    return { isEdge, edges, isScrollable };
  };

  const runMomentum = () => {
    const slider = sliderRef.current;
    const state = stateRef.current;

    const tickScroll = state.momentum;

    slider[isHorizontal ? 'scrollLeft' : 'scrollTop'] += tickScroll;
    state.momentum *= momentumDowngrade;

    const edgeInfo = getEdgeInfo({ isHorizontal });
    const isLimit = Math.abs(tickScroll) < 1.5;

    if (edgeInfo.isEdge || isLimit) return;
    state.momentumID = requestAnimationFrame(runMomentum);
  };

  const initMomentum = () => {
    const state = stateRef.current;

    const TIME_PASSED_THRESHOLD = 25;
    const timePassedFromLastSwipe = Date.now() - state.lastSwipeTime;

    if (timePassedFromLastSwipe > TIME_PASSED_THRESHOLD) return;
    runMomentum();
  };

  const setMomentumData = ({
    prevScrollStart,
    isForward,
  }: {
    prevScrollStart: ScrollPosition;
    isForward: IsForward;
  }) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const scrollStart = isHorizontal ? slider.scrollLeft : slider.scrollTop;
    const momentum = scrollStart - prevScrollStart;

    state.momentum = momentum;
    state.lastSwipeTime = Date.now();
    state.isForward = isForward;
  };

  const moveSliderHandler = (event: MouseEvent) => {
    const state = stateRef.current;
    const slider = sliderRef.current;

    const pointerPosition = isHorizontal ? event.clientX : event.clientY;
    const howFar = pointerPosition - state.initialPositions.pointerPosition;
    const isForward = Math.sign(howFar) === -1;
    const prevScrollStart = isHorizontal ? slider.scrollLeft : slider.scrollTop;

    slider[isHorizontal ? 'scrollLeft' : 'scrollTop'] = state.initialPositions.scrollStart - howFar;

    disableInteraction({ howFar });

    if (isMomentum) setMomentumData({ prevScrollStart, isForward });
  };

  const stopSliderHandler = () => {
    enableInteraction();
    if (isMomentum) initMomentum();

    document.removeEventListener('mousemove', moveSliderHandler, false);
    document.removeEventListener('mouseup', stopSliderHandler, false);
  };

  const setInitialPositions = ({ event }: { event: ReactMouseEvent<HTMLDivElement> }) => {
    const slider = sliderRef.current;
    const state = stateRef.current;

    // Get the current scroll positions from start (top, left) of the slider element.
    state.initialPositions.scrollStart = isHorizontal ? slider.scrollLeft : slider.scrollTop;

    // Get the current mouse (x, y) positions relative to viewport (visible area).
    state.initialPositions.pointerPosition = isHorizontal ? event.clientX : event.clientY;
  };

  const initSliderHandler = (event: ReactMouseEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;

    destroyMomentum();

    if (slider.classList.contains(isTabbingClassName)) {
      slider.classList.remove(isTabbingClassName);
    }

    setInitialPositions({ event });

    document.addEventListener('mousemove', moveSliderHandler, false);
    document.addEventListener('mouseup', stopSliderHandler, false);
  };

  const preventDragHandler = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const tabbingHandler = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.code !== 'Tab' &&
        event.code !== 'ArrowDown' &&
        event.code !== 'ArrowUp' &&
        event.code !== 'ArrowLeft' &&
        event.code !== 'ArrowRight'
      ) {
        return;
      }

      const slider = sliderRef.current;

      if (slider.classList.contains(isTabbingClassName)) return;
      slider.classList.add(isTabbingClassName);
    },
    [isTabbingClassName]
  );

  useEffect(() => {
    const slider = sliderRef.current;

    containerWithElementsRef.current = slider.querySelector(
      ':scope >:first-child'
    ) as HTMLDivElement; // Grid element.

    document.addEventListener('keydown', tabbingHandler, false);

    const slide = containerWithElementsRef.current.firstElementChild as HTMLElement;

    const scrollPadding = isHorizontal
      ? `0 ${slide.offsetWidth}px 0 ${slide.offsetWidth}px`
      : `${slide.offsetHeight}px 0 ${slide.offsetHeight}px 0`;

    // Trigger 'Scroll Snap' if an element is not fully visible.
    slider.setAttribute('style', `--scroll-padding: ${scrollPadding}`);

    return () => {
      destroyMomentum();
      document.removeEventListener('keydown', tabbingHandler, false);
    };
  }, [isHorizontal, tabbingHandler]);

  return {
    sliderRef,
    initSliderHandler,
    destroyMomentum,
    preventDragHandler,
  };
};
