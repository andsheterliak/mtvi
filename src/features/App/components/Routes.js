import { bool, elementType, objectOf, shape, string } from 'prop-types';
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

Routes.propTypes = {
  config: objectOf(
    shape({
      name: string,
      to: string.isRequired,
      redirectTo: string,
      exact: bool,
      component: elementType.isRequired,
    })
  ),
};

export default Routes;
