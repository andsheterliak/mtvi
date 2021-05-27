import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: '20px',
    alignItems: 'start',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '260px 1fr',
      gap: '40px',
    },
  },
}));

const PageGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};

export default PageGrid;
