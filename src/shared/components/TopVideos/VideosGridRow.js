import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  items: {
    display: 'grid',
    gap: '15px',
    gridAutoFlow: 'column',
    gridAutoColumns: '220px',

    [theme.breakpoints.up('sm')]: {
      gridAutoColumns: '320px',
    },

    [theme.breakpoints.up('md')]: {
      gridAutoColumns: '420px',
    },

    [theme.breakpoints.up('lg')]: {
      gridAutoColumns: '540px',
    },
  },
}));

export const VideosGridRow = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};
