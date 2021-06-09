import { useSelector } from 'react-redux';

import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import noImageImg from '~assets/img/no-image-wide.svg';
import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';
import useEpisode from './hooks/useEpisode';
import { createGetCreditsDataInstance } from '~common/selectors';
import { getData } from './episodeSelectors';

const getCredits = (state) => state.episode.data?.credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const EpisodeCredits = () => {
  useScrollToTop();

  const { params } = useEpisode();

  const data = useSelector(getData);
  const creditsData = useSelector(getCreditsData);

  let stillImg;

  if (data) {
    stillImg = data.still_path
      ? `${IMG_BASE_URL}${IMG_SIZES.still}${data.still_path}`
      : noImageImg;
  }

  return (
    <>
      {data ? (
        <Credits
          credits={creditsData}
          header={
            <BackToHeader
              title={`${data.season_number}x${data.episode_number} ${data.name}`}
              imgPath={stillImg}
              path={`${ROUTE_NAMES.tvShow}/${params.id}/${ROUTE_NAMES.season}/${params.seasonNumber}`}
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
