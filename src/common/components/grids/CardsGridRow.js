import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  items: {
    display: 'grid',
    gap: '15px',
    gridAutoFlow: 'column',
    gridAutoColumns: '180px',
  },
}));

const CardsGridRow = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};

export default CardsGridRow;
