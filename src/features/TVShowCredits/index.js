import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import noImageImg from '~assets/img/no-image.svg';
import noUserPhotoImg from '~assets/img/no-user-photo.svg';
import { ROUTE_NAMES } from '~common/constants';
import useLazyImages from '~common/hooks/useLazyImages';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { createGetCreditsDataInstance } from '~common/selectors';
import { useGetTVShowQuery } from '~common/services/tmdb';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { getImagePath } from '~common/utils/getData';

import BackToHeader from '~components/BackToHeader';
import Credits from '~components/Credits';

const getCredits = (data) => data?.aggregate_credits;
const getCreditsData = createGetCreditsDataInstance(getCredits);

const TVShowCredits = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetTVShowQuery(id);

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
          title={data?.name}
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            path: data?.poster_path,
            size: IMG_SIZES.poster.w154,
            fallback: noImageImg,
          })}
          path={`/${ROUTE_NAMES.tvShow}/${data?.id}`}
          linkName="Back to TV Show"
        />
      }
    />
  );
};

export default TVShowCredits;
