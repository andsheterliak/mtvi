import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({ ariaLabel, id, value, changeDateHandler }) => {
  return (
    <KeyboardDatePicker
      value={value}
      onChange={changeDateHandler}
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="dense"
      id={id}
      label="From"
      KeyboardButtonProps={{
        'aria-label': ariaLabel,
      }}
    />
  );
};

export default DatePicker;
