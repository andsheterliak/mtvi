import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PageHeader from '../common/components/PageHeader/PageHeader';
import Spacing from '../common/components/Spacing';
import Certification from '../common/components/PageHeader/Certification';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { movieActions } from './movieSlice';
import {
  getCertification,
  getDirectorAndWriters,
  getGenres,
  getHyphenOrData,
} from '../common/utils/getData';
import { formatMinutes, formatDataStr } from '../common/utils/date';

const generateDataList = (data) => {
  let certification = getCertification(data.release_dates.results);

  certification = certification ? (
    <Certification certification={certification} />
  ) : (
    getHyphenOrData()
  );

  const { directors, writers } = getDirectorAndWriters(data.credits.crew);
  const releaseDate = formatDataStr(data.release_date)?.dateStr;
  const genres = getGenres(data.genres);
  const time = formatMinutes(data.runtime);

  const dataList = [
    { name: 'Certification', value: certification },
    { name: 'Rating', value: getHyphenOrData(data.vote_average) },
    { name: 'Genres', value: getHyphenOrData(genres) },
    { name: 'Release date', value: getHyphenOrData(releaseDate) },
    { name: 'Status', value: getHyphenOrData(data.status) },
    { name: 'Time', value: getHyphenOrData(time) },
    { name: 'Directors', value: getHyphenOrData(directors) },
    { name: 'Writers', value: getHyphenOrData(writers) },
  ];

  return dataList;
};

const Movie = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { movie } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.fetchMovie(id));

    return () => {
      dispatch(movieActions.resetState());
    };
  }, [dispatch, id]);

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
