import { ROUTE_NAMES } from '~common/constants';
import EpisodeCard from './EpisodeCard';
import EpisodesGrid from './EpisodesGrid';

const EpisodeCards = ({ data, basePath }) => {
  const cards = data.map((item) => {
    return (
      <EpisodeCard
        key={item.id}
        imgPath={item.still_path}
        name={item.name}
        overview={item.overview}
        releaseDate={item.air_date}
        voteAverage={item.vote_average}
        episodeNumber={item.episode_number}
        resourcePaths={{
          credits: `${basePath}/${ROUTE_NAMES.episode}/${item.episode_number}/${ROUTE_NAMES.credits}`,
          videos: `${basePath}/${ROUTE_NAMES.episode}/${item.episode_number}/${ROUTE_NAMES.videos}`,
        }}
      />
    );
  });

  return <EpisodesGrid>{cards}</EpisodesGrid>;
};

export default EpisodeCards;
