import { Link } from 'react-router-dom';

import { ListItem, ListItemText } from '@material-ui/core';

const Links = ({ location, routes, ...props }) => {
  const links = Object.values(routes).map(({ name, to }) => {
    if (to === '/') return null;

    return (
      <ListItem
        button
        selected={location.pathname === to}
        component={Link}
        to={to}
        key={name}
        {...props}
      >
        <ListItemText
          primaryTypographyProps={{ color: 'textPrimary' }}
          primary={name}
        />
      </ListItem>
    );
  });

  return links;
};

export default Links;
