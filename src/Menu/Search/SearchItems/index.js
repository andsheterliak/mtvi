import { memo } from 'react';
import { IMG_BASE_URL, IMG_SIZES, SEARCH_PATHS } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import noUserPhoto from '~/assets/img/no-user-photo.svg';
import { ROUTE_NAMES } from '~/shared/constants';
import {
  formatDataStr,
  getImagePath,
  getKnownFor,
  getTopItems,
} from '~/shared/utils';
import { SearchItem } from './SearchItem';

const SearchItemsComponent = ({ data, clickHandler, isLoading }) => {
  const itemAmount = 8;

  if (isLoading) {
    return Array(itemAmount)
      .fill()
      .map((_, index) => {
        return <SearchItem key={index} isLoading />;
      });
  }

  const topData = getTopItems(data, itemAmount);

  return topData.map((item) => {
    const isPerson = SEARCH_PATHS.person === item.media_type;
    const isTVShow = SEARCH_PATHS.tv === item.media_type;

    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: isPerson ? IMG_SIZES.profile.w185 : IMG_SIZES.poster.w92,
      path: isPerson ? item.profile_path : item.poster_path,
      fallback: isPerson ? noUserPhoto : noImage,
    });

    const commonPath = isTVShow ? ROUTE_NAMES.tvShow : ROUTE_NAMES.movie;

    const date = formatDataStr(
      isTVShow ? item.first_air_date : item.release_date
    )?.dateStr;

    return (
      <SearchItem
        key={item.id}
        name={isTVShow || isPerson ? item.name : item.title}
        subInfo={isPerson ? getKnownFor(item.known_for) : date}
        path={
          isPerson
            ? `/${ROUTE_NAMES.person}/${item.id}`
            : `/${commonPath}/${item.id}`
        }
        imgPath={imgPath}
        clickHandler={clickHandler}
      />
    );
  });
};

export const SearchItems = memo(
  SearchItemsComponent,
  (prevProps, nextProps) =>
    prevProps.data === nextProps.data &&
    prevProps.isLoading === nextProps.isLoading
);
