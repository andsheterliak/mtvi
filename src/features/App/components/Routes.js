import { Redirect, Route } from 'react-router';

const Routes = ({ config }) => {
  return Object.entries(config).map(([key, data]) => {
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
};

export default Routes;
