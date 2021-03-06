import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ActionsButtons from '../common/components/ActionsButtons';
import AdjustmentBar from '../common/components/Adjustment/AdjustmentBar';
import AdjustmentButton from '../common/components/AdjustmentButton';
import Cards from '../common/components/Cards/Cards';
import LoadMoreBtn from '../common/components/LoadMoreBtn';
import Modal from '../common/components/Modal';
import PageContainer from '../common/components/PageContainer';
import CardsGrid from '../common/components/Cards/CardsGrid';
import useScrollToTop from '../common/hooks/useScrollToTop';

import { sortByOptions, defaultOptions } from '../common/fake-data';
import { MOVIES_DEFAULT_OPTIONS } from '../common/tmdb-config';
import { getLS } from '../common/utils/storage';
import { moviesActions } from './slices/moviesSlice';

// ! Try useReducer for complex state.

const changeGenres = (genresList, id) => {
  return genresList.map((item) => {
    if (item.id === id) {
      return { ...item, isSelected: !item.isSelected };
    }

    return item;
  });
};

const Movies = ({ routeName }) => {
  useScrollToTop();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const dispatch = useDispatch();

  const [genres, setGenres] = useState(() => {
    const movieGenres = getLS('moviesUserOptions')?.genres;

    if (movieGenres) return movieGenres;

    return MOVIES_DEFAULT_OPTIONS.genres;
  });

  const movies = useSelector((state) => state.movies.data);

  const openModalHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalHandler = () => {
    setIsModalOpened(false);
  };

  const toggleGenreHandler = (id) => {
    setGenres((prevGenres) => {
      return changeGenres(prevGenres, id);
    });
  };

  useEffect(() => {
    let options = getLS('moviesUserOptions');

    if (!options) options = MOVIES_DEFAULT_OPTIONS;

    dispatch(moviesActions.fetchMoviesData(options));
  }, [dispatch]);

  return (
    <PageContainer routeName={routeName}>
      <AdjustmentButton
        ariaLAbel="adjust movies"
        openModalHandler={openModalHandler}
        modal={
          <Modal
            isOpened={isModalOpened}
            closeModalHandler={closeModalHandler}
            title="Adjust Movies"
            content={
              <AdjustmentBar
                sortByOptions={sortByOptions}
                defaultOptions={defaultOptions}
                genres={genres}
                dateTitle="Release Dates"
                toggleGenreHandler={toggleGenreHandler}
              />
            }
            actions={<ActionsButtons />}
          />
        }
      />

      <CardsGrid>
        {movies.length ? <Cards cardsData={movies} /> : 'Loading...'}
      </CardsGrid>

      <LoadMoreBtn />
    </PageContainer>
  );
};

export default Movies;
