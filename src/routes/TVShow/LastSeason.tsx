import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router-dom';
import { SeasonItem, TVShow, useGetTVShowQuery } from '~/api/tmdb';
import { NoContent, SeasonCard, Section, SectionTitle, SeeAllLink } from '~/shared/components';
import { ROUTE_NAMES } from '~/shared/constants';
import { formatDateStr } from '~/shared/utils';
import { IdParam } from '../types';

const getLastReleasedSeason = (seasons: TVShow['seasons'] | undefined) => {
  if (!seasons || seasons.length === 0) return null;

  let lastReleasedSeason: SeasonItem | null = null;

  for (let i = seasons.length - 1; i >= 0; i--) {
    const season = seasons[i];

    if (!season.air_date) continue;

    const seasonAirDateInMilliseconds = formatDateStr(season.air_date)?.dateObj.getTime();

    const isReleased =
      seasonAirDateInMilliseconds !== undefined &&
      seasonAirDateInMilliseconds <= new Date().getTime();

    if (isReleased) {
      lastReleasedSeason = season;
      break;
    }
  }

  return lastReleasedSeason;
};

export const LastSeason = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<IdParam>();
  const tvShowQuery = useGetTVShowQuery(id);

  const lastReleasedSeason = getLastReleasedSeason(tvShowQuery.data?.seasons);

  const season =
    !tvShowQuery.isLoading && !lastReleasedSeason ? (
      <NoContent message="We don't have added last season." />
    ) : (
      <SeasonCard
        isLoading={tvShowQuery.isLoading}
        releaseDate={lastReleasedSeason?.air_date}
        episodeCount={lastReleasedSeason?.episode_count}
        path={`${url}/${ROUTE_NAMES.season}/${lastReleasedSeason?.season_number}`}
        name={lastReleasedSeason?.name}
        overview={lastReleasedSeason?.overview}
        posterPath={lastReleasedSeason?.poster_path}
        isRovingIndex={false}
      />
    );

  return (
    <Section>
      <SectionTitle title="Last Season" />

      {season}

      <SeeAllLink path={`${url}/${ROUTE_NAMES.seasons}`}>View All Seasons</SeeAllLink>
    </Section>
  );
};
