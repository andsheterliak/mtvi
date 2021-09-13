import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { IsSpacing } from '~/shared/types';

const useStyles = makeStyles({
  spacing: {
    marginTop: '20px',
  },
});

type Props = {
  isSpacing?: IsSpacing;
  children: ReactNode;
};

export const SocialLinksContainer = ({ children, isSpacing = true }: Props) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return <div className={rootClasses}>{children}</div>;
};
