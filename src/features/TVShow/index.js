import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import useScrollToTop from '~common/hooks/useScrollToTop';

import Spacer from '~common/components/Spacer';
import MainContent from '~common/components/MainContent';
import { useGetTVShowQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';
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
  const { data, error, isLoading } = useGetTVShowQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading });

  return (
    <>
      <Spacer />
      <MainContent>
        <MainContainer>
          <Layout>
            <TVShowHeader isLoading={isLoading} data={data} />

            <Separator />

            <SeriesCast isLoading={isLoading} data={data} />

            <Separator />

            <LastSeason isLoading={isLoading} data={data} />

            <Separator />

            <TVShowVideos isLoading={isLoading} data={data} />
          </Layout>
        </MainContainer>
      </MainContent>
    </>
  );
};

export default TVShow;
