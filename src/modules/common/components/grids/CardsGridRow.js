import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

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

CardsGridRow.propTypes = {
  children: types.containerChildren,
};

export default CardsGridRow;
