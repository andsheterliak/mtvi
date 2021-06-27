import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(({ breakpoints }) => {
  return {
    list: {
      display: 'none',
      gridAutoFlow: 'column',
      gap: 4,

      [breakpoints.up('sm')]: {
        display: 'grid',
      },
    },

    link: {
      padding: '2px 12px 2px 12px',
    },
  };
});

const Links = ({ routes, locationPathname }) => {
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
          className={classes.link}
        >
          <ListItemText
            primaryTypographyProps={{ color: 'textPrimary', variant: 'body2' }}
            primary={name}
          />
        </ListItem>
      );
    }
  );

  return (
    <List className={classes.list} component="nav" aria-label="main navigation">
      {links}
    </List>
  );
};

export default Links;
