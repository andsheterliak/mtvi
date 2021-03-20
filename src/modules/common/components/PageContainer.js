import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RouteHeader from './RouteHeader';

const useStyles = makeStyles({
  container: {
    overflow: 'hidden', // To fix grid margins.
  },
});

const PageContainer = ({ titleName, children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <RouteHeader titleName={titleName} />

      {children}
    </Container>
  );
};

export default PageContainer;
