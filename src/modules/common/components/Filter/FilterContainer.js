import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& > :not(:last-child)': {
      marginRight: '10px',
    },
  },
});

const FilterContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default FilterContainer;
