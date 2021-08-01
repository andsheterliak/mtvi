import { Typography } from '@material-ui/core';

export const OptionTitle = ({ id = null, children }) => {
  return (
    <Typography
      gutterBottom
      color="textSecondary"
      variant="body2"
      component="h3"
      id={id}
    >
      {children}
    </Typography>
  );
};
