import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetMovieQuery } from '~/api/tmdb';
import { Certification, Creators, PageHeader } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import {
  formatDataStr,
  formatMinutes,
  getCertification,
  getGenres,
  ifIsData,
} from '~/shared/utils';

const getDirectors = (crew) => {
  if (!ifIsData(crew)) return null;

  const directors = [];

  crew.forEach(({ job, name, id }) => {
    if (job === 'Director') directors.push({ name, id });
  });

  return directors;
};

const getDataList = (data) => {
  if (!data) return null;

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
};

export const MovieHeader = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMovieQuery(id);

  return (
    <PageHeader
      isLoading={isLoading}
      overview={data?.overview}
      title={data?.title}
      dataList={getDataList(data)}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.backdrop,
        path: data?.backdrop_path,
        fallback: null,
      }}
    />
  );
};
