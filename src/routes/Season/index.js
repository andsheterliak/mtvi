import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router';
import { IMG_BASE_URL, IMG_SIZES, useGetSeasonQuery } from '~/api/tmdb';
import noImg from '~/assets/img/no-image.svg';
import {
  BackToHeader,
  Layout,
  MainContainer,
  MainContent,
  Spacer,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { EpisodeCards } from './EpisodeCards';

export const Season = () => {
  useScrollToTop();

  const { id, seasonNumber } = useParams();
  const { data, error, isLoading } = useGetSeasonQuery({ id, seasonNumber });

  useErrorHandler(error);
  useLazyImages({ isLoading });

  return (
    <>
      <Spacer />

      <Layout>
        <BackToHeader
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w154,
            path: data?.poster_path,
            fallback: noImg,
          })}
          path={`/${ROUTE_NAMES.tvShow}/${id}`}
          linkName="Back to TV Show"
          title={data?.name}
          isLoading={isLoading}
        />

        <MainContainer>
          <MainContent>
            <EpisodeCards />
          </MainContent>
        </MainContainer>
      </Layout>
    </>
  );
};
