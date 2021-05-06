import { Container } from '@material-ui/core';

import types from '~common/types';

const MainContainer = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

MainContainer.propTypes = {
  children: types.containerChildren,
};

export default MainContainer;
