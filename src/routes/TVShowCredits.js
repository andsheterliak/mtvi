import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetTVShowQuery } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import noUserPhotoImg from '~/assets/img/no-user-photo.svg';
import { BackToHeader, Credits } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getCreditsData } from '~/shared/selectors';
import { getImagePath } from '~/shared/utils';

export const TVShowCredits = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetTVShowQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading });

  return (
    <Credits
      isLoading={isLoading}
      credits={getCreditsData(data?.aggregate_credits)}
      routeName={ROUTE_NAMES.person}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profileFace,
        fallback: noUserPhotoImg,
      }}
      header={
        <BackToHeader
          isLoading={isLoading}
          title={data?.name}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: data?.poster_path,
            size: IMG_SIZES.poster.w154,
            fallback: noImageImg,
          })}
          path={`/${ROUTE_NAMES.tvShow}/${data?.id}`}
          linkName="Back to TV Show"
        />
      }
    />
  );
};
