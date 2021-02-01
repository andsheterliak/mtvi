import { Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Menu from '../features/Menu/Menu';
import routes from './routes';
import theme from './theme';

const App = () => {
  const pages = Object.entries(routes).map(([key, data]) => {
    const { name, to, component: Component } = data;

    return (
      <Route
        exact
        key={key}
        path={to}
        render={(props) => <Component {...props} name={name} />}
      />
    );
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
        <Switch>{pages}</Switch>
      </ThemeProvider>
    </>
  );
};

export default App;
