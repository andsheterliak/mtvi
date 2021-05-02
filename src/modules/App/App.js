import { Redirect, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import routes from '~common/routes';
import { globalTheme } from '~common/theme';

import Menu from '~modules/Menu/Menu';
import Footer from '~components/Footer';
import Spacer from '~components/Spacer';
import RootWrapper from './components/RootWrapper';

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

        <Spacer xs="3 0 0" sm="4 0 0">
          <Footer />
        </Spacer>
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
