import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PageHeader from '../common/components/PageHeader/PageHeader';
import Spacing from '../common/components/Spacing';
import Certification from '../common/components/PageHeader/Certification';

import useScrollToTop from '../common/hooks/useScrollToTop';
import { formatMinutes, formatReleaseDate } from '../common/utils/date';
import { getCertification, getGenres } from '../common/utils/gerData';
import { tvShowsActions } from '../TVShows/slices/tvShowsSlice';

const getCreatedBy = (data) => data.map((item) => item.name).join(', ');

const TVShow = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { tvShow } = useSelector((state) => state.tvShows);

  useEffect(() => {
    dispatch(tvShowsActions.resetState());
    dispatch(tvShowsActions.fetchTVShow(id));
  }, [dispatch, id]);

  const generateDataList = (data) => {
    let certification = getCertification(data.content_ratings.results);

    certification = certification ? (
      <Certification certification={certification} />
    ) : null;

    const dataList = [
      { name: 'Certification', value: certification },
      { name: 'Rating', value: data.vote_average },
      { name: 'Genres', value: getGenres(data.genres) },
      { name: 'First air date', value: formatReleaseDate(data.first_air_date) },
      { name: 'Time', value: formatMinutes(data.episode_run_time[0]) },
      { name: 'Status', value: data.status },
      { name: 'Creators', value: getCreatedBy(data.created_by) },
    ];

    return dataList;
  };

  return (
    <>
      <Spacing />

      {tvShow ? (
        <main>
          <PageHeader
            backdrop={tvShow.backdrop_path}
            overview={tvShow.overview}
            title={tvShow.name}
            dataList={generateDataList(tvShow)}
          ></PageHeader>
        </main>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default TVShow;
