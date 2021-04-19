import { hot } from 'react-hot-loader/root';

import { Redirect, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import RootWrapper from './components/RootWrapper';
import Menu from '../Menu/Menu';
import routes from '../common/routes';
import Footer from '../common/components/Footer';
import Spacer from '../common/components/Spacer';

import { globalTheme } from '../common/theme';

const App = () => {
  const pages = Object.entries(routes).map(([key, data]) => {
    const { name = null, to, component: Component, redirectTo, exact } = data;

    return (
      <Route
        exact={exact}
        key={key}
        path={to}
        render={(props) => {
          return redirectTo ? (
            <Redirect to={redirectTo} />
          ) : (
            <Component {...props} titleName={name} />
          );
        }}
      />
    );
  });

  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />

      <RootWrapper>
        <Menu />

        <Switch>{pages}</Switch>

        <Spacer />

        <Footer />
      </RootWrapper>
    </ThemeProvider>
  );
};

export default hot(App);
