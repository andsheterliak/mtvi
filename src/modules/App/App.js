import { Redirect, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Menu from '../Menu/Menu';
import routes from '../common/routes';
import theme from './theme';
import Footer from '../common/components/Footer';

const App = () => {
  const pages = Object.entries(routes).map(([key, data]) => {
    const { name = null, to, component: Component, redirectTo } = data;

    return (
      <Route
        exact
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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
        <Switch>{pages}</Switch>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
