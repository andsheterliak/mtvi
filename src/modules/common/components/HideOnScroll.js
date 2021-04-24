import { string } from 'prop-types';
import { Slide, useScrollTrigger } from '@material-ui/core';

import types from '@common/types';

const HideOnScroll = ({ children, direction }) => {
  const isTriggered = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!isTriggered}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: types.containerChildren,
  direction: string,
};

export default HideOnScroll;
