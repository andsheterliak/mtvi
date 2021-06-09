import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { formatDataStr, formatMinutes } from '~common/utils/date';
import {
  checkIfIsData,
  getCertification,
  getGenres,
} from '~common/utils/getData';
import Certification from '~components/header/Certification';
import Creators from '~components/header/Creators';
import PageHeader from '~components/PageHeader';
import { getData } from '../movieSelectors';

const getDirectors = (crew) => {
  if (!checkIfIsData(crew)) return null;

  const directors = [];

  crew.forEach(({ job, name, id }) => {
    if (job === 'Director') directors.push({ name, id });
  });

  return directors;
};

const getDataList = createSelector(getData, (data) => {
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
});

const MovieHeader = () => {
  const data = useSelector(getData);
  const dataList = useSelector(getDataList);

  return (
    <PageHeader
      backdrop={data.backdrop_path}
      overview={data.overview}
      title={data.title}
      dataList={dataList}
    />
  );
};

export default MovieHeader;
