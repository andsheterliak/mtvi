import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, breakpoints }) => {
  return createStyles({
    spacing: {
      padding: `${spacing(2)}px 0`,

      [breakpoints.up('sm')]: {
        padding: `${spacing(3)}px 0`,
      },
    },
  });
});

export const Spacer = () => {
  const classes = useStyles();

  return <div className={classes.spacing}></div>;
};
