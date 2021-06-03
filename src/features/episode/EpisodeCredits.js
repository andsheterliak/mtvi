import { ROUTE_NAMES } from '~common/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { checkIfIsData, createCreditsData } from '~common/utils/getData';
import noImageImg from '~assets/img/no-image-wide.svg';
import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';
import useEpisodeState from './hooks/useEpisodeState';

const EpisodeCredits = () => {
  const { data, params } = useEpisodeState();

  let stillImg;
  let credits;

  if (data) {
    const isCredits = Object.values(data.credits).some((item) => {
      return checkIfIsData(item);
    });
    if (isCredits) credits = createCreditsData(data.credits);

    stillImg = data.still_path
      ? `${IMG_BASE_URL}${IMG_SIZES.still}${data.still_path}`
      : noImageImg;
  }

  return (
    <>
      {data ? (
        <Credits
          credits={credits}
          header={
            <BackToHeader
              title={`${data.season_number}x${data.episode_number} ${data.name}`}
              imgPath={stillImg}
              path={`${ROUTE_NAMES.tvShow}/${params.id}/${ROUTE_NAMES.season}/${params.seasonNumber}`}
              linkName={`Back to Season`}
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
