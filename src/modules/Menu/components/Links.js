import { Link } from 'react-router-dom';

import { ListItem, ListItemText } from '@material-ui/core';

const Links = ({ location, routes, linkProps }) => {
  const links = [routes.movies, routes.tvShows, routes.people].map(
    ({ name, to }) => {
      return (
        <ListItem
          button
          selected={location.pathname === to}
          component={Link}
          to={to}
          key={name}
          dense={linkProps?.dense}
          className={linkProps?.classes}
        >
          <ListItemText
            primaryTypographyProps={{ color: 'textPrimary' }}
            primary={name}
          />
        </ListItem>
      );
    }
  );

  return links;
};

export default Links;
