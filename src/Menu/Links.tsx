import { ListItem, ListItemText } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { linksConfig } from '~/routes';

type Props = {
  listItemProps?: unknown; // https://github.com/mui-org/material-ui/issues/14971
};

export const Links = ({ listItemProps }: Props) => {
  const { pathname } = useLocation();

  const links = [linksConfig.movies, linksConfig.tvShows, linksConfig.people].map(
    ({ name, to }) => {
      const isSelected = pathname === to;

      return (
        <ListItem
          button
          role="link"
          selected={isSelected}
          component={Link}
          to={to}
          key={name}
          aria-current={isSelected && 'date'}
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

  return <>{links}</>;
};
