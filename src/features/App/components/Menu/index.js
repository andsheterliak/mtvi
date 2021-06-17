import { AppBar, Backdrop, Link as MUILink, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

import HideOnScroll from '~components/HideOnScroll';
import MainContainer from '~components/MainContainer';
import IconBtn from '~components/IconBtn';
import Logo from './Logo';
import Drawer, { useDrawer } from './Drawer';
import Search, { useToggleSearch } from '~features/Search';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.appBar,
  },

  appBar: {
    backgroundColor: theme.palette.background.paper,
  },

  inner: {
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
    },
  },

  toolBar: {
    '& >:first-child': {
      marginRight: theme.spacing(2),
    },

    '& >:last-child': {
      marginLeft: 'auto',
    },
  },
}));

const Menu = ({ locationPathname, routes }) => {
  const classes = useStyles();

  const { isDrawerOpened, closeDrawerHandler, openDrawerHandler } = useDrawer();
  const { isSearchVisible, toggleSearchHandler } = useToggleSearch();

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={isSearchVisible}
        onClick={toggleSearchHandler}
      />

      <HideOnScroll>
        <AppBar elevation={1} className={classes.appBar} position="sticky">
          <MainContainer>
            <div className={classes.inner}>
              <Toolbar className={classes.toolBar}>
                <IconBtn
                  ariaLabel="open drawer"
                  clickHandler={openDrawerHandler}
                  edge="start"
                  icon={MenuOpenIcon}
                />

                <MUILink
                  underline="none"
                  component={Link}
                  to={routes.default.redirectTo}
                >
                  <Logo />
                </MUILink>

                <IconBtn
                  ariaLabel="toggle search"
                  clickHandler={toggleSearchHandler}
                  edge="end"
                  icon={isSearchVisible ? CloseIcon : SearchIcon}
                />
              </Toolbar>

              <Search
                isSearchVisible={isSearchVisible}
                toggleSearchHandler={toggleSearchHandler}
              />
            </div>
          </MainContainer>
        </AppBar>
      </HideOnScroll>

      <Drawer
        locationPathname={locationPathname}
        routes={routes}
        isOpened={isDrawerOpened}
        closeDrawerHandler={closeDrawerHandler}
      />
    </>
  );
};

export default Menu;
