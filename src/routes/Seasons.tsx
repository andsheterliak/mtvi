import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetTVShowQuery } from '~/api/tmdb';
import noImg from '~/assets/img/no-image.svg';
import {
  BackToHeader,
  MainContainer,
  MainContent,
  NoContent,
  SeasonCards,
  Spacer,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { IdParam } from './types';

export const Seasons = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  useErrorHandler(tvShowQuery.error);
  useLazyImages({ isLoading: tvShowQuery.isLoading });

  const seasonsCards =
    !tvShowQuery.isLoading && !tvShowQuery.data ? (
      <NoContent message="We don't have added any seasons." />
    ) : (
      <SeasonCards
        isLoading={tvShowQuery.isLoading}
        data={tvShowQuery.data?.seasons}
        basePath={`/${ROUTE_NAMES.tvShow}/${tvShowQuery.data?.id}/${ROUTE_NAMES.season}`}
      />
    );

  return (
    <>
      {tvShowQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {tvShowQuery.data!.name} | Seasons</title>
          <meta name="keywords" content={`${tvShowQuery.data!.name}, seasons`} />
        </Helmet>
      )}

      <Spacer />

      <MainContent>
        <BackToHeader
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w154,
            path: tvShowQuery.data?.poster_path,
            fallback: noImg,
          })}
          linkName="Back to TV Show"
          title={tvShowQuery.data?.name}
          path={`/${ROUTE_NAMES.tvShow}/${tvShowQuery.data?.id}`}
          isLoading={tvShowQuery.isLoading}
        />

        <Spacer />

        <MainContainer>{seasonsCards}</MainContainer>
      </MainContent>
    </>
  );
};
