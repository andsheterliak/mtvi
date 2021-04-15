import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  items: {
    display: 'grid',
    gap: '15px',
    gridAutoFlow: 'column',
    gridAutoColumns: '180px',
  },
}));

const SliderItems = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};

export default SliderItems;
