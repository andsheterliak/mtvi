import { useErrorHandler } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetEpisodeQuery } from '~/api/tmdb';
import noImageImg from '~/assets/img/no-image-wide.svg';
import { BackToHeader, Credits } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath } from '~/shared/utils';
import { EpisodeNumberParam, IdParam, SeasonNumberParam } from './types';

export const EpisodeCredits = () => {
  useScrollToTop();

  const { id, seasonNumber, episodeNumber } = useParams<
    IdParam & SeasonNumberParam & EpisodeNumberParam
  >();

  const episodeQuery = useGetEpisodeQuery({
    id,
    seasonNumber,
    episodeNumber,
  });

  useErrorHandler(episodeQuery.error);
  useLazyImages({ isLoading: episodeQuery.isLoading });

  return (
    <>
      {episodeQuery.isLoading ? null : (
        <Helmet>
          <title>MTvI | {episodeQuery.data!.name} | Credits</title>
          <meta name="keywords" content={`${episodeQuery.data!.name}, credits`} />
        </Helmet>
      )}

      <Credits
        isLoading={episodeQuery.isLoading}
        credits={episodeQuery.data?.credits}
        routeName={ROUTE_NAMES.person}
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
