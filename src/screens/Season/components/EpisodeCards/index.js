import { ROUTE_NAMES } from '~/constants';
import { getImagePath } from '~/utils';
import { EpisodeCard } from './EpisodeCard';
import { EpisodesGrid } from './EpisodesGrid';

export const EpisodeCards = ({ data, basePath, imgData, isLoading }) => {
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
