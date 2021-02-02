import { IconButton, InputAdornment, InputBase } from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';

import useStyles from './AppBarStyles';

const Search = ({ toggleSearchHandler }) => {
  const classes = useStyles();

  return (
    <>
      <InputBase
        placeholder="Search for a movie, tv show..."
        fullWidth
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={() => {}}
      />

      <IconButton
        edge="end"
        color="inherit"
        aria-label="close search"
        onClick={toggleSearchHandler}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>
    </>
  );
};

export default Search;
