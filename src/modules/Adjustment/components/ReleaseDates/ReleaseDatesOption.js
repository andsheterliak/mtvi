import { memo } from 'react';

import types from '@common/types';

import adjustmentTypes from '@modules/Adjustment/adjustmentTypes';
import DatePickerContainer from './DatePickerContainer';
import DatePicker from './DatePicker';
import OptionTitle from '../OptionTitle';
import OptionContainer from '../OptionContainer';

const ReleaseDatesOption = ({
  dateTitle,
  dateFrom,
  dateTo,
  dateFromHandler,
  dateToHandler,
}) => {
  return (
    <OptionContainer>
      <OptionTitle>{dateTitle}</OptionTitle>

      <DatePickerContainer>
        <DatePicker
          value={dateFrom}
          changeDateHandler={dateFromHandler}
          id="date-picker-from"
          ariaLabel="change release dates from"
          label="From"
        />

        <DatePicker
          value={dateTo}
          changeDateHandler={dateToHandler}
          id="date-picker-to"
          ariaLabel="change release dates to"
          label="To"
        />
      </DatePickerContainer>
    </OptionContainer>
  );
};

ReleaseDatesOption.propTypes = {
  dateTitle: adjustmentTypes.dateTitle,
  dateFrom: adjustmentTypes.dates.from,
  dateTo: adjustmentTypes.dates.to,
  dateFromHandler: types.handler,
  dateToHandler: types.handler,
};

export default memo(ReleaseDatesOption);
