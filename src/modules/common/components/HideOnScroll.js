import { Slide, useScrollTrigger } from '@material-ui/core';

const HideOnScroll = ({ children, direction }) => {
  const isTriggered = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!isTriggered}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
