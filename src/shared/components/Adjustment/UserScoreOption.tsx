import { Slider } from '@material-ui/core';
import { useMemo } from 'react';
import { Options, UserScoreRange } from '~/api/tmdb';
import { OptionContainer } from './OptionContainer';
import { OptionTitle } from './OptionTitle';
import { UserScoreEvent, UserScoreValue } from './types';

type Props = {
  userScoreRange: UserScoreRange;
  changeUserScoreHandler(event: UserScoreEvent, value: UserScoreValue): void;
  userScore: Options['userScore'];
};

export const UserScoreOption = ({
  userScoreRange: { min, max },
  changeUserScoreHandler,
  userScore,
}: Props) => {
  const marks = useMemo(() => {
    return Array(max + 1)
      .fill('')
      .map((item, index) => ({ value: index, label: index }));
  }, [max]);

  return (
    <OptionContainer>
      <OptionTitle id="user-score-range-slider">User Score</OptionTitle>

      <Slider
        value={[...userScore]} // ! If set 'userScore' without spreading it shows TypeError: Cannot assign to read only property '0' of object '[object Array]'[object Array]', I don't understand why. Default 'userScore' is [0, 10].
        onChange={changeUserScoreHandler}
        valueLabelDisplay="auto"
        aria-labelledby="user-score-range-slider"
        min={min}
        max={max}
        marks={marks}
      />
    </OptionContainer>
  );
};
