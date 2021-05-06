import { string } from 'prop-types';
import { Typography } from '@material-ui/core';

const OptionTitle = ({ id = null, children }) => {
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

OptionTitle.propTypes = {
  id: string,
  children: string.isRequired,
};

export default OptionTitle;
