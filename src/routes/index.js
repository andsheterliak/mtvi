import { Redirect, Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { routesConfig } from './routesConfig';

export * from './routesConfig';

export const Routes = () => {
  const routes = Object.entries(routesConfig).map(([key, data]) => {
    const { name = null, to, component: Component, redirectTo, exact } = data;

    return (
      <Route
        exact={exact}
        key={key}
        path={to}
        render={(props) => {
          if (redirectTo) return <Redirect to={redirectTo} />;

          if (to === routesConfig.page404.to) {
            return (
              <Component
                {...props}
                homePath={routesConfig.default.redirectTo}
              />
            );
          }

          return <Component {...props} titleName={name} />;
        }}
      />
    );
  });

  return <Switch>{routes}</Switch>;
};
