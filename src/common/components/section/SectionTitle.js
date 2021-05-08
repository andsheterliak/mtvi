import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { bool } from 'prop-types';

import types from '~common/types';

const useStyles = makeStyles({
  spacing: {
    margin: '0 0 15px 0',
  },
});

const SectionTitle = ({ title, isSubtitle = false, isSpacing = true }) => {
  const classes = useStyles();

  const rootClasses = classNames({
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography
      color="textPrimary"
      className={rootClasses}
      variant={isSubtitle ? 'h6' : 'h5'}
      component={isSubtitle ? 'h3' : 'h2'}
    >
      {title}
    </Typography>
  );
};

SectionTitle.propTypes = {
  title: types.generic.title.isRequired,
  isSpacing: types.specific.isSpacing,
  isSubtitle: bool,
};

export default SectionTitle;
