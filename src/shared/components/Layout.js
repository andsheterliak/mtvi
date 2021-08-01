import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    layout: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gap: `${theme.spacing(4)}px`,
      alignItems: 'start',

      [theme.breakpoints.up('sm')]: {
        gap: `${theme.spacing(5)}px`,
      },
    },
  };
});

export const Layout = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.layout}>{children}</div>;
};
