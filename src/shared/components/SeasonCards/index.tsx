import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { SeasonItem } from '~/api/tmdb';
import { IsLoading, Path } from '~/shared/types';
import { SeasonCard } from './SeasonCard';
import { SeasonsGrid } from './SeasonsGrid';

export { SeasonCard } from './SeasonCard';

type Props = {
  isLoading: IsLoading;
  data: SeasonItem[] | undefined;
  basePath: Path;
};

export const SeasonCards = ({ data, basePath, isLoading }: Props) => {
  if (isLoading) {
    const items = Array(6)
      .fill('')
      .map((_, index) => {
        return <SeasonCard key={index} isLoading={true} />;
      });

    return <>{items}</>;
  }

  const seasons = data?.map((season) => {
    return (
      <SeasonCard
        key={season.id}
        episodeCount={season.episode_count}
        name={season.name}
        overview={season.overview}
        path={`${basePath}/${season.season_number}`}
        posterPath={season.poster_path}
        releaseDate={season.air_date}
      />
    );
  });

  return (
    <SeasonsGrid>
      {isLoading ? (
        seasons
      ) : (
        <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
          {seasons}
        </RovingTabIndexProvider>
      )}
    </SeasonsGrid>
  );
};
