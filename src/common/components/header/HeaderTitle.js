import { string } from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import types from '~common/types';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      textAlign: 'center',
      ...theme.typography.h5,

      [theme.breakpoints.up('sm')]: {
        ...theme.typography.h4,
      },

      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        ...theme.typography.h3,
      },
    },

    spacing: {
      margin: `${theme.spacing(2)}px 0`,
    },
  };
});

const HeaderTitle = ({ title, isSpacing = true }) => {
  const classes = useStyles();
  const classNames = [classes.title];

  if (isSpacing) classNames.push(classes.spacing);

  return (
    <Typography
      color="textPrimary"
      component="h1"
      className={classNames.join(' ')}
    >
      {title}
    </Typography>
  );
};

HeaderTitle.propTypes = {
  title: string.isRequired,
  isSpacing: types.isSpacing,
};

export default HeaderTitle;
