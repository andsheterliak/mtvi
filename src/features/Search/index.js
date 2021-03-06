import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Fade,
  IconButton,
  InputBase,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useErrorHandler } from 'react-error-boundary';

import MainContainer from '~components/MainContainer';
import SearchItems from './components/SearchItems';
import useDebounceEffect from './useDebounceEffect';
import { ROUTE_NAMES } from '~common/constants';
import { IMG_BASE_URL, IMG_SIZES, SEARCH_PATHS } from '~common/tmdb-config';
import { useGetSearchQuery } from '~common/services/tmdb';
import noImage from '~assets/img/no-image.svg';
import noUserPhoto from '~assets/img/no-user-photo.svg';
import useLazyImages from '~common/hooks/useLazyImages';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: 0,
    top: '110%',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    boxShadow: theme.shadows[1],
    maxHeight: 'calc(100vh - 210%)',
    overflow: 'auto',

    [theme.breakpoints.up('sm')]: {
      width: '500px',
    },
  },

  form: {
    padding: `${theme.spacing(1.5)}px 0`,
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
}));

const Search = ({ isSearchVisible, closeSearchHandler }) => {
  const classes = useStyles();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [isReadyToFetch, setIsReadyToFetch] = useState(false);

  const { data, error, isFetching, isSuccess } = useGetSearchQuery(
    { query },
    { skip: !isReadyToFetch }
  );

  useErrorHandler(error);
  useLazyImages({
    isLoading: isFetching,
    triggers: [isSuccess, isSearchVisible],
  });

  useDebounceEffect({
    effect() {
      setIsReadyToFetch(true);
    },

    deps: [query],
    delay: 700,
  });

  const clearHandler = () => {
    setIsReadyToFetch(false);
    setQuery('');
  };

  const inputHandler = (event) => {
    setIsReadyToFetch(false);
    setQuery(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!data || !query) return;

    const searchParams = new URLSearchParams();

    searchParams.set(
      'searchIn',
      SEARCH_PATHS[data.results?.[0].media_type] || SEARCH_PATHS.movie
    );
    searchParams.set('query', query);

    history.push(`/${ROUTE_NAMES.search}?${searchParams}`);
    closeSearchHandler(event);
  };

  return (
    <Fade mountOnEnter unmountOnExit in={isSearchVisible}>
      <Box onKeyDown={closeSearchHandler} className={classes.root}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          spellCheck="false"
          onSubmit={submitHandler}
        >
          <MainContainer>
            <InputLabel htmlFor="search"></InputLabel>
            <InputBase
              id="search"
              placeholder="Search for a movie, tv show..."
              fullWidth
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={query}
              endAdornment={
                <>
                  <IconButton
                    disabled={isFetching}
                    edge="end"
                    aria-label="search"
                    onClick={submitHandler}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    disabled={isFetching}
                    edge="end"
                    aria-label="clear search"
                    onClick={clearHandler}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
              onChange={inputHandler}
            />
          </MainContainer>
        </form>

        {query && (
          <SearchItems
            isLoading={isFetching}
            data={data?.results}
            searchPaths={SEARCH_PATHS}
            routeNames={ROUTE_NAMES}
            imgData={{
              basePath: IMG_BASE_URL,
              person: {
                size: IMG_SIZES.profile.w185,
                fallback: noUserPhoto,
              },
              common: {
                size: IMG_SIZES.poster.w92,
                fallback: noImage,
              },
            }}
            clickHandler={closeSearchHandler}
          />
        )}
      </Box>
    </Fade>
  );
};

export { default as useToggleSearch } from './useToggleSearch';
export default Search;
