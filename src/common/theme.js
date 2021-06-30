import { useEffect, useState } from 'react';
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { getLS, setLS } from './utils/storage';

const primary = {
  main: red[700],
  light: red[600],
  dark: red[800],
};

const baseTheme = {
  palette: {
    primary,
  },

  overrides: {
    MuiToggleButton: {
      root: {
        '&$selected': {
          color: 'white',
          backgroundColor: primary.main,

          '&:hover': {
            backgroundColor: primary.light,
          },
        },
      },
    },

    MuiListItem: {
      root: {
        '&$selected': {
          color: 'white',
          backgroundColor: primary.main,

          '&:hover': {
            backgroundColor: primary.light,
          },
        },
      },
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

  extraBreakpoints: {
    sx: 800,
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

  aspectRatios: {
    '1:1': '100%',
    '2:3': '150%',
    '16:9': '56.25%',
  },
};

const lightTheme = createMuiTheme({
  ...baseTheme,

  palette: {
    ...baseTheme.palette,

    background: {
      paper: 'hsl(0, 0%, 99%)',
      default: 'hsl(0, 0%, 97%)',
    },
  },
});

export const darkTheme = createMuiTheme({
  ...baseTheme,

  palette: {
    ...baseTheme.palette,
    type: 'dark',

    background: {
      paper: 'hsl(224, 9%, 9%)',
      default: 'hsl(224, 9%, 6%)',
    },
  },
});

export const useToggleTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    () => getLS('isDarkTheme') ?? true
  );

  const toggleThemeHandler = () => {
    setIsDarkTheme((prevIsDarkTheme) => !prevIsDarkTheme);
  };

  useEffect(() => {
    setLS('isDarkTheme', isDarkTheme);
  }, [isDarkTheme]);

  return {
    toggleThemeHandler,
    theme: isDarkTheme ? darkTheme : lightTheme,
    isDarkTheme,
  };
};
