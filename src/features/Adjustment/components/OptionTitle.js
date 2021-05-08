import { string } from 'prop-types';
import { Typography } from '@material-ui/core';
import types from '~common/types';

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
  children: types.generic.title.isRequired,
};

export default OptionTitle;
