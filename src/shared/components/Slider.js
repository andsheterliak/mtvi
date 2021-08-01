import { NativeSlider, useNativeSlider } from './NativeSlider';

export const Slider = ({ children, padding }) => {
  const { sliderRef, destroyMomentum, initSliderHandler, preventDragHandler } =
    useNativeSlider();

  return (
    <NativeSlider
      padding={padding}
      sliderRef={sliderRef}
      destroyMomentum={destroyMomentum}
      initSliderHandler={initSliderHandler}
      preventDragHandler={preventDragHandler}
    >
      {children}
    </NativeSlider>
  );
};
