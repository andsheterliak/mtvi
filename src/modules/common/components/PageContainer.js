import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    overflow: 'hidden', // To fix grid margins.
  },
});

const PageContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      {children}
    </Container>
  );
};

export default PageContainer;
