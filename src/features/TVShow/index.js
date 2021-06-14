import { useParams } from 'react-router-dom';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import { useGetTVShowQuery } from '~common/services/tmdb';
import TVShowHeader from './TVShowHeader';

import SeriesCast from './SeriesCast';
import Layout from '~components/Layout';
import Separator from '~components/Separator';
import MainContainer from '~components/MainContainer';
import TVShowVideos from './TVShowVideos';
import LastSeason from './LastSeason';

const TVShow = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data } = useGetTVShowQuery(id);

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

              <TVShowVideos />
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
