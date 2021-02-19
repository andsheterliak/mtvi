import { Slider } from '@material-ui/core';
import OptionContainer from './OptionContainer';
import OptionTitle from './OptionTitle';

const marks = Array(11)
  .fill('')
  .map((item, index) => ({ value: index, label: index }));

const UserScore = ({ defaultOptions, changeUserScoreRangeHandler }) => {
  return (
    <OptionContainer>
      <OptionTitle id="user-score-range-slider">User Score</OptionTitle>

      <Slider
        value={defaultOptions.userScoreRange}
        onChange={changeUserScoreRangeHandler}
        valueLabelDisplay="auto"
        aria-labelledby="user-score-range-slider"
        min={0}
        max={10}
        marks={marks}
      />
    </OptionContainer>
  );
};

export default UserScore;
