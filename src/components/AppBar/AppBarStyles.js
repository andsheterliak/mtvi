import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    toolBar: {
      minHeight: '56px', // To avoid content shifting.

      [theme.breakpoints.up('md')]: {
        minHeight: '60px',
      },
    },

    menuButton: {
      marginRight: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },

    searchButton: {
      marginLeft: 'auto',
    },

    logoLink: {
      margin: '10px 0',
    },

    // viewBox="0 0 24 24", // SvgIcon default
    logoIcon: {
      verticalAlign: 'middle',
      width: '35px',
      height: '35px',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',

      [theme.breakpoints.up('md')]: {
        width: '40px',
        height: '40px',
      },
    },

    icon: {
      fontSize: '1.6rem',

      [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
      },
    },

    nav: {
      display: 'none',
      marginLeft: '20px',

      [theme.breakpoints.up('md')]: {
        display: 'inline-block',
      },
    },

    link: {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
      display: 'inline-block',
      width: 'auto',
    },
  };
});

export default useStyles;
