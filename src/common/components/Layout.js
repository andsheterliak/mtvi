import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

const useStyles = makeStyles((theme) => {
  return {
    layout: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gap: `${theme.spacing(4)}px`,
      alignItems: 'start',

      [theme.breakpoints.up('sm')]: {
        gap: `${theme.spacing(5)}px`,
      },
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.layout}>{children}</div>;
};

Layout.propTypes = {
  children: types.generic.anyChildren.isRequired,
};

export default Layout;
