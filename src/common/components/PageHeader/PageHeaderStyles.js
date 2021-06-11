import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    img: {
      width: '100%',
      maxHeight: '600px',
      objectFit: 'cover',
      objectPosition: 'top',
    },

    infoBlock: {
      [theme.breakpoints.up('sm')]: {
        padding: '10px 15px',
      },

      [theme.breakpoints.up('md')]: {
        padding: '10px 20px',
      },

      [theme.breakpoints.up('lg')]: {
        padding: '10px 45px',
      },
    },
  };
});

export default useStyles;
