import { Link as MUILink } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'inline-block',
    },

    spacing: {
      marginTop: `${theme.spacing(2)}px`,
    },
  };
});

export const SeeAllLink = ({ children, path, isSpacing = true }) => {
  const classes = useStyles();

  const linkClasses = classNames(classes.root, {
    [classes.spacing]: isSpacing,
  });

  return (
    <MUILink
      color="textPrimary"
      className={linkClasses}
      to={path}
      variant="body1"
      component={Link}
    >
      {children}
    </MUILink>
  );
};
