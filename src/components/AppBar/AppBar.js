import { Link } from 'react-router-dom';

import {
  AppBar as MuiAppBar,
  Toolbar,
  SvgIcon,
  IconButton,
  Link as MuiLink,
  Container,
  InputBase,
  InputAdornment,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import HideOnScroll from '../HideOnScroll';
import routes from '../../App/routes';
import Nav from './Nav';
import Links from './Links';
import useStyles from './AppBarStyles';

const AppBar = ({
  isSearchOpened,
  toggleSearchHandler,
  toggleDrawerHandler,
}) => {
  const classes = useStyles();

  const toolBarInner = (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawerHandler(true)}
      >
        <MenuIcon className={classes.icon} />
      </IconButton>

      <MuiLink
        to={routes.movies.to}
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

      <Nav className={classes.nav}>
        <Links dense className={classes.link} />
      </Nav>

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

  const search = (
    <>
      <InputBase
        placeholder="Search for a movie, tv show..."
        fullWidth
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />

      <IconButton
        edge="end"
        className={classes.searchButton}
        color="inherit"
        aria-label="close search"
        onClick={toggleSearchHandler}
      >
        <CloseIcon className={classes.icon} />
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
