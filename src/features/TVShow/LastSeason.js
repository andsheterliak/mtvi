import { useRouteMatch } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import { ROUTE_NAMES } from '~common/constants';
import { getImagePath, ifIsData } from '~common/utils/getData';
import { formatDataStr } from '~common/utils/date';
import { IMG_BASE_URL, IMG_SIZES } from '~common/tmdb-config';
import { useGetTVShowQuery } from '~common/services/tmdb';
import NoContent from '~components/NoContent';
import Section from '~components/section/Section';
import SectionTitle from '~components/section/SectionTitle';
import SeeAllLink from '~components/SeeAllLink';
import SeasonCard from '~components/SeasonCards/SeasonCard';
import noImg from '~assets/img/no-image.svg';

const getSeasons = (data) => data.seasons;

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
  const { id } = useParams();

  const { seasons, isLoading, lastReleasedSeason } = useGetTVShowQuery(id, {
    selectFromResult: ({ data }) => ({
      seasons: getSeasons(data),
      lastReleasedSeason: getLastReleasedSeason(data),
      isLoading,
    }),
  });

  let season;

  if (!isLoading) {
    season = lastReleasedSeason ? (
      <SeasonCard
        releaseDate={lastReleasedSeason.air_date}
        episodeCount={lastReleasedSeason.episode_count}
        path={`${url}/${ROUTE_NAMES.season}/${lastReleasedSeason.season_number}`}
        name={lastReleasedSeason.name}
        overview={lastReleasedSeason.overview}
        imgPath={getImagePath({
          basePath: IMG_BASE_URL,
          size: IMG_SIZES.poster,
          path: lastReleasedSeason.poster_path,
          fallback: noImg,
        })}
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
