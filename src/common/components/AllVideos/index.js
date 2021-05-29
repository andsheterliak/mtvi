import { checkIfIsData } from '~common/utils/getData';

import PageGrid from '~components/grids/PageGrid';
import Layout from '~components/Layout';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import SelectionBar, { useSelectionBar } from '~components/SelectionBar';
import Spacer from '~components/Spacer';
import VideoCards from '~components/VideoCards';

import VideosGrid from './VideosGrid';

const createVideosData = (data) => {
  const videosData = {
    Trailer: { name: 'Trailers', amount: 0, data: [] },
    Teaser: { name: 'Teasers', amount: 0, data: [] },
    Clip: { name: 'Clips', amount: 0, data: [] },
    'Behind the Scenes': { name: 'Behind the Scenes', amount: 0, data: [] },
    Blooper: { name: 'Bloopers', amount: 0, data: [] },
    Featurette: { name: 'Featurettes', amount: 0, data: [] },
  };

  data.forEach((video) => {
    if (video.site !== 'YouTube') return;

    const { type } = video;
    const mapValue = videosData[type];

    mapValue.amount += 1;
    mapValue.data.push(video);
  });

  return videosData;
};

const AllVideos = ({ data, header }) => {
  const { selected, setSelected } = useSelectionBar('Trailer');
  const videosData = createVideosData(data);

  const selectHandler = (e, key) => {
    setSelected(key);
  };

  const videos = checkIfIsData(videosData[selected].data) ? (
    <VideosGrid>
      <VideoCards data={videosData[selected].data} />
    </VideosGrid>
  ) : (
    <NoContent
      message={`We don't have added any ${videosData[
        selected
      ].name.toLowerCase()}.`}
    />
  );

  return (
    <>
      <Spacer />

      <Layout>
        {header}

        <MainContent>
          <MainContainer>
            <PageGrid>
              <SelectionBar
                title="Videos"
                data={videosData}
                selectHandler={selectHandler}
                selected={selected}
              />

              {videos}
            </PageGrid>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};

export default AllVideos;
