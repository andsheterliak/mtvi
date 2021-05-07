import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { bool, string } from 'prop-types';

import types from '~common/types';

const useStyles = makeStyles({
  spacing: {
    margin: '0 0 15px 0',
  },
});

const SectionTitle = ({ title, isSubsection = false, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [classes.title];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <Typography
      color="textPrimary"
      className={classNames.join(' ')}
      variant={isSubsection ? 'h6' : 'h5'}
      component={isSubsection ? 'h3' : 'h2'}
    >
      {title}
    </Typography>
  );
};

SectionTitle.propTypes = {
  title: string.isRequired,
  isSpacing: types.isSpacing,
  isSubsection: bool,
};

export default SectionTitle;
