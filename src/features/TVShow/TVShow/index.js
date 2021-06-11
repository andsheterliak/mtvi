import { useSelector } from 'react-redux';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import TVShowHeader from './TVShowHeader';

import SeriesCast from './SeriesCast';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import useTVShows from '../hooks/useTVShows';
import Videos from './Videos';
import LastSeason from './LastSeason';
import { getData } from '../tvShowSelectors';

const TVShow = () => {
  useScrollToTop();
  useTVShows();

  const data = useSelector(getData);

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
