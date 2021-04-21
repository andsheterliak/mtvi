import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import routes from '@common/routes';

import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Links from './components/Links';
import Nav from './components/Nav';
import Search from './components/Search';
import useStyles from './components/AppBarStyles';

const Menu = () => {
  const location = useLocation();
  const classes = useStyles();

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const toggleDrawerHandler = (isOpened) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpened(isOpened);
  };

  const toggleSearchHandler = () => {
    setIsSearchOpened((prevState) => !prevState);
  };

  return (
    <>
      <AppBar
        isSearchOpened={isSearchOpened}
        toggleSearchHandler={toggleSearchHandler}
        toggleDrawerHandler={toggleDrawerHandler(true)}
        routes={routes}
        nav={
          <Nav className={classes.nav}>
            <Links
              linkProps={{ dense: true, classes: classes.link }}
              location={location}
              routes={routes}
            />
          </Nav>
        }
        search={<Search toggleSearchHandler={toggleSearchHandler} />}
      />

      <Drawer
        isDrawerOpened={isDrawerOpened}
        toggleDrawerHandler={toggleDrawerHandler(false)}
        nav={
          <Nav
            onClick={toggleDrawerHandler(false)}
            onKeyDown={toggleDrawerHandler(false)}
          >
            <Links location={location} routes={routes} />
          </Nav>
        }
      />
    </>
  );
};

export default Menu;
