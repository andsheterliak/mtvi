import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Links = ({ listItemProps, routes, locationPathname }) => {
  return [routes.movies, routes.tvShows, routes.people].map(({ name, to }) => {
    const isSelected = locationPathname === to;

    return (
      <ListItem
        button
        selected={isSelected}
        component={Link}
        to={to}
        key={name}
        {...listItemProps}
      >
        <ListItemText
          primaryTypographyProps={{
            color: isSelected ? 'inherit' : 'textSecondary',
            variant: 'body2',
          }}
          primary={name}
        />
      </ListItem>
    );
  });
};

export default Links;
