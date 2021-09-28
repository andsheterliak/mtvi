import { Box, Fade, IconButton, InputBase, InputLabel } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { SEARCH_PATHS, useGetSearchQuery } from '~/api/tmdb';
import { MainContainer, VisuallyHidden } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages } from '~/shared/hooks';
import { CloseSearchHandler } from './search-types';
import { SearchItems } from './SearchItems';
import { useDebounceEffect } from './useDebounceEffect';

const useStyles = makeStyles(({ palette, shadows, breakpoints, spacing }) =>
  createStyles({
    root: {
      position: 'absolute',
      right: 0,
      top: '110%',
      backgroundColor: palette.background.paper,
      width: '100%',
      boxShadow: shadows[1],
      maxHeight: 'calc(100vh - 210%)',
      overflow: 'auto',

      [breakpoints.up('sm')]: {
        width: '500px',
      },
    },

    form: {
      padding: `${spacing(1.5)}px 0`,
      backgroundColor: palette.background.paper,
      zIndex: 1,
      borderBottom: `5px solid ${palette.primary.main}`,
    },
  })
);

type Props = {
  isSearchVisible: boolean;
  closeSearchHandler: CloseSearchHandler;
};

export const Search = ({ isSearchVisible, closeSearchHandler }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const [query, setQuery] = useState('');

  const SearchQuery = useGetSearchQuery(query);

  useErrorHandler(SearchQuery.error);

  useLazyImages({
    isLoading: SearchQuery.isFetching,
    triggers: [isSearchVisible, SearchQuery.data, SearchQuery.isPreviousData],
  });

  useDebounceEffect({
    effect() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      if (query && (SearchQuery.isIdle || SearchQuery.isPreviousData)) SearchQuery.refetch();
    },

    deps: [query],
    delay: 700,
  });

  const clearHandler = () => {
    setQuery('');
  };

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!SearchQuery.data || !query) return;

    const searchParams = new URLSearchParams();

    searchParams.set(
      'searchIn',
      SEARCH_PATHS[SearchQuery.data.results[0]?.media_type] || SEARCH_PATHS.movie
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
            <VisuallyHidden>
              <InputLabel htmlFor="search">Search for a movie, tv show or person.</InputLabel>
            </VisuallyHidden>

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
                    disabled={SearchQuery.isFetching}
                    edge="end"
                    aria-label="search"
                    onClick={submitHandler}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    disabled={SearchQuery.isFetching}
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
            isLoading={SearchQuery.isFetching}
            data={SearchQuery.data?.results}
            clickHandler={closeSearchHandler}
          />
        )}
      </Box>
    </Fade>
  );
};

export { useToggleSearch } from './useToggleSearch';
