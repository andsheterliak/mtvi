import { useLocation } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary } from 'react-error-boundary';

import routesConfig from '~common/routesConfig';
import { globalTheme } from '~common/theme';

import Menu from '~features/App/components/Menu';
import Footer from './components/Footer';
import Spacer from '~components/Spacer';
import RootWrapper from './components/RootWrapper';
import Routes from './components/Routes';
import ErrorFallback from './components/ErrorFallback';

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />

      <RootWrapper>
        <ErrorBoundary fallbackRender={ErrorFallback}>
          <Menu locationPathname={location.pathname} routes={routesConfig} />

          <Routes config={routesConfig} />

          <Spacer />

          <Footer />
        </ErrorBoundary>
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
