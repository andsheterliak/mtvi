import { Slider } from '@material-ui/core';
import { useMemo } from 'react';
import OptionContainer from './OptionContainer';
import OptionTitle from './OptionTitle';

const UserScoreOption = ({
  userScoreRange: { min, max },
  changeUserScoreHandler,
  userScore,
}) => {
  const marks = useMemo(() => {
    return Array(max + 1)
      .fill('')
      .map((item, index) => ({ value: index, label: index }));
  }, [max]);

  return (
    <OptionContainer>
      <OptionTitle id="user-score-range-slider">User Score</OptionTitle>

      <Slider
        value={userScore}
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

export default UserScoreOption;
