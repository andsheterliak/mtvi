import { string } from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
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

  const rootClasses = classNames(classes.title, {
    [classes.spacing]: isSpacing,
  });

  return (
    <Typography color="textPrimary" component="h1" className={rootClasses}>
      {title}
    </Typography>
  );
};

HeaderTitle.propTypes = {
  title: string.isRequired,
  isSpacing: types.isSpacing,
};

export default HeaderTitle;
