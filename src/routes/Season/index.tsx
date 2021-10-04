import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { IMG_BASE_URL, IMG_SIZES, useGetSeasonQuery } from '~/api/tmdb';
import noImg from '~/assets/img/no-image.svg';
import { BackToHeader, Layout, MainContainer, MainContent, Spacer } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { IdParam, SeasonNumberParam } from '../types';
import { EpisodeCards } from './EpisodeCards';

export const Season = () => {
  useScrollToTop();

  const { id, seasonNumber } = useParams<IdParam & SeasonNumberParam>();
  const seasonQuery = useGetSeasonQuery({ id, seasonNumber });

  useErrorHandler(seasonQuery.error);
  useLazyImages({ isLoading: seasonQuery.isLoading });

  return (
    <>
      {seasonQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {seasonQuery.data!.name}</title>
          <meta name="keywords" content={seasonQuery.data!.name} />
        </Helmet>
      )}

      <Spacer />

      <Layout>
        <BackToHeader
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w154,
            path: seasonQuery.data?.poster_path,
            fallback: noImg,
          })}
          path={`/${ROUTE_NAMES.tvShow}/${id}`}
          linkName="Back to TV Show"
          title={seasonQuery.data?.name}
          isLoading={seasonQuery.isLoading}
        />

        <MainContainer>
          <MainContent>
            <EpisodeCards data={seasonQuery.data} isLoading={seasonQuery.isLoading} />
          </MainContent>
        </MainContainer>
      </Layout>
    </>
  );
};
