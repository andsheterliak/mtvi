import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gap: '15px',
  },
}));

export const SeasonsGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
