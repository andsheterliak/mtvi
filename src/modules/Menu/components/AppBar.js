import { Link } from 'react-router-dom';

import {
  AppBar as MuiAppBar,
  Toolbar,
  SvgIcon,
  IconButton,
  Link as MuiLink,
  Container,
} from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';

import HideOnScroll from '../../common/components/HideOnScroll';
import useStyles from './AppBarStyles';

const AppBar = ({
  isSearchOpened,
  toggleSearchHandler,
  toggleDrawerHandler,
  routes,
  nav,
  search,
}) => {
  const classes = useStyles();

  const toolBarInner = (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawerHandler}
      >
        <MenuIcon className={classes.icon} />
      </IconButton>

      <MuiLink
        to={routes.default.redirectTo}
        color="inherit"
        underline="none"
        className={classes.logoLink}
        component={Link}
      >
        <SvgIcon className={`${classes.logoIcon}`}>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <path d="M7 2v20" />
          <path d="M17 2v20" />
          <path d="M2 12h20" />
          <path d="M2 7h5" />
          <path d="M2 17h5" />
          <path d="M17 17h5" />
          <path d="M17 7h5" />
        </SvgIcon>
      </MuiLink>

      {nav}

      <IconButton
        edge="end"
        className={classes.searchButton}
        color="inherit"
        aria-label="search"
        onClick={toggleSearchHandler}
      >
        <SearchIcon className={classes.icon} />
      </IconButton>
    </>
  );

  return (
    <>
      <HideOnScroll>
        <MuiAppBar position="sticky" color="inherit">
          <Container maxWidth="xl">
            <Toolbar variant="regular" className={classes.toolBar}>
              {isSearchOpened ? search : toolBarInner}
            </Toolbar>
          </Container>
        </MuiAppBar>
      </HideOnScroll>
    </>
  );
};

export default AppBar;
