import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gap: '20px',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '25px',
    },
  },
}));

const CreditsGrid = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.grid}>{children}</div>;
};

CreditsGrid.propTypes = {
  children: types.generic.gridItems.isRequired,
};

export default CreditsGrid;
