import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton } from '@material-ui/lab';
import { memo } from 'react';
import { OptionContainer } from './OptionContainer';
import { OptionTitle } from './OptionTitle';

const useStyles = makeStyles(({ spacing }) => ({
  chipItems: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    listStyle: 'none',
    padding: 0,
    margin: '5px 0 0 0',
  },

  chipItem: {
    margin: spacing(0.5),
  },

  chip: {
    borderRadius: '40px',
    textTransform: 'none',
    padding: '5px 10px',
  },
}));

export const GenresOptionComponent = ({ genres, toggleGenreHandler }) => {
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
          value={name}
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

export const GenresOption = memo(GenresOptionComponent);
