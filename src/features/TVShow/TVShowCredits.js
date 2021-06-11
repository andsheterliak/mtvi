import { useSelector } from 'react-redux';
import noImageImg from '~assets/img/no-image.svg';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';
import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { createGetCreditsDataInstance } from '~common/selectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { getImagePath } from '~common/utils/getData';

import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';

import useTVShows from './hooks/useTVShows';
import { getData } from './tvShowSelectors';

const getCredits = (state) => state.tvShow.data?.aggregate_credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const MovieCredits = () => {
  useScrollToTop();
  useTVShows();

  const data = useSelector(getData);
  const creditsData = useSelector(getCreditsData);

  let posterImg;

  if (data) {
    posterImg = getImagePath({
      basePath: IMG_BASE_URL,
      path: data.poster_path,
      size: IMG_SIZES.poster,
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
              title={data.name}
              imgPath={posterImg}
              path={`/${ROUTE_NAMES.tvShow}/${data.id}`}
              linkName="Back to TV Show"
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
