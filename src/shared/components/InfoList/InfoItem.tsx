import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { FALLBACK_VALUE } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { DataListName, DataListValue } from './types';

const useStyles = makeStyles({
  item: {
    '&:not(:last-child)': {
      margin: '0 0 8px 0',
    },
  },

  skeleton: {
    width: '100%',
    maxWidth: 330,
  },
});

type Props = Partial<{
  isLoading: IsLoading;
  name: DataListName;
  value: DataListValue;
}>;

export const InfoItem = ({ name, value, isLoading }: Props) => {
  const classes = useStyles();

  return (
    <li className={classes.item}>
      {isLoading ? (
        <Typography component="span" variant="body2">
          <Skeleton className={classes.skeleton} />
        </Typography>
      ) : (
        <>
          <Typography component="span" variant="body2" color="textSecondary">
            {`${name}: `}
          </Typography>

          <Typography color="textPrimary" component="span" variant="body2">
            {typeof value === 'number' || value ? value : FALLBACK_VALUE}
          </Typography>
        </>
      )}
    </li>
  );
};
