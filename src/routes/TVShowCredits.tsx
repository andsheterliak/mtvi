import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetTVShowQuery } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import { BackToHeader, Credits } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { IdParam } from './types';

export const TVShowCredits = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  useErrorHandler(tvShowQuery.error);
  useLazyImages({ isLoading: tvShowQuery.isLoading });

  return (
    <Credits
      isLoading={tvShowQuery.isLoading}
      credits={tvShowQuery.data?.aggregate_credits}
      routeName={ROUTE_NAMES.person}
      header={
        <BackToHeader
          isLoading={tvShowQuery.isLoading}
          title={tvShowQuery.data?.name}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: tvShowQuery.data?.poster_path,
            size: IMG_SIZES.poster.w154,
            fallback: noImageImg,
          })}
          path={`/${ROUTE_NAMES.tvShow}/${tvShowQuery.data?.id}`}
          linkName="Back to TV Show"
        />
      }
    />
  );
};
