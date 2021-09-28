import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { IsLoading, IsSpacing } from '~/shared/types';

const useStyles = makeStyles({
  spacing: {
    margin: '0 0 15px 0',
  },
});

type Props = Partial<{
  isLoading: IsLoading;
  title: string;
  isSubtitle: boolean;
  isSpacing: IsSpacing;
  id: string;
}>;

export const SectionTitle = ({
  title,
  isSubtitle = false,
  isSpacing = true,
  isLoading,
  id,
}: Props) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography
      id={id}
      color="textPrimary"
      className={rootClasses}
      variant={isSubtitle ? 'h6' : 'h5'}
      component={isSubtitle ? 'h3' : 'h2'}
    >
      {isLoading ? <Skeleton width={isSubtitle ? 180 : 200} /> : title}
    </Typography>
  );
};
