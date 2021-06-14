import { useParams } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';

import { formatDataStr, formatMinutes } from '~common/utils/date';
import { ifIsData, getCertification, getGenres } from '~common/utils/getData';
import { ROUTE_NAMES } from '~common/constants';
import { useGetMovieQuery } from '~common/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import Certification from '~components/header/Certification';
import Creators from '~components/header/Creators';
import PageHeader from '~components/PageHeader';

const getDirectors = (crew) => {
  if (!ifIsData(crew)) return null;

  const directors = [];

  crew.forEach(({ job, name, id }) => {
    if (job === 'Director') directors.push({ name, id });
  });

  return directors;
};

const getDataList = createSelector(
  (data) => data,
  (data) => {
    let certification = getCertification(data.release_dates?.results);

    certification = certification && (
      <Certification certification={certification} />
    );

    let directors = getDirectors(data.credits?.crew);
    directors = ifIsData(directors) ? (
      <Creators creators={directors} routeName={ROUTE_NAMES.person} />
    ) : null;

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
  }
);

const MovieHeader = () => {
  const { id } = useParams();

  const { data, dataList } = useGetMovieQuery(id, {
    selectFromResult: (result) => ({
      data: result.data,
      dataList: getDataList(result.data),
    }),
  });

  return (
    <PageHeader
      overview={data.overview}
      title={data.title}
      dataList={dataList}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.backdrop,
        path: data.backdrop_path,
        fallback: null,
      }}
    />
  );
};

export default MovieHeader;
