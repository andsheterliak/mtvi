import { memo } from 'react';
import { formatDataStr, getImagePath, getKnownFor, getTopItems } from '~/utils';
import { SearchItem } from './SearchItem';

const SearchItemsComponent = ({
  data,
  searchPaths,
  routeNames,
  imgData,
  clickHandler,
  isLoading,
}) => {
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
    const isPerson = searchPaths.person === item.media_type;
    const isTVShow = searchPaths.tv === item.media_type;

    const imgPath = getImagePath({
      basePath: imgData.basePath,
      size: isPerson ? imgData.person.size : imgData.common.size,
      path: isPerson ? item.profile_path : item.poster_path,
      fallback: isPerson ? imgData.person.fallback : imgData.common.fallback,
    });

    const commonPath = isTVShow ? routeNames.tvShow : routeNames.movie;

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
            ? `/${routeNames.person}/${item.id}`
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
