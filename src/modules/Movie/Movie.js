import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PageHeader from '../common/components/PageHeader/PageHeader';
import Spacing from '../common/components/Spacing';
import Certification from '../common/components/PageHeader/Certification';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { moviesActions } from '../Movies/slices/moviesSlice';
import {
  gerCertification,
  getDirectorAndWriters,
  getGenres,
} from '../common/utils/gerData';
import { formatMinutes, formatReleaseDate } from '../common/utils/date';

const Movie = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { movie } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(moviesActions.resetState());
    dispatch(moviesActions.fetchMovie(id));
  }, [dispatch, id]);

  const generateDataList = (data) => {
    let certification = gerCertification(data.release_dates.results);

    certification = certification ? (
      <Certification certification={certification} />
    ) : null;

    const { directors, writers } = getDirectorAndWriters(data.credits.crew);

    const dataList = [
      { name: 'Certification', value: certification },
      { name: 'Rating', value: data.vote_average },
      { name: 'Genres', value: getGenres(data.genres) },
      { name: 'Release date', value: formatReleaseDate(data.release_date) },
      { name: 'Time', value: formatMinutes(data.runtime) },
      { name: 'Directors', value: directors },
      { name: 'Writers', value: writers },
    ];

    return dataList;
  };

  return (
    <>
      <Spacing />

      {movie ? (
        <main>
          <PageHeader
            backdrop={movie.backdrop_path}
            overview={movie.overview}
            title={movie.title}
            dataList={generateDataList(movie)}
          ></PageHeader>
        </main>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Movie;
