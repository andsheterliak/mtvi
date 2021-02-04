import { Container, Grid } from '@material-ui/core';

import RouteHeader from './RouteHeader';

const PageContainer = ({ routeName, children }) => {
  return (
    <Container maxWidth="xl">
      <RouteHeader routeName={routeName} />

      <Grid container spacing={4}>
        {children}
      </Grid>
    </Container>
  );
};

export default PageContainer;
