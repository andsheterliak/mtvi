import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    section: {
      width: '100%',
    },
  };
});

const Section = ({ children }) => {
  const classes = useStyles();

  return <section className={classes.section}>{children}</section>;
};

export default Section;
