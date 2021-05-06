import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  const bgColor = theme.palette.grey[900];

  return {
    section: {
      backgroundColor: bgColor,

      [theme.breakpoints.up('md')]: {
        backgroundColor: 'hsla(0, 0%, 0%, 0%)',
      },
    },

    img: {
      width: '100%',

      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },

    imgBackgroundWrapper: {
      zIndex: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      borderRadius: '4px',
      backgroundColor: bgColor,
      display: 'none',

      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },

    imgBackground: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top',
      borderRadius: '4px',
      opacity: 0.2,
    },

    infoBlock: {
      position: 'relative',
      display: 'grid',
      alignContent: 'center',
      paddingBottom: '20px',

      [theme.breakpoints.up('sm')]: {
        padding: '0 26px 20px 26px',
      },

      [theme.breakpoints.up('md')]: {
        minHeight: '550px',
        borderRadius: '4px',
        padding: ' 0 76px 20px 76px',
      },

      [theme.breakpoints.up('lg')]: {
        padding: ' 0 96px 20px 96px',
      },
    },

    infoBlockInner: {
      // Create a stacking context to be able to display the element after the imgBackground element.
      position: 'relative',
      zIndex: 0,
    },
  };
});

export default useStyles;
