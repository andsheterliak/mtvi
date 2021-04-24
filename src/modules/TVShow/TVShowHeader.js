import { useSelector } from 'react-redux';

import { formatDataStr, formatMinutes } from '~common/utils/date';
import {
  checkIfIsData,
  getCertification,
  getGenres,
} from '~common/utils/getData';
import Certification from '~components/PageHeader/Certification';
import Creators from '~components/PageHeader/Creators';
import PageHeader from '~components/PageHeader/PageHeader';

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

const generateDataList = (data) => {
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
};

const TVShowHeader = () => {
  const { tvShow } = useSelector((state) => state.tvShow);

  const dataList = generateDataList(tvShow);

  return (
    <PageHeader
      backdrop={tvShow.backdrop_path}
      overview={tvShow.overview}
      title={tvShow.name}
      dataList={dataList}
    ></PageHeader>
  );
};

export default TVShowHeader;
