import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { IsSpacing } from '~/shared/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& > :not(:last-child)': {
      marginRight: '10px',
    },
  },

  spacing: {
    marginBottom: '6px',
  },
});

type Props = {
  children: ReactNode;
  isSpacing?: IsSpacing;
};

export const SelectorContainer = ({ children, isSpacing = true }: Props) => {
  const classes = useStyles();

  const rootClasses = classNames(classes.container, {
    [classes.spacing]: isSpacing,
  });

  return <div className={rootClasses}>{children}</div>;
};
