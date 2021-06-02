import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { checkIfIsData, getHyphenOrData } from '~common/utils/getData';

const useStyles = makeStyles(() => ({
  vote: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&>*:first-child': {
      marginRight: '3px',
      marginBottom: '3px',
    },
  },

  starIcon: {
    color: orange[300],
  },
}));

const Vote = ({ vote }) => {
  const classes = useStyles();

  const value = checkIfIsData(vote) ? vote.toFixed(1) : getHyphenOrData();

  return (
    <span className={classes.vote}>
      <StarBorderIcon className={classes.starIcon} fontSize="small" />

      {value}
    </span>
  );
};

export default Vote;
