import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px',

    [theme.breakpoints.up('sm')]: {
      gap: '20px',
    },
  },
}));

const EpisodesGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};

export default EpisodesGrid;
