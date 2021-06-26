import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => {
  return {
    icon: {
      color({ isDisabled }) {
        return isDisabled ? palette.text.disabled : palette.text.primary;
      },

      fontSize({ size }) {
        return size;
      },
    },
  };
});

const IconBtn = ({
  icon: Icon,
  clickHandler,
  ariaLabel,
  edge,
  size = 'lg',
  isDisabled,
}) => {
  const sizes = {
    sm: '1.5rem',
    md: '1.7rem',
    lg: '1.9rem',
  };

  const classes = useStyles({ size: sizes[size] ?? size, isDisabled });

  return (
    <IconButton
      edge={edge}
      color="inherit"
      aria-label={ariaLabel}
      onClick={clickHandler}
      disabled={isDisabled}
    >
      <Icon className={classes.icon} />
    </IconButton>
  );
};

export default IconBtn;
