import { makeStyles } from '@material-ui/core/styles';

import types from '@common/types';

const useStyles = makeStyles(() => {
  return {
    list: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  };
});

const InfoListContainer = ({ children }) => {
  const classes = useStyles();

  return <ul className={classes.list}>{children}</ul>;
};

InfoListContainer.propTypes = {
  children: types.containerChildren,
};

export default InfoListContainer;
