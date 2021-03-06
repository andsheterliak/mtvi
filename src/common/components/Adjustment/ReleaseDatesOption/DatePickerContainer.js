import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles({
  pickerContainer: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  },
});

const DatePickerContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.pickerContainer}>{children}</div>
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerContainer;
