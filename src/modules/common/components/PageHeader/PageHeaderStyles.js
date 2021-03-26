import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    img: {
      width: '100%',

      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },

    imgBackground: {
      zIndex: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      objectFit: 'cover',
      objectPosition: 'top',
      borderRadius: '4px',
      opacity: 0.1,
      display: 'none',

      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },

    title: {
      textAlign: 'center',
      margin: `${theme.spacing(2)}px 0`,
      fontSize: theme.typography.pxToRem(20),

      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(25),
      },

      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        fontSize: theme.typography.pxToRem(35),
      },
    },

    infoBlock: {
      position: 'relative',
      display: 'grid',
      alignContent: 'center',

      [theme.breakpoints.up('sm')]: {
        padding: ' 0 26px 16px 26px',
      },

      [theme.breakpoints.up('md')]: {
        minHeight: '550px',
        borderRadius: '4px',
        padding: ' 0 76px 16px 76px',
        backgroundColor: theme.palette.background.paper,
      },

      [theme.breakpoints.up('lg')]: {
        padding: ' 0 96px 16px 96px',
      },
    },

    infoBlockInner: {
      // Create a stacking context to be able to display the element after the imgBackground element.
      position: 'relative',
      zIndex: 0,
    },

    overview: {
      marginBottom: '20px',
    },
  };
});

export default useStyles;
