import { memo } from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

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
    transition: 'border 0.2s ease-out',
  },

  chipChosen: {
    border: '1px solid hsla(0, 0%, 0%, 0)',
  },
}));

const GenresOption = ({ genres, toggleGenreHandler }) => {
  const classes = useStyles();

  const genreItems = genres.map(({ name, id, isSelected }) => {
    return (
      <li key={id} className={classes.chipItem}>
        <Chip
          className={classNames(classes.chip, {
            [classes.chipChosen]: isSelected,
          })}
          variant={isSelected ? 'default' : 'outlined'}
          label={name}
          onClick={() => toggleGenreHandler(id)}
          component="button"
        />
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
