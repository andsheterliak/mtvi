import { ifIsData } from '~common/utils/getData';

import PageGrid from '~components/grids/PageGrid';
import Layout from '~components/Layout';
import MainContainer from '~components/MainContainer';
import MainContent from '~components/MainContent';
import NoContent from '~components/NoContent';
import SelectionBar from '~components/SelectionBar';
import Spacer from '~components/Spacer';
import VideoCards from '~components/VideoCards';

import VideosGrid from './VideosGrid';

const AllVideos = ({ videosData, header, selectHandler, selected }) => {
  const videos = ifIsData(videosData[selected].data) ? (
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
