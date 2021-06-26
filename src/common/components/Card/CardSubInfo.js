import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

import { formatDataStr } from '~common/utils/date';
import { getHyphenOrData } from '~common/utils/getData';
import Vote from '~components/Vote';

const useCardSubInfoStyles = makeStyles(() => ({
  subInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'end',
  },
}));

const CardSubInfo = ({ releaseDate, voteAverage, isLoading }) => {
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

export default CardSubInfo;
