import { useParams } from 'react-router-dom';
import { Crew, Movie, useGetMovieQuery } from '~/api/tmdb';
import { Certification, CreatorItems, Creators, PageHeader } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { formatDateStr, formatMinutes, getCertification, getGenres } from '~/shared/utils';
import { IdParam } from '../types';

const getDirectors = (crew: Crew) => {
  if (crew.length === 0) return null;

  const directors: CreatorItems = [];

  crew.forEach(({ job, name, id }) => {
    if (job === 'Director') directors.push({ name, id });
  });

  return directors;
};

const getDataList = (data: Movie | undefined) => {
  if (!data) return null;

  const certificationValue = getCertification(data.release_dates.results);

  const certification = certificationValue ? (
    <Certification certification={certificationValue} />
  ) : null;

  const directorsData = getDirectors(data.credits.crew);

  const directors =
    directorsData && directorsData.length !== 0 ? (
      <Creators creators={directorsData} routeName={ROUTE_NAMES.person} />
    ) : null;

  const releaseDate = formatDateStr(data.release_date)?.dateStr;
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
  const { id } = useParams<IdParam>();
  const { data, isLoading } = useGetMovieQuery(id);

  return (
    <PageHeader
      isLoading={isLoading}
      overview={data?.overview}
      title={data?.title}
      dataList={getDataList(data)}
      imagePath={data?.backdrop_path}
    />
  );
};
