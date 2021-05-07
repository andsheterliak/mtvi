import { Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import routesConfig from '~common/routesConfig';
import { globalTheme } from '~common/theme';

import Menu from '~features/Menu';
import Footer from '~components/Footer';
import Spacer from '~components/Spacer';
import RootWrapper from './components/RootWrapper';
import Routes from './components/Routes';

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />

      <RootWrapper>
        <Menu />

        <Switch>{<Routes config={routesConfig} />}</Switch>

        <Spacer xs="3 0 0" sm="4 0 0">
          <Footer />
        </Spacer>
      </RootWrapper>
    </ThemeProvider>
  );
};

export default App;
