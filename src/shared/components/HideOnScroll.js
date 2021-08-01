import { Slide, useScrollTrigger } from '@material-ui/core';

export const HideOnScroll = ({ children, direction }) => {
  const isTriggered = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!isTriggered}>
      {children}
    </Slide>
  );
};
