import { useErrorHandler } from 'react-error-boundary';
import { useParams, useRouteMatch } from 'react-router';
import { IMG_BASE_URL, IMG_SIZES, useGetSeasonQuery } from '~/api/tmdb';
import noWideImg from '~/assets/img/no-image-wide.svg';
import noImg from '~/assets/img/no-image.svg';
import {
  BackToHeader,
  Layout,
  MainContainer,
  MainContent,
  Spacer,
} from '~/components';
import { ROUTE_NAMES } from '~/constants';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { getImagePath } from '~/utils';
import { EpisodeCards } from './components/EpisodeCards';

export const Season = () => {
  useScrollToTop();

  const { id, seasonNumber } = useParams();
  const { url } = useRouteMatch();
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
            <EpisodeCards
              isLoading={isLoading}
              data={data?.episodes}
              basePath={url}
              imgData={{
                basePath: IMG_BASE_URL,
                size: IMG_SIZES.still.w500,
                fallback: noWideImg,
              }}
            />
          </MainContent>
        </MainContainer>
      </Layout>
    </>
  );
};
