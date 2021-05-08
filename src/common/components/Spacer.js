import { bool, string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import types from '~common/types';

const generateResponsiveClasses = (theme, styleName, styleFn) => {
  const classes = theme.breakpoints.keys.reduce((classesObj, key) => {
    classesObj[key] = {
      [theme.breakpoints.up(key)]: {
        [styleName]: (props) => {
          return styleFn(key, props);
        },
      },
    };

    return classesObj;
  }, {});

  return classes;
};

const useStyles = makeStyles((theme) => {
  const classes = generateResponsiveClasses(
    theme,
    'padding',

    (key, props) => {
      let value = props[key];

      if (!value) return 0;

      value = value
        .split(' ')
        .map((item) => `${theme.spacing(parseFloat(item, 10))}px`)
        .join(' ');

      return value;
    }
  );

  return classes;
});

const Spacer = ({
  xs = '2 0',
  sm = '3 0',
  md = null,
  lg = null,
  xl = null,
  isResponsive = true,
  children,
  ...boxProps
}) => {
  const classes = useStyles({ xs, sm, md, lg, xl });

  const classNames = [classes.xs];

  if (isResponsive) {
    if (sm) classNames.push(classes.sm);
    if (md) classNames.push(classes.md);
    if (lg) classNames.push(classes.lg);
    if (xl) classNames.push(classes.xl);
  }

  return (
    <Box {...boxProps} className={classNames.join(' ')}>
      {children}
    </Box>
  );
};

const sizeType = string;

Spacer.propTypes = {
  xs: sizeType,
  sm: sizeType,
  md: sizeType,
  lg: sizeType,
  xl: sizeType,
  isResponsive: bool,
  children: types.generic.anyChildren,
};

export default Spacer;
