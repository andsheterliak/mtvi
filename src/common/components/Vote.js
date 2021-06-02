import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { getHyphenOrData } from '~common/utils/getData';

const useStyles = makeStyles(() => ({
  vote: {
    display: 'flex',
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

  return (
    <span className={classes.vote}>
      <StarBorderIcon className={classes.starIcon} fontSize="small" />
      {getHyphenOrData(vote)}
    </span>
  );
};

export default Vote;
