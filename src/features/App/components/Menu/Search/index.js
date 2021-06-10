import { Grow, InputBase, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import MainContainer from '~components/MainContainer';
import IconBtn from '../IconBtn';
import SearchIn from './SearchIn';

export { default as useSearch } from './useSearch';

const useStyles = makeStyles((theme) => ({
  form: {
    position: 'absolute',
    left: 0,
    top: '110%',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    visibility: 'visible', // To preserve on scroll down if is not unmounted.
  },
}));

const Search = ({
  isSearchVisible,
  submitSearchHandler,
  inputSearchHandler,
  clearSearchHandler,
  value,
  searchPaths,
  searchInValue,
  menuFilterAnchorEl,
  isMenuFilterOpened,
  selectMenuFilterItemHandler,
  openMenuFilterHandler,
  closeMenuFilterHandler,
}) => {
  const classes = useStyles();

  return (
    <Grow mountOnEnter unmountOnExit in={isSearchVisible}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        spellCheck="false"
        onSubmit={submitSearchHandler}
      >
        <MainContainer>
          <InputLabel htmlFor="search"></InputLabel>
          <InputBase
            id="search"
            placeholder="Search for a movie, tv show..."
            fullWidth
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            value={value}
            endAdornment={
              <>
                <SearchIn
                  searchPaths={searchPaths}
                  searchInValue={searchInValue}
                  menuFilterAnchorEl={menuFilterAnchorEl}
                  isMenuFilterOpened={isMenuFilterOpened}
                  selectMenuFilterItemHandler={selectMenuFilterItemHandler}
                  openMenuFilterHandler={openMenuFilterHandler}
                  closeMenuFilterHandler={closeMenuFilterHandler}
                />

                <IconBtn
                  ariaLabel="search"
                  edge="end"
                  icon={SearchIcon}
                  size="sm"
                  clickHandler={submitSearchHandler}
                />

                <IconBtn
                  ariaLabel="clear search"
                  edge="end"
                  icon={CloseIcon}
                  size="sm"
                  clickHandler={clearSearchHandler}
                />
              </>
            }
            onChange={inputSearchHandler}
          />
        </MainContainer>
      </form>
    </Grow>
  );
};

export default Search;