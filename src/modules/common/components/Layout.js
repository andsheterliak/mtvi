import { makeStyles } from '@material-ui/core/styles';

import types from '@common/types';

const useStyles = makeStyles((theme) => {
  return {
    layout: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gap: `${theme.spacing(6)}px`,
      placeItems: 'start',
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.layout}>{children}</div>;
};

Layout.propTypes = {
  children: types.containerChildren,
};

export default Layout;
