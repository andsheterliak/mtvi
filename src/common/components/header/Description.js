import { string } from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import types from '~common/types';

const useStyles = makeStyles(() => {
  return {
    spacing: {
      marginBottom: '20px',
    },
  };
});

const HeaderDescription = ({ description, isSpacing = true }) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography
      color="textPrimary"
      component="p"
      variant="body1"
      className={rootClasses}
    >
      {description}
    </Typography>
  );
};

HeaderDescription.propTypes = {
  description: string.isRequired,
  isSpacing: types.isSpacing,
};

export default HeaderDescription;
