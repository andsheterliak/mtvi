import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

import { ROUTE_NAMES } from '~common/constants';
import { checkIfIsData } from '~common/utils/getData';
import { formatDataStr } from '~common/utils/date';
import NoContent from '~components/NoContent';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import SeeAllLink from '~components/SeeAllLink';
import SeasonCard from '../components/SeasonCards/SeasonCard';

const getLastReleasedSeason = (seasons) => {
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
};

const LastSeason = () => {
  const { url } = useRouteMatch();
  const { data } = useSelector((state) => state.tvShow);

  if (checkIfIsData(data.seasons)) {
    let lastReleasedSeason = getLastReleasedSeason(data.seasons);

    lastReleasedSeason = lastReleasedSeason ? (
      <SeasonCard
        releaseDate={lastReleasedSeason.air_date}
        episodeCount={lastReleasedSeason.episode_count}
        path={`${url}/${ROUTE_NAMES.season}/${lastReleasedSeason.id}`}
        posterPath={lastReleasedSeason.poster_path}
        name={lastReleasedSeason.name}
        overview={lastReleasedSeason.overview}
      />
    ) : (
      <NoContent message="We don't have added last season." />
    );

    return (
      <Section>
        <SectionTitle title="Last Season" />

        {lastReleasedSeason}

        <SeeAllLink path={`${url}/${ROUTE_NAMES.seasons}`}>
          View All Seasons
        </SeeAllLink>
      </Section>
    );
  }

  return <NoContent message="We don't have added any seasons." />;
};

export default LastSeason;
