import { useRouteMatch } from 'react-router-dom';
import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { IMG_BASE_URL, IMG_SIZES, Season } from '~/api/tmdb';
import noWideImg from '~/assets/img/no-image-wide.svg';
import { ROUTE_NAMES } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { getImagePath } from '~/shared/utils';
import { EpisodeCard } from './EpisodeCard';
import { EpisodesGrid } from './EpisodesGrid';

type Props = {
  isLoading: IsLoading;
  data: Season | undefined;
};

export const EpisodeCards = ({ data, isLoading }: Props) => {
  const { url } = useRouteMatch();

  if (isLoading) {
    const items = Array(10)
      .fill('')
      .map((_, index) => {
        return <EpisodeCard key={index} isLoading={true} />;
      });

    return <EpisodesGrid>{items}</EpisodesGrid>;
  }

  const items = data?.episodes.map((item) => {
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

  return (
    <EpisodesGrid>
      {isLoading ? (
        items
      ) : (
        <RovingTabIndexProvider options={{ loopAround: true }}>{items}</RovingTabIndexProvider>
      )}
    </EpisodesGrid>
  );
};
