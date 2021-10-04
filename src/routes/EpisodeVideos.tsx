import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetEpisodeQuery, VIDEO_TYPES } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image-wide.svg';
import { AllVideos, BackToHeader, Selected, useSelection } from '~/shared/components';
import { ROUTE_NAMES, TOP_VIDEO_AMOUNT } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { EpisodeNumberParam, IdParam, SeasonNumberParam } from './types';

export const EpisodeVideos = () => {
  useScrollToTop();

  const { id, seasonNumber, episodeNumber } = useParams<
    IdParam & SeasonNumberParam & EpisodeNumberParam
  >();

  const episodeQuery = useGetEpisodeQuery({
    id,
    seasonNumber,
    episodeNumber,
  });

  const { selected, setSelected } = useSelection(VIDEO_TYPES.trailer.key);

  useErrorHandler(episodeQuery.error);
  useLazyImages({ isLoading: episodeQuery.isLoading, triggers: [selected] });

  const selectHandler = (key: Selected) => {
    setSelected(key);
  };

  return (
    <>
      {episodeQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {episodeQuery.data!.name} | Videos</title>
          <meta name="keywords" content={`${episodeQuery.data!.name}, videos`} />
        </Helmet>
      )}

      <AllVideos
        isLoading={episodeQuery.isLoading}
        data={episodeQuery.data?.videos.results}
        selectHandler={selectHandler}
        selected={selected}
        videoAmount={TOP_VIDEO_AMOUNT}
        header={
          <BackToHeader
            isLoading={episodeQuery.isLoading}
            title={`${episodeQuery.data?.season_number}x${episodeQuery.data?.episode_number} ${episodeQuery.data?.name}`}
            imgPath={getImagePath({
              basePath: IMG_BASE_URL,
              path: episodeQuery.data?.still_path,
              size: IMG_SIZES.still.w300,
              fallback: noImageImg,
            })}
            imgShape="wide"
            path={`/${ROUTE_NAMES.tvShow}/${id}/${ROUTE_NAMES.season}/${seasonNumber}`}
            linkName="Back to Season"
          />
        }
      />
    </>
  );
};
