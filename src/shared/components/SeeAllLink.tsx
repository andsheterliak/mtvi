import { Link as MUILink } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IsSpacing, Path } from '../types';

const useStyles = makeStyles(({ spacing }) => {
  return createStyles({
    root: {
      display: 'inline-block',
    },

    spacing: {
      marginTop: `${spacing(2)}px`,
    },
  });
});

type Props = {
  isSpacing?: IsSpacing;
  children: ReactNode;
  path: Path;
};

export const SeeAllLink = ({ children, path, isSpacing = true }: Props) => {
  const classes = useStyles();

  const linkClasses = classNames(classes.root, {
    [classes.spacing]: isSpacing,
  });

  return (
    <MUILink color="textPrimary" className={linkClasses} to={path} variant="body1" component={Link}>
      {children}
    </MUILink>
  );
};
