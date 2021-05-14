import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton } from '@material-ui/lab';

import OptionContainer from './OptionContainer';
import OptionTitle from './OptionTitle';

const useStyles = makeStyles((theme) => ({
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
    borderRadius: '40px',
    textTransform: 'none',
    padding: '5px 10px',
  },
}));

const GenresOption = ({ genres, toggleGenreHandler }) => {
  const classes = useStyles();

  const genreItems = genres.map(({ name, id, isSelected }) => {
    return (
      <li key={id} className={classes.chipItem}>
        <ToggleButton
          className={classes.chip}
          aria-label={name}
          selected={isSelected}
          onChange={() => toggleGenreHandler(id)}
          size="small"
        >
          {name}
        </ToggleButton>
      </li>
    );
  });

  return (
    <OptionContainer>
      <OptionTitle>Genres</OptionTitle>

      <ul className={classes.chipItems}>{genreItems}</ul>
    </OptionContainer>
  );
};

export default memo(GenresOption);
