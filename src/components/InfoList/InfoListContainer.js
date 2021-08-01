import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    list: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  };
});

export const InfoListContainer = ({ children }) => {
  const classes = useStyles();

  return <ul className={classes.list}>{children}</ul>;
};
