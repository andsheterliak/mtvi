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
import { getData } from '../tvShowSelectors';

const getCreatedBy = (data) => {
  if (!checkIfIsData(data)) return null;

  return data.map(({ name, id }) => {
    return { name, id };
  });
};

const getNetworks = (data) => {
  if (!checkIfIsData(data)) return null;

  return data.map((item) => item.name).join(', ');
};

const getDataList = createSelector(getData, (data) => {
  let certification = getCertification(data.content_ratings?.results);

  certification = certification && (
    <Certification certification={certification} />
  );

  let createdBy = getCreatedBy(data.created_by);

  createdBy = createdBy && <Creators creators={createdBy} />;

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
});

const TVShowHeader = () => {
  const data = useSelector(getData);
  const dataList = useSelector(getDataList);

  return (
    <PageHeader
      backdrop={data.backdrop_path}
      overview={data.overview}
      title={data.name}
      dataList={dataList}
    ></PageHeader>
  );
};

export default TVShowHeader;
