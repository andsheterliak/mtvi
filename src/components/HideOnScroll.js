import { Slide, useScrollTrigger } from '@material-ui/core';

const HideOnScroll = (props) => {
  const { children, direction } = props;
  const isTriggered = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!isTriggered}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
