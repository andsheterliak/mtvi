import {
  Chip,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import OptionTitle from './OptionTitle';
import DatePickerContainer from './DatePickerContainer';
import DatePicker from './DatePicker';

const useStyles = makeStyles((theme) => ({
  optionContainer: {
    width: '100%',

    '&:not(:last-child)': {
      marginBottom: theme.spacing(4),
    },
  },

  chipItems: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    listStyle: 'none',
    padding: 0,
    margin: '5px 0 0 0',
  },

  chipItem: {
    margin: theme.spacing(0.5),
  },

  chip: {
    transition: 'border 0.2s ease-out',
  },

  chipChosen: {
    border: '1px solid hsla(0, 0%, 0%, 0)',
  },
}));

const marks = Array(11)
  .fill('')
  .map((item, index) => ({ value: index, label: index }));

const AdjustmentBar = ({
  sortByOptions,
  defaultOptions,
  genres,
  toggleGenre,
  changeUserScoreRangeHandler,
}) => {
  const classes = useStyles();

  const menuItems = sortByOptions.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  const genreItems = genres.map(({ name, isSelected }) => {
    return (
      <li key={name} className={classes.chipItem}>
        <Chip
          className={`${classes.chip} ${
            isSelected ? classes.chipChosen : null
          }`}
          variant={isSelected ? 'default' : 'outlined'}
          label={name}
          data-genre={name}
          onClick={toggleGenre}
          component="button"
        />
      </li>
    );
  });

  return (
    <>
      <div className={classes.optionContainer}>
        <OptionTitle>Sort Results By</OptionTitle>

        <InputLabel
          htmlFor="sort-results-by"
          id="sort-results-by-label"
        ></InputLabel>

        <Select
          fullWidth
          labelId="sort-results-by-label"
          id="sort-results-by"
          value={defaultOptions.sortByOptions}
          input={<Input />}
        >
          {menuItems}
        </Select>
      </div>

      <div className={classes.optionContainer}>
        <OptionTitle>Release Dates</OptionTitle>
        <DatePickerContainer>
          <DatePicker
            id="date-picker-from"
            ariaLabel="change date realise dates from"
          />

          <DatePicker
            id="date-picker-to"
            ariaLabel="change date realise dates to"
          />
        </DatePickerContainer>
      </div>

      <div className={classes.optionContainer}>
        <OptionTitle>Genres</OptionTitle>
        <ul className={classes.chipItems}>{genreItems}</ul>
      </div>

      <div className={classes.optionContainer}>
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
      </div>
    </>
  );
};

export default AdjustmentBar;
