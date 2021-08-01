import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(() => {
  return {
    spacing: {
      marginTop: '20px',
    },
  };
});

export const SocialLinksContainer = ({ children, isSpacing = true }) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return <div className={rootClasses}>{children}</div>;
};
