import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';

export const DatePicker = ({
  ariaLabel,
  id,
  value,
  label,
  onChange,
}: KeyboardDatePickerProps & { ariaLabel: string }) => {
  return (
    <KeyboardDatePicker
      value={value}
      onChange={onChange}
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
