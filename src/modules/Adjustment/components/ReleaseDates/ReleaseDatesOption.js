import DatePickerContainer from './DatePickerContainer';
import DatePicker from './DatePicker';
import OptionTitle from '../OptionTitle';
import OptionContainer from '../OptionContainer';

const ReleaseDatesOption = ({
  dateTitle,
  dates,
  dateFromHandler,
  dateToHandler,
}) => {
  return (
    <OptionContainer>
      <OptionTitle>{dateTitle}</OptionTitle>

      <DatePickerContainer>
        <DatePicker
          value={dates.from}
          changeDateHandler={dateFromHandler}
          id="date-picker-from"
          ariaLabel="change release dates from"
          label="From"
        />

        <DatePicker
          value={dates.to}
          changeDateHandler={dateToHandler}
          id="date-picker-to"
          ariaLabel="change release dates to"
          label="To"
        />
      </DatePickerContainer>
    </OptionContainer>
  );
};

export default ReleaseDatesOption;
