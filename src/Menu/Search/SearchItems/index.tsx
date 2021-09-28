import { memo } from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { IMG_BASE_URL, IMG_SIZES, SearchData, SEARCH_PATHS } from '~/api/tmdb';
import noImage from '~/assets/img/no-image.svg';
import noUserPhoto from '~/assets/img/no-user-photo.svg';
import { ROUTE_NAMES } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { formatDateStr, getImagePath, getKnownFor, getTopItems } from '~/shared/utils';
import { CloseSearchHandler } from '../search-types';
import { SearchItem } from './SearchItem';

type Props = {
  isLoading: IsLoading;
  clickHandler: CloseSearchHandler;
  data: SearchData['results'] | undefined;
};

const SearchItemsComponent = ({ data, clickHandler, isLoading }: Props) => {
  const itemAmount = 8;

  if (isLoading) {
    const items = Array(itemAmount)
      .fill(null)
      .map((_, index) => {
        return <SearchItem key={index} isLoading />;
      });

    return <>{items}</>;
  }

  if (!data) return null;

  const topData = getTopItems(data, itemAmount);

  const items = topData.map((item) => {
    const isPerson = SEARCH_PATHS.person === item.media_type;
    const isTVShow = SEARCH_PATHS.tv === item.media_type;
    const isMovie = SEARCH_PATHS.movie === item.media_type;

    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: isPerson ? IMG_SIZES.profile.w185 : IMG_SIZES.poster.w92,
      path: isPerson ? item.profile_path : item.poster_path,
      fallback: isPerson ? noUserPhoto : noImage,
    });

    const commonPath = isTVShow ? ROUTE_NAMES.tvShow : ROUTE_NAMES.movie;

    let date: undefined | string;

    if (isTVShow) date = formatDateStr(item.first_air_date)?.dateStr;
    if (isMovie) date = formatDateStr(item.release_date)?.dateStr;

    return (
      <SearchItem
        key={item.id}
        name={isTVShow || isPerson ? item.name : item.title}
        subInfo={isPerson ? getKnownFor(item.known_for) : date}
        path={isPerson ? `/${ROUTE_NAMES.person}/${item.id}` : `/${commonPath}/${item.id}`}
        imgPath={imgPath}
        clickHandler={clickHandler}
      />
    );
  });

  return (
    <>
      <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
        {items}
      </RovingTabIndexProvider>
    </>
  );
};

export const SearchItems = memo(
  SearchItemsComponent,
  (prevProps, nextProps) =>
    prevProps.data === nextProps.data && prevProps.isLoading === nextProps.isLoading
);
