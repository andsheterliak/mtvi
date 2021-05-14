import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      backgroundColor: theme.palette.background.paper,
    },

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

    icon: {
      color: theme.palette.text.primary,
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
      color: theme.palette.text.secondary,
      display: 'inline-block',
      width: 'auto',
    },
  };
});

export default useStyles;
