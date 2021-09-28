import { RovingTabIndexProvider } from 'react-roving-tabindex';
import { Videos, VideoTypeKeys, VIDEO_TYPES } from '~/api/tmdb';
import { ItemAmount } from '~/shared/constants';
import { IsLoading } from '~/shared/types';
import { PageGrid } from '../grids';
import { Layout } from '../Layout';
import { MainContainer } from '../MainContainer';
import { MainContent } from '../MainContent';
import { NoContent } from '../NoContent';
import { Selected, SelectHandler, Selection, SelectionDataItem } from '../Selection';
import { Spacer } from '../Spacer';
import { VideoCards } from '../VideoCards';
import { VideosGrid } from './VideosGrid';

type VideosDataItem = SelectionDataItem<Videos>;
type VideosData = Record<typeof VIDEO_TYPES[VideoTypeKeys]['key'], VideosDataItem>;

const getVideosData = (videos: Videos | undefined) => {
  if (!videos) return null;

  const videosData: VideosData = {};

  Object.values(VIDEO_TYPES).forEach(({ key, name }) => {
    if (key === VIDEO_TYPES.openingCredits.key) return;
    videosData[key] = { name, amount: 0, data: [] };
  });

  videos.forEach((video) => {
    if (video.site !== 'YouTube') return;

    if (video.type === VIDEO_TYPES.openingCredits.key) {
      videosData[video.type] = { name: video.type, amount: 0, data: [] };
    }

    videosData[video.type].amount += 1;
    videosData[video.type].data.push(video);
  });

  return videosData;
};

type Props = {
  isLoading: IsLoading;
  videoAmount: ItemAmount;
  header: JSX.Element;
  selected: Selected;
  selectHandler: SelectHandler;
  data: Videos | undefined;
};

export const AllVideos = ({
  data,
  header,
  selectHandler,
  selected,
  isLoading,
  videoAmount,
}: Props) => {
  const videosData = getVideosData(data);
  const selectedItem = videosData?.[selected];

  const videos =
    !isLoading && selectedItem?.data.length === 0 ? (
      <NoContent message={`We don't have added any ${selectedItem.name.toLowerCase()}.`} />
    ) : (
      <VideosGrid>
        {isLoading ? (
          <VideoCards videoAmount={videoAmount} isLoading={isLoading} data={selectedItem?.data} />
        ) : (
          <RovingTabIndexProvider options={{ loopAround: true }}>
            <VideoCards videoAmount={videoAmount} isLoading={isLoading} data={selectedItem?.data} />
          </RovingTabIndexProvider>
        )}
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
              <Selection
                isLoading={isLoading}
                title="Video Types"
                data={videosData}
                selectHandler={selectHandler}
                selected={selected}
                itemSkeletonAmount={7}
                tabPanelElement={videos}
              />
            </PageGrid>
          </MainContainer>
        </MainContent>
      </Layout>
    </>
  );
};
