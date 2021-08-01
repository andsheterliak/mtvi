import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: '20px',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '25px',
    },
  },
}));

export const CreditsGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};
