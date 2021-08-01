import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { formatDataStr, getHyphenOrData } from '~/utils';
import { Vote } from '~/components/Vote';

const useCardSubInfoStyles = makeStyles(() => ({
  subInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'end',
  },
}));

export const CardSubInfo = ({ releaseDate, voteAverage, isLoading }) => {
  const classes = useCardSubInfoStyles();

  return (
    <Typography
      variant="caption"
      color="textSecondary"
      component="p"
      className={classes.subInfo}
    >
      {isLoading ? (
        <>
          <Skeleton width={90} />
          <Vote isLoading={isLoading} />
        </>
      ) : (
        <>
          {getHyphenOrData(formatDataStr(releaseDate)?.dateStr)}

          <Vote isLoading={isLoading} vote={voteAverage} />
        </>
      )}
    </Typography>
  );
};
