import { SvgIcon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    logoIcon: {
      verticalAlign: 'middle',
      width: '35px',
      height: '35px',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      marginRight: '5px',

      [theme.breakpoints.up('md')]: {
        width: '40px',
        height: '40px',
      },
    },

    logoText: {
      verticalAlign: 'middle',
    },
  };
});

const Logo = () => {
  const classes = useStyles();

  return (
    <div>
      <SvgIcon className={`${classes.logoIcon}`}>
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <path d="M7 2v20" />
        <path d="M17 2v20" />
        <path d="M2 12h20" />
        <path d="M2 7h5" />
        <path d="M2 17h5" />
        <path d="M17 17h5" />
        <path d="M17 7h5" />
      </SvgIcon>

      <Typography component="span" className={classes.logoText}>
        MTvI.
      </Typography>
    </div>
  );
};

export default Logo;
