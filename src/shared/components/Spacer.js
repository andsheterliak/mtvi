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

export const Spacer = () => {
  const classes = useStyles();

  return <div className={classes.spacing}></div>;
};
