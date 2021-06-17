import { memo } from 'react';

import { formatDataStr } from '~common/utils/date';
import SearchItem from './SearchItem';
import {
  getImagePath,
  getKnownFor,
  getPath,
  getTopItems,
} from '~common/utils/getData';

const SearchItems = ({
  data,
  searchPaths,
  routeNames,
  imgData,
  clickHandler,
}) => {
  const topData = getTopItems(data, 8);

  return topData.map((item) => {
    const isPerson = searchPaths.person === item.media_type;

    const imgPath = getImagePath({
      basePath: imgData.basePath,
      size: isPerson ? imgData.person.size : imgData.common.size,
      path: item.poster_path || item.profile_path,
      fallback: isPerson ? imgData.person.fallback : imgData.common.fallback,
    });

    const commonPath = getPath({
      name: item.name,
      episodeCount: item.episode_count,
      firstAirDate: item.first_air_date,
      routeNames,
    });

    return (
      <SearchItem
        key={item.id}
        name={item.name || item.title}
        subInfo={
          isPerson
            ? getKnownFor(item.known_for)
            : formatDataStr(item.release_date || item.first_air_date)?.dateStr
        }
        path={
          isPerson
            ? `/${routeNames.person}/${item.id}`
            : `${commonPath}/${item.id}`
        }
        imgPath={imgPath}
        clickHandler={clickHandler}
      />
    );
  });
};

export default memo(
  SearchItems,
  (prevProps, nextProps) => prevProps.data === nextProps.data
);
