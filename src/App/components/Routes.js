import { Redirect, Route } from 'react-router';
import { Switch } from 'react-router-dom';

export const Routes = ({ config }) => {
  const routes = Object.entries(config).map(([key, data]) => {
    const { name = null, to, component: Component, redirectTo, exact } = data;

    return (
      <Route
        exact={exact}
        key={key}
        path={to}
        render={(props) => {
          if (redirectTo) return <Redirect to={redirectTo} />;

          if (to === config.page404.to) {
            return (
              <Component {...props} homePath={config.default.redirectTo} />
            );
          }

          return <Component {...props} titleName={name} />;
        }}
      />
    );
  });

  return <Switch>{routes}</Switch>;
};
