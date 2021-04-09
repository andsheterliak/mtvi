import { grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = {
  palette: {
    type: 'dark',

    primary: {
      main: grey[600],
      light: grey[500],
      dark: grey[800],
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1400,
    },
  },
};

export const globalTheme = createMuiTheme(theme);

export const innerDarkTheme = createMuiTheme({
  ...theme,

  palette: {
    ...theme.palette,
    type: 'dark',
  },
});
