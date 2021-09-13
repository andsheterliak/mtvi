import { BaseKeyboardPickerProps } from '@material-ui/pickers/_shared/hooks/useKeyboardPickerState';
import { memo } from 'react';
import { OptionsDate } from '~/api/tmdb';
import { OptionContainer } from '../OptionContainer';
import { OptionTitle } from '../OptionTitle';
import { DateTitle } from '../types';
import { DatePicker } from './DatePicker';
import { DatePickerContainer } from './DatePickerContainer';

type Props = {
  dateTitle: DateTitle;
  dateFrom: OptionsDate;
  dateTo: OptionsDate;
  setDateFromHandler: BaseKeyboardPickerProps['onChange'];
  setDateToHandler: BaseKeyboardPickerProps['onChange'];
};

const ReleaseDatesOptionComponent = ({
  dateTitle,
  dateFrom,
  dateTo,
  setDateFromHandler,
  setDateToHandler,
}: Props) => {
  return (
    <OptionContainer>
      <OptionTitle>{dateTitle}</OptionTitle>

      <DatePickerContainer>
        <DatePicker
          value={dateFrom}
          onChange={setDateFromHandler}
          id="date-picker-from"
          ariaLabel="change release dates from"
          label="From"
        />

        <DatePicker
          value={dateTo}
          onChange={setDateToHandler}
          id="date-picker-to"
          ariaLabel="change release dates to"
          label="To"
        />
      </DatePickerContainer>
    </OptionContainer>
  );
};

export const ReleaseDatesOption = memo(ReleaseDatesOptionComponent);
