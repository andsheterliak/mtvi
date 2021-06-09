import { useSelector } from 'react-redux';

import noImageImg from '~assets/img/no-image.svg';
import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { createGetCreditsDataInstance } from '~common/selectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';

import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';

import useMovie from './hooks/useMovie';
import { getData } from './movieSelectors';

const getCredits = (state) => state.movie.data?.credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const MovieCredits = () => {
  useScrollToTop();
  useMovie();

  const data = useSelector(getData);
  const creditsData = useSelector(getCreditsData);

  let posterImg;

  if (data) {
    posterImg = data.poster_path
      ? `${IMG_BASE_URL}${IMG_SIZES.poster}${data.poster_path}`
      : noImageImg;
  }

  return (
    <>
      {data ? (
        <Credits
          credits={creditsData}
          header={
            <BackToHeader
              title={data.title}
              imgPath={posterImg}
              path={`${ROUTE_NAMES.movie}/${data.id}`}
              linkName="Back to movie"
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
