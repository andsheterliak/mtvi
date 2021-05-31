import noImageImg from '~assets/img/no-image.svg';
import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { checkIfIsData, createCreditsData } from '~common/utils/getData';

import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';

import useTVShowsState from './hooks/useTVShowsState';

const MovieCredits = () => {
  useScrollToTop();

  const { data } = useTVShowsState();

  let posterImg;
  let credits;

  if (data) {
    const isCredits = Object.values(data.aggregate_credits).some((item) => {
      return checkIfIsData(item);
    });

    if (isCredits) credits = createCreditsData(data.aggregate_credits);

    posterImg = data.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.poster}${data.poster_path}`
      : noImageImg;
  }

  return (
    <>
      {data ? (
        <Credits
          credits={credits}
          header={
            <BackToHeader
              title={data.name}
              imgPath={posterImg}
              path={`${ROUTE_NAMES.tvShow}/${data.id}`}
              linkName={`Back to TV Show`}
            />
          }
        />
      ) : (
        'Loading'
      )}
    </>
  );
};

export default MovieCredits;
