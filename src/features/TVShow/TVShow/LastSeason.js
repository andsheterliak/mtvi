import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import { ROUTE_NAMES } from '~common/constants';
import { ifIsData } from '~common/utils/getData';
import { formatDataStr } from '~common/utils/date';
import NoContent from '~components/NoContent';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import SeeAllLink from '~components/SeeAllLink';
import SeasonCard from '../components/SeasonCards/SeasonCard';

const getSeasons = (state) => state.tvShow.data.seasons;

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

const LastSeason = () => {
  const { url } = useRouteMatch();
  const lastReleasedSeason = useSelector(getLastReleasedSeason);
  const isLoading = useSelector((state) => state.isLoading);
  const seasons = useSelector(getSeasons);

  let season;

  if (!isLoading) {
    season = lastReleasedSeason ? (
      <SeasonCard
        releaseDate={lastReleasedSeason.air_date}
        episodeCount={lastReleasedSeason.episode_count}
        path={`${url}/${ROUTE_NAMES.season}/${lastReleasedSeason.season_number}`}
        posterPath={lastReleasedSeason.poster_path}
        name={lastReleasedSeason.name}
        overview={lastReleasedSeason.overview}
      />
    ) : (
      <NoContent message="We don't have added last season." />
    );
  }

  return (
    <Section>
      <SectionTitle title="Last Season" />

      {season}

      {!isLoading && !ifIsData(seasons) ? null : (
        <SeeAllLink path={`${url}/${ROUTE_NAMES.seasons}`}>
          View All Seasons
        </SeeAllLink>
      )}
    </Section>
  );
};

export default LastSeason;
