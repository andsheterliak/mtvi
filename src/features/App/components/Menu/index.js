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
import Links from './Links';

const useStyles = makeStyles(({ breakpoints, zIndex, palette, spacing }) => ({
  backdrop: {
    zIndex: zIndex.appBar,
  },

  appBar: {
    backgroundColor: palette.background.paper,
  },

  inner: {
    [breakpoints.up('sm')]: {
      position: 'relative',
    },
  },

  openDrawerBtn: {
    marginRight: spacing(2),

    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  logo: {
    marginRight: 'auto',
  },

  searchIcon: {
    marginLeft: spacing(3),
  },
}));

const Menu = ({ locationPathname, routes }) => {
  const classes = useStyles();

  const { isDrawerOpened, closeDrawerHandler, openDrawerHandler } = useDrawer();
  const { isSearchVisible, toggleSearchHandler, closeSearchHandler } =
    useToggleSearch();

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={isSearchVisible}
        onClick={closeSearchHandler}
      />

      <HideOnScroll>
        <AppBar elevation={1} className={classes.appBar} position="sticky">
          <MainContainer>
            <div className={classes.inner}>
              <Toolbar className={classes.toolBar}>
                <IconBtn
                  rootProps={{ className: classes.openDrawerBtn }}
                  ariaLabel="open drawer"
                  clickHandler={openDrawerHandler}
                  edge="start"
                  icon={MenuOpenIcon}
                />

                <MUILink
                  className={classes.logo}
                  underline="none"
                  component={Link}
                  to={routes.default.redirectTo}
                >
                  <Logo />
                </MUILink>

                <Links locationPathname={locationPathname} routes={routes} />

                <IconBtn
                  rootProps={{ className: classes.searchIcon }}
                  ariaLabel="toggle search"
                  clickHandler={toggleSearchHandler}
                  edge="end"
                  icon={isSearchVisible ? CloseIcon : SearchIcon}
                />
              </Toolbar>

              <Search
                isSearchVisible={isSearchVisible}
                closeSearchHandler={closeSearchHandler}
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
