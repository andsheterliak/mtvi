import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    spacing: {
      padding: `${theme.spacing(2)}px 0`,

      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(3)}px 0`,
      },
    },
  };
});

const Spacing = () => {
  const classes = useStyles();

  return <div className={classes.spacing}></div>;
};

export default Spacing;
