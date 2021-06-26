import { useState } from 'react';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

const VideoCards = ({ data, isLoading, videoAmount }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [videoData, setVideoData] = useState(null);

  if (isLoading) {
    return Array(videoAmount)
      .fill()
      .map((_, index) => {
        return <VideoCard key={index} isLoading={true} />;
      });
  }

  const openModalHandler = (e, newData) => {
    setIsModalOpened(true);
    setVideoData(newData);
  };

  const closeModalHandler = () => {
    setIsModalOpened(false);
    setVideoData(null);
  };

  const cards = [];

  data.forEach(({ key, name, site }) => {
    if (site !== 'YouTube') return;

    cards.push(
      <VideoCard
        key={key}
        id={key}
        name={name}
        openModalHandler={openModalHandler}
      />
    );
  });

  return (
    <>
      {cards}

      {videoData && (
        <VideoModal
          isOpened={isModalOpened}
          closeModalHandler={closeModalHandler}
          data={videoData}
        />
      )}
    </>
  );
};

export default VideoCards;
