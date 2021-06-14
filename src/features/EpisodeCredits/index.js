import { useParams } from 'react-router-dom';

import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import noImageImg from '~assets/img/no-image-wide.svg';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';
import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';
import { createGetCreditsDataInstance } from '~common/selectors';
import { getImagePath } from '~common/utils/getData';
import { useGetEpisodeQuery } from '~common/services/tmdb';

const getCredits = (data) => data?.credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const EpisodeCredits = () => {
  useScrollToTop();

  const { id, seasonNumber, episodeNumber } = useParams();
  const { data } = useGetEpisodeQuery({ id, seasonNumber, episodeNumber });
  const creditsData = getCreditsData(data);

  let stillImg;

  if (data) {
    stillImg = getImagePath({
      basePath: IMG_BASE_URL,
      path: data.still_path,
      size: IMG_SIZES.still,
      fallback: noImageImg,
    });
  }

  return (
    <>
      {data ? (
        <Credits
          credits={creditsData}
          routeName={ROUTE_NAMES.person}
          imgData={{
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.profileFace,
            fallback: noUserPhotoImg,
          }}
          header={
            <BackToHeader
              title={`${data.season_number}x${data.episode_number} ${data.name}`}
              imgPath={stillImg}
              path={`/${ROUTE_NAMES.tvShow}/${id}/${ROUTE_NAMES.season}/${seasonNumber}`}
              linkName="Back to Season"
            />
          }
        />
      ) : (
        'Loading'
      )}
    </>
  );
};

export default EpisodeCredits;
