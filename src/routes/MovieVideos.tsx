import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetMovieQuery, VIDEO_TYPES } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import { AllVideos, BackToHeader, Selected, useSelection } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { IdParam } from './types';

export const MovieVideos = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const movieQuery = useGetMovieQuery(id);
  const { selected, setSelected } = useSelection(VIDEO_TYPES.trailer.key);

  useErrorHandler(movieQuery.error);
  useLazyImages({ isLoading: movieQuery.isLoading, triggers: [selected] });

  const selectHandler = (key: Selected) => {
    setSelected(key);
  };

  return (
    <>
      {movieQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {movieQuery.data!.title} | Videos</title>
          <meta name="keywords" content={`${movieQuery.data!.title}, videos`} />
        </Helmet>
      )}

      <AllVideos
        data={movieQuery.data?.videos.results}
        selectHandler={selectHandler}
        selected={selected}
        isLoading={movieQuery.isLoading}
        videoAmount={TOP_VIDEO_AMOUNT}
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
