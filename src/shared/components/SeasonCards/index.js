import { getImagePath } from '~/shared/utils';
import { SeasonCard } from './SeasonCard';
import { SeasonsGrid } from './SeasonsGrid';

export const SeasonCards = ({ data, basePath, imgData, isLoading }) => {
  if (isLoading) {
    return Array(6)
      .fill()
      .map((_, index) => {
        return <SeasonCard key={index} isLoading={true} />;
      });
  }

  const seasons = data.map((season) => {
    const imgPath = getImagePath({ ...imgData, path: season.poster_path });

    return (
      <SeasonCard
        key={season.id}
        episodeCount={season.episode_count}
        name={season.name}
        overview={season.overview}
        path={`${basePath}/${season.season_number}`}
        imgPath={imgPath}
        releaseDate={season.air_date}
      />
    );
  });

  return <SeasonsGrid>{seasons}</SeasonsGrid>;
};

export { SeasonCard } from './SeasonCard';
