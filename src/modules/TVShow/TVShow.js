import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PageHeader from '../common/components/PageHeader/PageHeader';
import Spacer from '../common/components/Spacer';
import Certification from '../common/components/PageHeader/Certification';
import Creators from '../common/components/PageHeader/Creators';
import MainContent from '../common/components/MainContent';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { formatMinutes, formatDataStr } from '../common/utils/date';
import {
  checkIfIsData,
  getCertification,
  getGenres,
} from '../common/utils/getData';
import { tvShowActions } from './tvShowSlice';

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

const TVShow = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { tvShow } = useSelector((state) => state.tvShow);

  useEffect(() => {
    dispatch(tvShowActions.fetchTVShow(id));

    return () => {
      dispatch(tvShowActions.resetState());
    };
  }, [dispatch, id]);

  return (
    <>
      <Spacer />

      {tvShow ? (
        <MainContent>
          <PageHeader
            backdrop={tvShow.backdrop_path}
            overview={tvShow.overview}
            title={tvShow.name}
            dataList={generateDataList(tvShow)}
          ></PageHeader>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default TVShow;
