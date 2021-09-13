import { Container, ContainerProps, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
  root: {
    maxWidth: '1400px',
  },
});

export const MainContainer = ({ children, className, ...restProps }: ContainerProps) => {
  const classes = useStyles();

  return (
    <Container className={classNames(classes.root, className)} {...restProps}>
      {children}
    </Container>
  );
};
