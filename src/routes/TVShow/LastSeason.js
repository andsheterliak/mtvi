import { createSelector } from '@reduxjs/toolkit';
import { useRouteMatch } from 'react-router';
import noImg from '~/assets/img/no-image.svg';
import {
  NoContent,
  SeasonCard,
  Section,
  SectionTitle,
  SeeAllLink,
} from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { IMG_BASE_URL, IMG_SIZES } from '~/api/tmdb';
import { formatDataStr, getImagePath, ifIsData } from '~/shared/utils';

const getSeasons = (data) => data?.seasons;

const getLastReleasedSeason = createSelector(getSeasons, (seasons) => {
  if (!ifIsData(seasons)) return null;

  let lastReleasedSeason;

  for (let i = seasons.length - 1; i >= 0; i--) {
    const season = seasons[i];

    if (!season.air_date) continue;

    const seasonAirDateInMilliseconds = formatDataStr(
      season.air_date
    ).dateObj.getTime();

    const isReleased = seasonAirDateInMilliseconds <= new Date().getTime();

    if (isReleased) {
      lastReleasedSeason = season;
      break;
    }
  }

  return lastReleasedSeason;
});

export const LastSeason = ({ isLoading, data }) => {
  const { url } = useRouteMatch();

  const lastReleasedSeason = getLastReleasedSeason(data);

  const season =
    !isLoading && !lastReleasedSeason ? (
      <NoContent message="We don't have added last season." />
    ) : (
      <SeasonCard
        isLoading={isLoading}
        releaseDate={lastReleasedSeason?.air_date}
        episodeCount={lastReleasedSeason?.episode_count}
        path={`${url}/${ROUTE_NAMES.season}/${lastReleasedSeason?.season_number}`}
        name={lastReleasedSeason?.name}
        overview={lastReleasedSeason?.overview}
        imgPath={getImagePath({
          basePath: IMG_BASE_URL,
          size: IMG_SIZES.poster.w342,
          path: lastReleasedSeason?.poster_path,
          fallback: noImg,
        })}
      />
    );

  return (
    <Section>
      <SectionTitle title="Last Season" />

      {season}

      <SeeAllLink path={`${url}/${ROUTE_NAMES.seasons}`}>
        View All Seasons
      </SeeAllLink>
    </Section>
  );
};
