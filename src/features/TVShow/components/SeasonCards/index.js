import SeasonCard from './SeasonCard';
import SeasonsGrid from './SeasonsGrid';

const SeasonCards = ({ data, basePath }) => {
  const seasons = data.map((season) => {
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

  return <SeasonsGrid>{seasons}</SeasonsGrid>;
};

export default SeasonCards;
