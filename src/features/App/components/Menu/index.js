import {
  AppBar,
  Backdrop,
  IconButton,
  Link as MUILink,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import { Link } from 'react-router-dom';

import HideOnScroll from '~components/HideOnScroll';
import MainContainer from '~components/MainContainer';
import Logo from './Logo';
import Drawer, { useDrawer } from './Drawer';
import Search, { useToggleSearch } from '~features/Search';
import ToolbarLinks from './ToolbarLinks';

const useStyles = makeStyles(
  ({ breakpoints, extraBreakpoints, zIndex, palette, spacing }) => ({
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

      [breakpoints.up(extraBreakpoints.sx)]: {
        display: 'none',
      },
    },

    logo: {
      marginRight: 'auto',
    },

    icons: {
      marginLeft: spacing(5),
      display: 'grid',
      gridAutoFlow: 'column',
      gap: 12,
    },
  })
);

const Menu = ({
  locationPathname,
  routes,
  toggleThemeHandler,
  isDarkTheme,
}) => {
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
                <IconButton
                  className={classes.openDrawerBtn}
                  edge="start"
                  aria-label="open drawer"
                  onClick={openDrawerHandler}
                >
                  <MenuOpenIcon />
                </IconButton>

                <MUILink
                  className={classes.logo}
                  underline="none"
                  component={Link}
                  to={routes.default.redirectTo}
                >
                  <Logo />
                </MUILink>

                <ToolbarLinks
                  locationPathname={locationPathname}
                  routes={routes}
                />

                <div className={classes.icons}>
                  <IconButton
                    edge="end"
                    aria-label="toggle search"
                    onClick={toggleSearchHandler}
                  >
                    {isSearchVisible ? <CloseIcon /> : <SearchIcon />}
                  </IconButton>

                  <IconButton
                    edge="end"
                    aria-label="toggle theme"
                    onClick={toggleThemeHandler}
                  >
                    {isDarkTheme ? <WbSunnyIcon /> : <Brightness3Icon />}
                  </IconButton>
                </div>
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
