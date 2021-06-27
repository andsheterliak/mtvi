import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

  const links = [routes.movies, routes.tvShows, routes.people].map(
    ({ name, to }) => {
      return (
        <ListItem
          button
          selected={locationPathname === to}
          component={Link}
          to={to}
          key={name}
        >
          <ListItemText
            primaryTypographyProps={{ color: 'textPrimary' }}
            primary={name}
          />
        </ListItem>
      );
    }
  );

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
        {links}
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
