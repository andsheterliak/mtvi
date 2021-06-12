import { useSelector } from 'react-redux';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import useTVShows from '~/common/services/tvShow/useTVShows';
import { getTVShowData } from '~common/services/tvShow/tvShowServices';
import TVShowHeader from './TVShowHeader';

import SeriesCast from './SeriesCast';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import Videos from './Videos';
import LastSeason from './LastSeason';

const TVShow = () => {
  useScrollToTop();
  useTVShows();

  const data = useSelector(getTVShowData);

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <MainContainer>
            <Layout>
              <TVShowHeader />

              <Separator />

              <SeriesCast />

              <Separator />

              <LastSeason />

              <Separator />

              <Videos />
            </Layout>
          </MainContainer>
        </MainContent>
      ) : (
        'Loading'
      )}
    </>
  );
};

export default TVShow;
