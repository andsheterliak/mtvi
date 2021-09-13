import { useParams } from 'react-router-dom';
import { TVShow, useGetTVShowQuery } from '~/api/tmdb';
import { Certification, Creators, PageHeader } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { formatDateStr, formatMinutes, getCertification, getGenres } from '~/shared/utils';
import { IdParam } from '../types';

const getCreatedBy = (data: TVShow['created_by']) => {
  if (!data || data.length === 0) return null;

  return data.map(({ name, id }) => {
    return { name, id };
  });
};

const getNetworks = (data: TVShow['networks']) => {
  if (!data || data.length === 0) return null;

  return data.map((item) => item.name).join(', ');
};

const getDataList = (data: TVShow | undefined) => {
  if (!data) return null;

  const certificationValue = getCertification(data.content_ratings.results);

  const certification = certificationValue ? (
    <Certification certification={certificationValue} />
  ) : null;

  const createdByValue = getCreatedBy(data.created_by);

  const createdBy = createdByValue ? (
    <Creators creators={createdByValue} routeName={ROUTE_NAMES.person} />
  ) : null;

  const genres = getGenres(data.genres);
  const firstAirDate = formatDateStr(data.first_air_date)?.dateStr;
  const time = formatMinutes(data.episode_run_time[0]);
  const networks = getNetworks(data.networks);

  const dataList = [
    { name: 'Certification', value: certification },
    { name: 'Rating', value: data.vote_average },
    { name: 'Genres', value: genres },
    { name: 'First air date', value: firstAirDate },
    { name: 'Status', value: data.status },
    { name: 'Time', value: time },
    { name: 'Creators', value: createdBy },
    { name: 'Networks', value: networks },
  ];

  return dataList;
};

export const TVShowHeader = () => {
  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  return (
    <PageHeader
      isLoading={tvShowQuery.isLoading}
      overview={tvShowQuery.data?.overview}
      title={tvShowQuery.data?.name}
      dataList={getDataList(tvShowQuery.data)}
      imagePath={tvShowQuery.data?.backdrop_path}
    />
  );
};
