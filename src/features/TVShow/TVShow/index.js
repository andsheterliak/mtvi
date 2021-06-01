import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import TVShowHeader from '../TVShowHeader';

import SeriesCast from './SeriesCast';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import useTVShowsState from '../hooks/useTVShowsState';
import Videos from './Videos';
import LastSeason from './LastSeason';

const TVShow = () => {
  useScrollToTop();

  const { data } = useTVShowsState();

  return (
    <>
      <Spacer />

      {data ? (
        <MainContent>
          <TVShowHeader />

          <Spacer />

          <MainContainer>
            <Layout>
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
