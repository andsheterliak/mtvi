import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary } from 'react-error-boundary';
import { Spacer } from '~/components';
import { Routes } from '~/routes';
import { useToggleTheme } from '~/theme';
import { ErrorFallback } from '~/ErrorFallback';
import { Footer } from '~/Footer';
import { Menu } from '~/Menu';
import { RootWrapper } from '~/RootWrapper';

const App = () => {
  const { theme, isDarkTheme, toggleThemeHandler } = useToggleTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <RootWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Menu
            toggleThemeHandler={toggleThemeHandler}
            isDarkTheme={isDarkTheme}
          />

          <Routes />

          <Spacer />

          <Footer />
        </ErrorBoundary>
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
