import { red } from '@material-ui/core/colors';
import {
  createMuiTheme,
  SimplePaletteColorOptions,
  ThemeOptions as ThemeOptionsTypes,
} from '@material-ui/core/styles';
import type {} from '@material-ui/lab/themeAugmentation';
import { useStorage } from './hooks';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    sl: true;
  }
}

const aspectRatios = {
  '1:1': '100%',
  '2:3': '150%',
  '16:9': '56.25%',
};

type AspectRatios = typeof aspectRatios;

export type AspectRatiosKeys = keyof typeof aspectRatios;

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    aspectRatios: AspectRatios;
  }

  interface ThemeOptions {
    aspectRatios?: AspectRatios;
  }
}

const primary: SimplePaletteColorOptions = {
  main: red[700],
  light: red[600],
  dark: red[800],
};

const baseTheme: ThemeOptionsTypes = {
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
    keys: ['xs', 'sm', 'sl', 'md', 'lg', 'xl'],

    values: {
      xs: 0,
      sm: 600,
      sl: 800,
      md: 960,
      lg: 1280,
      xl: 1920,
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

  aspectRatios,
};

const lightTheme = createMuiTheme(
  {
    palette: {
      background: {
        paper: 'hsl(0, 0%, 99%)',
        default: 'hsl(0, 0%, 97%)',
      },
    },
  },
  baseTheme
);

export const darkTheme = createMuiTheme(
  {
    palette: {
      type: 'dark',

      background: {
        paper: 'hsl(224, 9%, 9%)',
        default: 'hsl(224, 9%, 6%)',
      },
    },
  },
  baseTheme
);

export const useToggleTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useStorage<boolean>({
    name: 'isDarkTheme',
    defaultValue: true,
  });

  const toggleThemeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return {
    toggleThemeHandler,
    theme: isDarkTheme ? darkTheme : lightTheme,
    isDarkTheme,
  };
};
