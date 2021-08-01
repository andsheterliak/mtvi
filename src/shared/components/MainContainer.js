import { Container } from '@material-ui/core';

export const MainContainer = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};
