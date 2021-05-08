import { string } from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

import types from '~common/types';

const DatePicker = ({ ariaLabel, id, value, label, changeDateHandler }) => {
  return (
    <KeyboardDatePicker
      value={value}
      onChange={changeDateHandler}
      variant="inline"
      format="MM/dd/yyyy"
      minDate={new Date('1800-01-01')}
      margin="dense"
      id={id}
      label={label}
      KeyboardButtonProps={{
        'aria-label': ariaLabel,
      }}
      invalidDateMessage="Month/Day/Year"
    />
  );
};

DatePicker.propTypes = {
  ariaLabel: types.generic.label.isRequired,
  id: string.isRequired,
  value: string,
  label: types.generic.label.isRequired,
  changeDateHandler: types.generic.handler.isRequired,
};

export default DatePicker;
