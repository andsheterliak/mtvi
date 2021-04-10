import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',

      '& > :last-child': {
        marginTop: 'auto',
      },
    },
  };
});

const RootWrapper = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default RootWrapper;
