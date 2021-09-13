import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorFallback } from '~/ErrorFallback';
import { Footer } from '~/Footer';
import { Menu } from '~/Menu';
import { RootWrapper } from '~/RootWrapper';
import { Routes } from '~/routes';
import { Spacer } from '~/shared/components';
import { useToggleTheme } from '~/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: process.env.NODE_ENV === 'production' ? 3 : false,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  },
});

const App = () => {
  const { theme, isDarkTheme, toggleThemeHandler } = useToggleTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <RootWrapper>
          <ErrorBoundary
            onReset={() => {
              queryClient.clear();
            }}
            FallbackComponent={ErrorFallback}
          >
            <Menu toggleThemeHandler={toggleThemeHandler} isDarkTheme={isDarkTheme} />

            <Routes />

            <Spacer />

            <Footer />
          </ErrorBoundary>
        </RootWrapper>

        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
