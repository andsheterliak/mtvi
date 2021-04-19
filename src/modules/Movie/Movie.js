import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PageHeader from '../common/components/PageHeader/PageHeader';
import Spacer from '../common/components/Spacer';
import Certification from '../common/components/PageHeader/Certification';
import Creators from '../common/components/PageHeader/Creators';
import MainContent from '../common/components/MainContent';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { movieActions } from './movieSlice';
import {
  checkIfIsData,
  getCertification,
  getGenres,
} from '../common/utils/getData';
import { formatMinutes, formatDataStr } from '../common/utils/date';

const getDirectors = (crew) => {
  if (!checkIfIsData(crew)) return null;

  const directors = [];

  crew.forEach(({ job, name, id }) => {
    if (job === 'Director') directors.push({ name, id });
  });

  return directors;
};

const generateDataList = (data) => {
  let certification = getCertification(data.release_dates?.results);

  certification = certification && (
    <Certification certification={certification} />
  );

  let directors = getDirectors(data.credits?.crew);

  directors = directors && <Creators creators={directors} />;

  const releaseDate = formatDataStr(data.release_date)?.dateStr;
  const genres = getGenres(data.genres);
  const time = formatMinutes(data.runtime);

  const dataList = [
    { name: 'Certification', value: certification },
    { name: 'Rating', value: data.vote_average },
    { name: 'Genres', value: genres },
    { name: 'Release date', value: releaseDate },
    { name: 'Status', value: data.status },
    { name: 'Time', value: time },
    { name: 'Directors', value: directors },
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
      <Spacer />

      {movie ? (
        <MainContent>
          <PageHeader
            backdrop={movie.backdrop_path}
            overview={movie.overview}
            title={movie.title}
            dataList={generateDataList(movie)}
          ></PageHeader>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default Movie;
