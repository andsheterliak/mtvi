import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Skeleton } from '@material-ui/lab';
import { VoteAverage } from '~/api/tmdb';
import { FALLBACK_VALUE } from '../constants';
import { IsLoading } from '../types';

const useStyles = makeStyles({
  vote: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > *:first-child': {
      marginRight: '3px',
      marginBottom: '3px',
    },
  },

  starIcon: {
    color: orange[300],
  },
});

type Props = Partial<{
  isLoading: IsLoading;
  vote: VoteAverage;
}>;

export const Vote = ({ vote, isLoading }: Props) => {
  const classes = useStyles();

  if (isLoading) return <Skeleton width={40} />;

  const value = vote != null ? vote.toFixed(1) : FALLBACK_VALUE;

  return (
    <span className={classes.vote}>
      <StarBorderIcon className={classes.starIcon} fontSize="small" />

      {value}
    </span>
  );
};
