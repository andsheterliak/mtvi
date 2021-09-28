import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { IMG_BASE_URL, IMG_SIZES } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import { Card, CardSubInfo } from '~/shared/components';
import { ROUTE_NAMES, TOP_ITEM_AMOUNT } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';
import { JoinedCredits } from '../types';

type Props = {
  isLoading: IsLoading;
  cardsData: JoinedCredits | null;
};

export const MixedCards = ({ cardsData, isLoading }: Props) => {
  if (isLoading) {
    const items = Array(TOP_ITEM_AMOUNT)
      .fill('')
      .map((_, index) => {
        return <Card isLoading={true} key={index} subData={<CardSubInfo isLoading={true} />} />;
      });

    return <>{items}</>;
  }

  const items = cardsData?.map((item) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.poster.w342,
      fallback: noImage,
      path: item.poster_path,
    });

    const isMovie = 'release_date' in item || 'title' in item;

    return isMovie ? (
      <Card
        key={item.id}
        path={`/${ROUTE_NAMES.movie}/${item.id}`}
        imgPath={imgPath}
        title={item.title}
        subData={<CardSubInfo releaseDate={item.release_date} voteAverage={item.vote_average} />}
      />
    ) : (
      <Card
        key={item.id}
        path={`/${ROUTE_NAMES.tvShow}/${item.id}`}
        imgPath={imgPath}
        title={item.name}
        subData={<CardSubInfo releaseDate={item.first_air_date} voteAverage={item.vote_average} />}
      />
    );
  });

  return <>{isLoading ? items : <RovingTabIndexProvider>{items}</RovingTabIndexProvider>}</>;
};
