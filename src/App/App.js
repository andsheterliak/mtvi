import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Menu from '../features/Menu/Menu';
import theme from './theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
      </ThemeProvider>
    </>
  );
};

export default App;
