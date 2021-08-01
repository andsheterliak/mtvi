import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import { Spacer } from '~/components';
import { routesConfig } from '~/routesConfig';
import { useToggleTheme } from '~/theme';
import { ErrorFallback } from './components/ErrorFallback';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { RootWrapper } from './components/RootWrapper';
import { Routes } from './components/Routes';

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
