import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { ReleaseDate, VoteAverage } from '~/api/tmdb';
import { Vote } from '~/shared/components/Vote';
import { FALLBACK_VALUE } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { formatDateStr } from '~/shared/utils';

const useStyles = makeStyles({
  subInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'end',
  },
});

type Props = Partial<{
  releaseDate: ReleaseDate;
  voteAverage: VoteAverage;
  isLoading: IsLoading;
}>;

export const CardSubInfo = ({ releaseDate, voteAverage, isLoading }: Props) => {
  const classes = useStyles();

  return (
    <Typography variant="caption" color="textSecondary" component="p" className={classes.subInfo}>
      {isLoading ? (
        <>
          <Skeleton width={90} />
          <Vote isLoading={isLoading} />
        </>
      ) : (
        <>
          {formatDateStr(releaseDate)?.dateStr || FALLBACK_VALUE}

          <Vote vote={voteAverage} />
        </>
      )}
    </Typography>
  );
};
