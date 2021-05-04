import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '5px',

    '& > :not(:last-child)': {
      marginRight: '10px',
    },
  },
});

const SelectorContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

SelectorContainer.propTypes = {
  children: types.containerChildren,
};

export default SelectorContainer;
