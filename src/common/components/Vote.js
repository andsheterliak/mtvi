import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Skeleton } from '@material-ui/lab';

import { ifIsData, getHyphenOrData } from '~common/utils/getData';

const useStyles = makeStyles(() => ({
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
}));

const Vote = ({ vote, isLoading }) => {
  const classes = useStyles();

  if (isLoading) return <Skeleton width={40} />;

  const value = ifIsData(vote) ? vote.toFixed(1) : getHyphenOrData();

  return (
    <span className={classes.vote}>
      <StarBorderIcon className={classes.starIcon} fontSize="small" />

      {value}
    </span>
  );
};

export default Vote;
