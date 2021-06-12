import { memo } from 'react';

import DatePickerContainer from './DatePickerContainer';
import DatePicker from './DatePicker';
import OptionTitle from '../OptionTitle';
import OptionContainer from '../OptionContainer';

const ReleaseDatesOption = ({
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

export default memo(ReleaseDatesOption);
