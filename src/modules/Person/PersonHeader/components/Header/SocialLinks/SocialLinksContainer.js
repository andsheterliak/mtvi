import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    spacing: {
      marginTop: '20px',
    },
  };
});

const SocialLinksContainer = ({ children, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [classes.title];

  if (isSpacing) classNames.push(classes.spacing);

  return <div className={classNames.join(' ')}>{children}</div>;
};

export default SocialLinksContainer;
