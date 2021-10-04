import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetMovieQuery } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import { BackToHeader, Credits } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { IdParam } from './types';

export const MovieCredits = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const movieQuery = useGetMovieQuery(id);

  useErrorHandler(movieQuery.error);
  useLazyImages({ isLoading: movieQuery.isLoading });

  return (
    <>
      {movieQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {movieQuery.data!.title} | Credits</title>
          <meta name="keywords" content={`${movieQuery.data!.title}, credits`} />
        </Helmet>
      )}

      <Credits
        isLoading={movieQuery.isLoading}
        credits={movieQuery.data?.credits}
        routeName={ROUTE_NAMES.person}
        header={
          <BackToHeader
            isLoading={movieQuery.isLoading}
            title={movieQuery.data?.title}
            imgPath={getImagePath({
              basePath: IMG_BASE_URL,
              path: movieQuery.data?.poster_path,
              size: IMG_SIZES.poster.w154,
              fallback: noImageImg,
            })}
            path={`/${ROUTE_NAMES.movie}/${movieQuery.data?.id}`}
            linkName="Back to movie"
          />
        }
      />
    </>
  );
};
