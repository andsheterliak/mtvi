import { useParams } from 'react-router-dom';

import noImageImg from '~assets/img/no-image.svg';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';
import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { createGetCreditsDataInstance } from '~common/selectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { getImagePath } from '~common/utils/getData';
import { useGetMovieQuery } from '~common/services/tmdb';

import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';

const getCredits = (data) => data?.credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const MovieCredits = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data } = useGetMovieQuery(id);

  const creditsData = getCreditsData(data);

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
              title={data.title}
              imgPath={posterImg}
              path={`/${ROUTE_NAMES.movie}/${data.id}`}
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
