import NativeSlider, { useNativeSlider } from './NativeSlider';

const Slider = ({ children, padding }) => {
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

export default Slider;
