import { ifIsData } from '~/utils';
import { PageGrid } from '~/components/grids';
import { Layout } from '~/components/Layout';
import { MainContainer } from '~/components/MainContainer';
import { MainContent } from '~/components/MainContent';
import { NoContent } from '~/components/NoContent';
import { SelectionBar } from '~/components/SelectionBar';
import { Spacer } from '~/components/Spacer';
import { VideoCards } from '~/components/VideoCards';
import { VideosGrid } from './VideosGrid';

export const AllVideos = ({
  videosData,
  header,
  selectHandler,
  selected,
  isLoading,
  videoAmount,
}) => {
  const videos =
    !isLoading && !ifIsData(videosData?.[selected].data) ? (
      <NoContent
        message={`We don't have added any ${videosData[
          selected
        ].name.toLowerCase()}.`}
      />
    ) : (
      <VideosGrid>
        <VideoCards
          videoAmount={videoAmount}
          isLoading={isLoading}
          data={videosData?.[selected].data}
        />
      </VideosGrid>
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
                isLoading={isLoading}
                title="Videos"
                data={videosData}
                selectHandler={selectHandler}
                selected={selected}
                itemSkeletonAmount={7}
              />

              {videos}
            </PageGrid>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};
