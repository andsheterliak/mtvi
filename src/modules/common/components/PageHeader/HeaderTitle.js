import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      textAlign: 'center',
      margin: `${theme.spacing(2)}px 0`,
      ...theme.typography.h5,

      [theme.breakpoints.up('sm')]: {
        ...theme.typography.h4,
      },

      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        ...theme.typography.h3,
      },
    },
  };
});

const HeaderTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography color="textPrimary" component="h1" className={classes.title}>
      {title}
    </Typography>
  );
};

export default HeaderTitle;
