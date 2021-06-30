import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import noImageImg from '~assets/img/no-image.svg';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';
import { ROUTE_NAMES } from '~common/constants';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { createGetCreditsDataInstance } from '~common/selectors';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { getImagePath } from '~common/utils/getData';
import { useGetMovieQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';

import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';

const getCredits = (data) => data?.credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const MovieCredits = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetMovieQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading });

  const creditsData = getCreditsData(data);

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
          title={data?.title}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: data?.poster_path,
            size: IMG_SIZES.poster,
            fallback: noImageImg,
          })}
          path={`/${ROUTE_NAMES.movie}/${data?.id}`}
          linkName="Back to movie"
        />
      }
    />
  );
};

export default MovieCredits;
