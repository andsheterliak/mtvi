import DatePickerContainer from './DatePickerContainer';
import DatePicker from './DatePicker';
import OptionTitle from './OptionTitle';
import OptionContainer from './OptionContainer';

const RealiseDatesOption = () => {
  return (
    <OptionContainer>
      <OptionTitle>Release Dates</OptionTitle>

      <DatePickerContainer>
        <DatePicker
          id="date-picker-from"
          ariaLabel="change date realise dates from"
          label="From"
        />

        <DatePicker
          id="date-picker-to"
          ariaLabel="change date realise dates to"
          label="To"
        />
      </DatePickerContainer>
    </OptionContainer>
  );
};

export default RealiseDatesOption;
