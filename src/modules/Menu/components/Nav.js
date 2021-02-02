import { List } from '@material-ui/core';

const Nav = (props) => {
  return (
    <List {...props} component="nav">
      {props.children}
    </List>
  );
};

export default Nav;
