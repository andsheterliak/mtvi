import { ROUTE_NAMES } from '~common/constants';
import { getImagePath } from '~common/utils/getData';
import EpisodeCard from './EpisodeCard';
import EpisodesGrid from './EpisodesGrid';

const EpisodeCards = ({ data, basePath, imgData, isLoading }) => {
  if (isLoading) {
    return (
      <EpisodesGrid>
        {Array(10)
          .fill()
          .map((_, index) => {
            return <EpisodeCard key={index} isLoading={true} />;
          })}
      </EpisodesGrid>
    );
  }

  const cards = data.map((item) => {
    const imgPath = getImagePath({ ...imgData, path: item.still_path });

    return (
      <EpisodeCard
        key={item.id}
        imgPath={imgPath}
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
