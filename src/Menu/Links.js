import { ListItem, ListItemText } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { routesConfig } from '~/routes';

export const Links = ({ listItemProps }) => {
  const { pathname } = useLocation();

  return [routesConfig.movies, routesConfig.tvShows, routesConfig.people].map(
    ({ name, to }) => {
      const isSelected = pathname === to;

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
    }
  );
};
