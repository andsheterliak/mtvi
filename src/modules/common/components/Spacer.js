import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  const classes = theme.breakpoints.keys.reduce((classesObj, key) => {
    classesObj[key] = {
      [theme.breakpoints.up(key)]: {
        padding(props) {
          let value = props[key];

          if (!value) return 0;

          value = value
            .split(' ')
            .map((item) => `${theme.spacing(parseFloat(item, 10))}px`)
            .join(' ');

          return value;
        },
      },
    };

    return classesObj;
  }, {});

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

export default Spacer;
