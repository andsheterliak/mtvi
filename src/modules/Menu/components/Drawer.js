import { Drawer as MuiDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  drawer: {
    maxWidth: '250px',
    width: '80%',
  },
});

const Drawer = ({ isDrawerOpened, toggleDrawerHandler, nav }) => {
  const classes = useStyles();

  return (
    <MuiDrawer
      open={isDrawerOpened}
      onClose={toggleDrawerHandler}
      PaperProps={{ className: classes.drawer }}
    >
      {nav}
    </MuiDrawer>
  );
};

export default Drawer;
