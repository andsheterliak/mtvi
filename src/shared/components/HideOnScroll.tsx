import { Slide, SlideProps, useScrollTrigger } from '@material-ui/core';

export const HideOnScroll = ({ children, direction }: SlideProps) => {
  const isTriggered = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!isTriggered}>
      {children}
    </Slide>
  );
};
