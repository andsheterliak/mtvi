import { useParams, useRouteMatch } from 'react-router-dom';
import { IMG_BASE_URL, IMG_SIZES, useGetSeasonQuery } from '~/api/tmdb';
import noWideImg from '~/assets/img/no-image-wide.svg';
import { ROUTE_NAMES } from '~/shared/constants';
import { getImagePath } from '~/shared/utils';
import { EpisodeCard } from './EpisodeCard';
import { EpisodesGrid } from './EpisodesGrid';

export const EpisodeCards = () => {
  const { url } = useRouteMatch();
  const { id, seasonNumber } = useParams();
  const { data, isLoading } = useGetSeasonQuery({ id, seasonNumber });

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

  const cards = data?.episodes.map((item) => {
    const imgPath = getImagePath({
      basePath: IMG_BASE_URL,
      size: IMG_SIZES.still.w500,
      fallback: noWideImg,
      path: item.still_path,
    });

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
          credits: `${url}/${ROUTE_NAMES.episode}/${item.episode_number}/${ROUTE_NAMES.credits}`,
          videos: `${url}/${ROUTE_NAMES.episode}/${item.episode_number}/${ROUTE_NAMES.videos}`,
        }}
      />
    );
  });

  return <EpisodesGrid>{cards}</EpisodesGrid>;
};