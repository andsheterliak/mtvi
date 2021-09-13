import { useState } from 'react';
import { Videos } from '~/api/tmdb';
import { ItemAmount } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { VideoData } from './types';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';

type Props = {
  isLoading: IsLoading;
  videoAmount: ItemAmount;
  data: Videos | undefined;
};

export const VideoCards = ({ data, isLoading, videoAmount }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  if (isLoading) {
    const items = Array(videoAmount)
      .fill('')
      .map((_, index) => {
        return <VideoCard key={index} isLoading={true} />;
      });

    return <>{items}</>;
  }

  const openModalHandler = (currentVideoData: VideoData) => {
    setIsModalOpened(true);
    setVideoData(currentVideoData);
  };

  const closeModalHandler = () => {
    setIsModalOpened(false);
    setVideoData(null);
  };

  const cards: JSX.Element[] = [];

  data?.forEach(({ key, name, site }) => {
    if (site !== 'YouTube') return;

    cards.push(<VideoCard key={key} id={key} name={name} openModalHandler={openModalHandler} />);
  });

  return (
    <>
      {cards}

      {videoData && (
        <VideoModal
          isOpened={isModalOpened}
          closeModalHandler={closeModalHandler}
          videoData={videoData}
        />
      )}
    </>
  );
};
