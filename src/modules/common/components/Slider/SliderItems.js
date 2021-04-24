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

const SliderItems = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};

SliderItems.propTypes = {
  children: types.containerChildren,
};

export default SliderItems;
