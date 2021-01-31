import { Link, useLocation } from 'react-router-dom';

import { ListItem, ListItemText } from '@material-ui/core';

import routes from '../../App/routes';

const Links = (props) => {
  const location = useLocation();

  const links = Object.values(routes).map(({ name, to }) => (
    <ListItem
      button
      selected={location.pathname === `/${to}`}
      component={Link}
      to={to}
      key={name}
      {...props}
    >
      <ListItemText primary={name} />
    </ListItem>
  ));

  return links;
};

export default Links;
