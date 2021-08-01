import { memo } from 'react';
import { OptionContainer } from '../OptionContainer';
import { OptionTitle } from '../OptionTitle';
import { DatePicker } from './DatePicker';
import { DatePickerContainer } from './DatePickerContainer';

const ReleaseDatesOptionComponent = ({
  dateTitle,
  dateFrom,
  dateTo,
  setDateFromHandler,
  setDateToHandler,
}) => {
  return (
    <OptionContainer>
      <OptionTitle>{dateTitle}</OptionTitle>

      <DatePickerContainer>
        <DatePicker
          value={dateFrom}
          changeDateHandler={setDateFromHandler}
          id="date-picker-from"
          ariaLabel="change release dates from"
          label="From"
        />

        <DatePicker
          value={dateTo}
          changeDateHandler={setDateToHandler}
          id="date-picker-to"
          ariaLabel="change release dates to"
          label="To"
        />
      </DatePickerContainer>
    </OptionContainer>
  );
};

export const ReleaseDatesOption = memo(ReleaseDatesOptionComponent);
