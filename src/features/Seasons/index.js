import { useParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import BackToHeader from '~components/BackToHeader';
import MainContent from '~components/MainContent';
import Spacer from '~components/Spacer';
import MainContainer from '~components/MainContainer';
import noImg from '~assets/img/no-image.svg';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import useScrollToTop from '~common/hooks/useScrollToTop';
import { ROUTE_NAMES } from '~common/constants';
import { getImagePath, ifIsData } from '~common/utils/getData';
import { useGetTVShowQuery } from '~common/services/tmdb';
import useLazyImages from '~common/hooks/useLazyImages';
import SeasonCards from '~components/SeasonCards';
import NoContent from '~components/NoContent';

const Seasons = () => {
  useScrollToTop();

  const { id } = useParams();
  const { data, error, isLoading } = useGetTVShowQuery(id);

  useErrorHandler(error);
  useLazyImages({ isLoading });

  const seasonsCards =
    !isLoading && !ifIsData(data) ? (
      <NoContent message="We don't have added any seasons." />
    ) : (
      <SeasonCards
        isLoading={isLoading}
        data={data?.seasons}
        basePath={`/${ROUTE_NAMES.tvShow}/${data?.id}/${ROUTE_NAMES.season}`}
        imgData={{
          basePath: IMG_BASE_URL,
          size: IMG_SIZES.poster.w342,
          fallback: noImg,
        }}
      />
    );

  return (
    <>
      <Spacer />

      <MainContent>
        <BackToHeader
          imgPath={getImagePath({
            basePath: IMG_BASE_URL,
            size: IMG_SIZES.poster.w154,
            path: data?.poster_path,
            fallback: noImg,
          })}
          linkName="Back to TV Show"
          title={data?.name}
          path={`/${ROUTE_NAMES.tvShow}/${data?.id}`}
          isLoading={isLoading}
        />

        <Spacer />

        <MainContainer>{seasonsCards}</MainContainer>
      </MainContent>
    </>
  );
};

export default Seasons;
