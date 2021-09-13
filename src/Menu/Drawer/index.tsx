import { Drawer as MUIDrawer, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Links } from '../Links';
import { DrawerEvent } from './drawer-types';

export { useDrawer } from './useDrawer';

const useStyles = makeStyles({
  drawer: {
    maxWidth: '250px',
    width: '80%',
  },

  list: {
    display: 'grid',
    gap: 4,
  },
});

type Props = {
  isOpened: boolean;
  closeDrawerHandler(event: DrawerEvent): void;
};

export const Drawer = ({ isOpened, closeDrawerHandler }: Props) => {
  const classes = useStyles();

  return (
    <MUIDrawer
      PaperProps={{ className: classes.drawer }}
      open={isOpened}
      onClose={closeDrawerHandler}
    >
      <List
        className={classes.list}
        component="nav"
        aria-label="main navigation"
        onClick={closeDrawerHandler}
        onKeyDown={closeDrawerHandler}
      >
        <Links />
      </List>
    </MUIDrawer>
  );
};
