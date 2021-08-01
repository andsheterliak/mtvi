import { ifIsData } from '~/shared/utils';
import { PageGrid } from '~/shared/components/grids';
import { Layout } from '~/shared/components/Layout';
import { MainContainer } from '~/shared/components/MainContainer';
import { MainContent } from '~/shared/components/MainContent';
import { NoContent } from '~/shared/components/NoContent';
import { SelectionBar } from '~/shared/components/SelectionBar';
import { Spacer } from '~/shared/components/Spacer';
import { VideoCards } from '~/shared/components/VideoCards';
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
