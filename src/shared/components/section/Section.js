import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    section: {
      width: '100%',
    },
  };
});

export const Section = ({ children }) => {
  const classes = useStyles();

  return <section className={classes.section}>{children}</section>;
};
