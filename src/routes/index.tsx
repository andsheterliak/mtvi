import { Redirect, Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { routesConfig } from './routesConfig';

export * from './routesConfig';

export const Routes = () => {
  const routes = Object.values(routesConfig).map((route) => {
    const { to, component: Component, redirectTo, exact, props: routeProps } = route;

    return (
      <Route
        exact={exact}
        key={to}
        path={to}
        render={() => {
          if (redirectTo) return <Redirect to={redirectTo} />;
          if (!Component) return undefined;

          return <Component {...routeProps} />;
        }}
      />
    );
  });

  return <Switch>{routes}</Switch>;
};
