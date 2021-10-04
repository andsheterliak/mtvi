import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetTVShowQuery, VIDEO_TYPES } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image.svg';
import { AllVideos, BackToHeader, Selected, useSelection } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { IdParam } from './types';

export const TVShowVideos = () => {
  useScrollToTop();

  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  useErrorHandler(tvShowQuery.error);

  const { selected, setSelected } = useSelection(VIDEO_TYPES.trailer.key);

  useLazyImages({ isLoading: tvShowQuery.isLoading, triggers: [selected] });

  const selectHandler = (key: Selected) => {
    setSelected(key);
  };

  return (
    <>
      {tvShowQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {tvShowQuery.data!.name} | Videos</title>
          <meta name="keywords" content={`${tvShowQuery.data!.name}, videos`} />
        </Helmet>
      )}

      <AllVideos
        data={tvShowQuery.data?.videos.results}
        selectHandler={selectHandler}
        selected={selected}
        isLoading={tvShowQuery.isLoading}
        videoAmount={TOP_VIDEO_AMOUNT}
        header={
          <BackToHeader
            isLoading={tvShowQuery.isLoading}
            title={tvShowQuery.data?.name}
            imgPath={getImagePath({
              basePath: IMG_BASE_URL,
              size: IMG_SIZES.poster.w154,
              path: tvShowQuery.data?.poster_path,
              fallback: noImageImg,
            })}
            path={`/${ROUTE_NAMES.tvShow}/${tvShowQuery.data?.id}`}
            linkName="Back to TV Show"
          />
        }
      />
    </>
  );
};
