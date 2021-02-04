import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',

    background: {
      paper: '#333',
      default: grey[900],
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
});

export default theme;
