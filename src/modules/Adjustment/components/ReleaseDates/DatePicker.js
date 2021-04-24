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
  ariaLabel: string.isRequired,
  id: string.isRequired,
  value: string,
  label: string.isRequired,
  changeDateHandler: types.handler,
};

export default DatePicker;
