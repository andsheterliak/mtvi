import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { getHyphenOrData } from '~/utils';

const useStyles = makeStyles(() => {
  return {
    item: {
      '&:not(:last-child)': {
        margin: '0 0 8px 0',
      },
    },

    skeleton: {
      width: '100%',
      maxWidth: 330,
    },
  };
});

export const InfoItem = ({ name, value, isLoading }) => {
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
            {getHyphenOrData(value)}
          </Typography>
        </>
      )}
    </li>
  );
};
