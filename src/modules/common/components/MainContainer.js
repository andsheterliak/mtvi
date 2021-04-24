import types from '@common/types';
import { Container } from '@material-ui/core';

const MainContainer = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

MainContainer.propTypes = {
  children: types.containerChildren,
};

export default MainContainer;
