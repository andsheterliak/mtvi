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

const SliderItemsContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.items}>{children}</div>;
};

SliderItemsContainer.propTypes = {
  children: types.containerChildren,
};

export default SliderItemsContainer;
