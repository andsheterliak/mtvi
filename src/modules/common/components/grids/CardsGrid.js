import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '20px',
    },
  },
}));

const CardsGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};

CardsGrid.propTypes = {
  children: types.containerChildren.isRequired,
};

export default CardsGrid;
