import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ToggleButton } from '@material-ui/lab';
import { memo } from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { Genre, SelectedGenres } from '~/api/tmdb';
import { useRovingTabindex } from '~/shared/hooks';
import { OptionContainer } from './OptionContainer';
import { OptionTitle } from './OptionTitle';

const useStyles = makeStyles(({ spacing, palette }) => {
  return createStyles({
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
      color: palette.text.secondary,
    },
  });
});

type ToggleGenreHandler = (id: Genre['id']) => void;

type GenreOptionProps = {
  genre: SelectedGenres[0];
  toggleGenreHandler: ToggleGenreHandler;
};

const GenreOption = ({ genre, toggleGenreHandler }: GenreOptionProps) => {
  const classes = useStyles();
  const rovingTabindex = useRovingTabindex<HTMLButtonElement>();

  return (
    <li className={classes.chipItem}>
      <ToggleButton
        {...rovingTabindex}
        className={classes.chip}
        aria-label={genre.name}
        selected={genre.isSelected}
        onChange={() => toggleGenreHandler(genre.id)}
        size="small"
        value={genre.name}
      >
        {genre.name}
      </ToggleButton>
    </li>
  );
};

type GenresOptionProps = {
  genres: SelectedGenres;
  toggleGenreHandler: ToggleGenreHandler;
};

export const GenresOptionComponent = ({ genres, toggleGenreHandler }: GenresOptionProps) => {
  const classes = useStyles();

  const genreItems = genres.map((genre) => {
    return <GenreOption key={genre.id} genre={genre} toggleGenreHandler={toggleGenreHandler} />;
  });

  return (
    <OptionContainer>
      <OptionTitle>Genres</OptionTitle>

      <ul className={classes.chipItems}>
        <RovingTabIndexProvider options={{ loopAround: true }}>{genreItems}</RovingTabIndexProvider>
      </ul>
    </OptionContainer>
  );
};

export const GenresOption = memo(GenresOptionComponent);
