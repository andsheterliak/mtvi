import { Drawer as MuiDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './Nav';
import Links from './Links';

const useStyles = makeStyles({
  drawer: {
    maxWidth: '250px',
    width: '80%',
  },
});

const Drawer = ({ isDrawerOpened, toggleDrawerHandler }) => {
  const classes = useStyles();

  return (
    <MuiDrawer
      open={isDrawerOpened}
      onClose={toggleDrawerHandler(false)}
      PaperProps={{ className: classes.drawer }}
    >
      <Nav
        onClick={toggleDrawerHandler(false)}
        onKeyDown={toggleDrawerHandler(false)}
      >
        <Links />
      </Nav>
    </MuiDrawer>
  );
};

export default Drawer;
