import { arrayOf, shape, string } from 'prop-types';
import { useState } from 'react';
import VideoCard from './VideoCard';
import videoCardsTypes from './videoCardsTypes';
import VideoModal from './VideoModal';

const VideoCards = ({ data }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [videoData, setVideoData] = useState(null);

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

VideoCards.propTypes = {
  data: arrayOf(
    shape({
      key: videoCardsTypes.id,
      name: videoCardsTypes.name,
      site: string.isRequired,
    })
  ).isRequired,
};

export default VideoCards;
