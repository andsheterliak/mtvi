import { List } from '@material-ui/core';

const Nav = (props) => {
  return (
    <List {...props} component="nav" aria-label="Main Navigation">
      {props.children}
    </List>
  );
};

export default Nav;
