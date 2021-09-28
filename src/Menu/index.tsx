import { AppBar, Backdrop, IconButton, Link as MUILink, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import CloseIcon from '@material-ui/icons/Close';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SearchIcon from '@material-ui/icons/Search';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { Link } from 'react-router-dom';
import { linksConfig } from '~/routes';
import { MainContainer } from '~/shared/components';
import { Drawer, useDrawer } from './Drawer';
import { Logo } from './Logo';
import { Search, useToggleSearch } from './Search';
import { ToolbarLinks } from './ToolbarLinks';

const useStyles = makeStyles(({ breakpoints, zIndex, palette, spacing }) => {
  return createStyles({
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

      [breakpoints.up(breakpoints.values.sl)]: {
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
  });
});

type Props = {
  toggleThemeHandler(): void;
  isDarkTheme: boolean;
};

export const Menu = ({ toggleThemeHandler, isDarkTheme }: Props) => {
  const classes = useStyles();
  const { isDrawerOpened, closeDrawerHandler, openDrawerHandler } = useDrawer();
  const { isSearchVisible, toggleSearchHandler, closeSearchHandler } = useToggleSearch();

  return (
    <>
      <Backdrop className={classes.backdrop} open={isSearchVisible} onClick={closeSearchHandler} />

      <AppBar elevation={1} className={classes.appBar} position="relative">
        <MainContainer>
          <div className={classes.inner}>
            <Toolbar>
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
                to={linksConfig.home.to}
              >
                <Logo />
              </MUILink>

              <ToolbarLinks />

              <div className={classes.icons}>
                <IconButton edge="end" aria-label="toggle search" onClick={toggleSearchHandler}>
                  {isSearchVisible ? <CloseIcon /> : <SearchIcon />}
                </IconButton>

                <IconButton edge="end" aria-label="toggle theme" onClick={toggleThemeHandler}>
                  {isDarkTheme ? <WbSunnyIcon /> : <Brightness3Icon />}
                </IconButton>
              </div>
            </Toolbar>

            <Search isSearchVisible={isSearchVisible} closeSearchHandler={closeSearchHandler} />
          </div>
        </MainContainer>
      </AppBar>

      <Drawer isOpened={isDrawerOpened} closeDrawerHandler={closeDrawerHandler} />
    </>
  );
};
