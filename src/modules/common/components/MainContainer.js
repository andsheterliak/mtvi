import { Container } from '@material-ui/core';

const MainContainer = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

export default MainContainer;
