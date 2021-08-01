import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetTVShowQuery } from '~/api/tmdb';
import noImg from '~/assets/img/no-image.svg';
import {
  BackToHeader,
  MainContainer,
  MainContent,
  NoContent,
  SeasonCards,
  Spacer,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { useLazyImages, useScrollToTop } from '~/shared/hooks';
import { getImagePath, ifIsData } from '~/shared/utils';

export const Seasons = () => {
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
