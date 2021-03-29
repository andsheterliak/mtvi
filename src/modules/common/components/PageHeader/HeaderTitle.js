import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      textAlign: 'center',
      margin: `${theme.spacing(2)}px 0`,
      fontSize: theme.typography.pxToRem(20),

      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(25),
      },

      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        fontSize: theme.typography.pxToRem(35),
      },
    },
  };
});

const HeaderTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography component="h1" className={classes.title}>
      {title}
    </Typography>
  );
};

export default HeaderTitle;
