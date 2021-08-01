import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import noImageImg from '~/assets/img/no-image-wide.svg';
import noUserPhotoImg from '~/assets/img/no-user-photo.svg';
import { BackToHeader, Credits } from '~/components';
import { ROUTE_NAMES } from '~/constants';
import { useLazyImages, useScrollToTop } from '~/hooks';
import { createGetCreditsDataInstance } from '~/selectors';
import { useGetEpisodeQuery } from '~/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES } from '~/tmdb-config';
import { getImagePath } from '~/utils';

const getCredits = (data) => data?.credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

export const EpisodeCredits = () => {
  useScrollToTop();

  const { id, seasonNumber, episodeNumber } = useParams();
  const { data, error, isLoading } = useGetEpisodeQuery({
    id,
    seasonNumber,
    episodeNumber,
  });
  const creditsData = getCreditsData(data);

  useErrorHandler(error);
  useLazyImages({ isLoading });

  return (
    <Credits
      isLoading={isLoading}
      credits={creditsData}
      routeName={ROUTE_NAMES.person}
      imgData={{
        basePath: IMG_BASE_URL,
        size: IMG_SIZES.profileFace,
        fallback: noUserPhotoImg,
      }}
      header={
        <BackToHeader
          isLoading={isLoading}
          title={`${data?.season_number}x${data?.episode_number} ${data?.name}`}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: data?.still_path,
            size: IMG_SIZES.still.w300,
            fallback: noImageImg,
          })}
          imgShape="wide"
          path={`/${ROUTE_NAMES.tvShow}/${id}/${ROUTE_NAMES.season}/${seasonNumber}`}
          linkName="Back to Season"
        />
      }
    />
  );
};
