import { Drawer as MUIDrawer, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Links from '../Links';

export { default as useDrawer } from './useDrawer';

const useStyles = makeStyles({
  drawer: {
    maxWidth: '250px',
    width: '80%',
  },

  list: {
    display: 'grid',
    gap: 4,
  },
});

const Drawer = ({ isOpened, closeDrawerHandler, routes, locationPathname }) => {
  const classes = useStyles();

  return (
    <MUIDrawer
      PaperProps={{ className: classes.drawer }}
      open={isOpened}
      onClose={closeDrawerHandler}
    >
      <List
        className={classes.list}
        component="nav"
        aria-label="main navigation"
        onClick={closeDrawerHandler}
        onKeyDown={closeDrawerHandler}
      >
        <Links
          routes={routes}
          locationPathname={locationPathname}
          listItemProps={{ className: classes.link }}
        />
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
