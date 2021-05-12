import { KeyboardDatePicker } from '@material-ui/pickers';

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

export default DatePicker;
