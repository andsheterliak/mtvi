import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';
import { getHyphenOrData } from '~common/utils/getData';

const useStyles = makeStyles(() => {
  return {
    item: {
      '&:not(:last-child)': {
        margin: '0 0 8px 0',
      },
    },
  };
});

const InfoItem = ({ name, value }) => {
  const classes = useStyles();

  return (
    <li className={classes.item}>
      <Typography component="span" variant="body2" color="textSecondary">
        {name}:{' '}
      </Typography>

      <Typography color="textPrimary" component="span" variant="body2">
        {getHyphenOrData(value)}
      </Typography>
    </li>
  );
};

InfoItem.propTypes = {
  name: types.dataListItem.name,
  value: types.dataListItem.value,
};

export default InfoItem;
