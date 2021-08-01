import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '20px',
    },
  },
}));

export const VideosGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
