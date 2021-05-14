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

  shadows: [
    'none',
    '0px 1px 10px hsla(0, 0%, 0%, 10%)',
    '0px 1px 10px hsla(0, 0%, 0%, 11%)',
    '0px 1px 10px hsla(0, 0%, 0%, 12%)',
    '0px 2px 11px hsla(0, 0%, 0%, 13%)',
    '0px 2px 11px hsla(0, 0%, 0%, 14%)',
    '0px 2px 11px hsla(0, 0%, 0%, 15%)',
    '0px 3px 12px hsla(0, 0%, 0%, 16%)',
    '0px 3px 12px hsla(0, 0%, 0%, 17%)',
    '0px 3px 12px hsla(0, 0%, 0%, 18%)',
    '0px 4px 13px hsla(0, 0%, 0%, 19%)',
    '0px 4px 13px hsla(0, 0%, 0%, 20%)',
    '0px 4px 13px hsla(0, 0%, 0%, 21%)',
    '0px 4px 14px hsla(0, 0%, 0%, 22%)',
    '0px 4px 14px hsla(0, 0%, 0%, 23%)',
    '0px 4px 14px hsla(0, 0%, 0%, 24%)',
    '0px 4px 15px hsla(0, 0%, 0%, 25%)',
    '0px 4px 15px hsla(0, 0%, 0%, 26%)',
    '0px 4px 15px hsla(0, 0%, 0%, 27%)',
    '0px 4px 15px hsla(0, 0%, 0%, 28%)',
    '0px 4px 15px hsla(0, 0%, 0%, 29%)',
    '0px 4px 15px hsla(0, 0%, 0%, 30%)',
    '0px 4px 15px hsla(0, 0%, 0%, 31%)',
    '0px 4px 15px hsla(0, 0%, 0%, 32%)',
    '0px 4px 15px hsla(0, 0%, 0%, 33%)',
  ],
};

export const globalTheme = createMuiTheme(theme);

export const innerDarkTheme = createMuiTheme({
  ...theme,

  palette: {
    ...theme.palette,
    type: 'dark',
  },
});
