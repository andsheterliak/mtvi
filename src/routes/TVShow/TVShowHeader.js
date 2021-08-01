import { createSelector } from '@reduxjs/toolkit';
import { Certification, Creators, PageHeader } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~/api/tmdb';
import {
  formatDataStr,
  formatMinutes,
  getCertification,
  getGenres,
  ifIsData,
} from '~/shared/utils';

const getCreatedBy = (data) => {
  if (!ifIsData(data)) return null;

  return data.map(({ name, id }) => {
    return { name, id };
  });
};

const getNetworks = (data) => {
  if (!ifIsData(data)) return null;

  return data.map((item) => item.name).join(', ');
};

const getDataList = createSelector(
  (data) => data,
  (data) => {
    if (!data) return null;

    let certification = getCertification(data.content_ratings?.results);

    certification = certification && (
      <Certification certification={certification} />
    );

    let createdBy = getCreatedBy(data.created_by);

    createdBy = createdBy && (
      <Creators creators={createdBy} routeName={ROUTE_NAMES.person} />
    );

    const genres = getGenres(data.genres);
    const firstAirDate = formatDataStr(data.first_air_date)?.dateStr;
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
  }
);

export const TVShowHeader = ({ isLoading, data }) => {
  const dataList = getDataList(data);

  return (
    <PageHeader
      isLoading={isLoading}
      overview={data?.overview}
      title={data?.name}
      dataList={dataList}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.backdrop,
        path: data?.backdrop_path,
        fallback: null,
      }}
    />
  );
};
