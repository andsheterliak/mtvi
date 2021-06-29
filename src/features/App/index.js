import { useLocation } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary } from 'react-error-boundary';

import routesConfig from '~common/routesConfig';
import { useToggleTheme } from '~common/theme';

import Menu from '~features/App/components/Menu';
import Footer from './components/Footer';
import Spacer from '~components/Spacer';
import RootWrapper from './components/RootWrapper';
import Routes from './components/Routes';
import ErrorFallback from './components/ErrorFallback';

const App = () => {
  const location = useLocation();
  const { theme, isDarkTheme, toggleThemeHandler } = useToggleTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <RootWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Menu
            locationPathname={location.pathname}
            routes={routesConfig}
            toggleThemeHandler={toggleThemeHandler}
            isDarkTheme={isDarkTheme}
          />

          <Routes config={routesConfig} />

          <Spacer />

          <Footer />
        </ErrorBoundary>
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
